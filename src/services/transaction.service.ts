import { CreateTransactionData, UpdateTransactionData } from '../common/types';
import prisma from '../utils/database';
import { Decimal } from '@prisma/client/runtime/library';
import { createBaseService } from './base.service';

export async function getAllTransactions(
  skip: number,
  take: number,
  c?: { type?: string; startDate?: string; endDate?: string; searchKey?: string },
) {
  const { type, startDate, endDate, searchKey } = c || {};

  const base = createBaseService(prisma.transaction, {
    idField: 'id',
    defaultInclude: {
      customer: true,
      items: { include: { product: true } },
    },
  });

  const where = {
    ...(type && { type }),
    ...(startDate && endDate && {
      createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
    }),
    ...(searchKey && {
      OR: [
        { customer: { name: { contains: searchKey, mode: 'insensitive' } } },
        { items: { some: { product: { name: { contains: searchKey, mode: 'insensitive' } } } } },
      ],
    }),
  };

  const { items: transactions, total } = await base.list({
    skip,
    take,
    where: Object.keys(where).length ? where : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return { transactions, total };
}

export async function getTransactionById(id: string) {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transaction;
}

export async function createTransaction(data: CreateTransactionData, ctx?: { userId?: string }) {
  const transaction = await prisma.transaction.create({
    data: {
      customerId: data.customerId,
      type: data.type,
      totalAmount: data.totalAmount !== undefined ? new Decimal(String(data.totalAmount)) : null,
      totalCost: data.totalCost !== undefined ? new Decimal(String(data.totalCost)) : null,
      profitLoss: data.profitLoss !== undefined ? new Decimal(String(data.profitLoss)) : null,
      startDate: data.startDate,
      returnDate: data.returnDate,
      createdBy: data.createdBy ?? ctx?.userId,
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: new Decimal(String(item.unitPrice)),
          unitCostPrice: item.unitCostPrice !== undefined ? new Decimal(String(item.unitCostPrice)) : null,
        })),
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return transaction;
}

export async function createTransactionWithStock(data: CreateTransactionData, ctx?: { userId?: string }) {
  const needsStock = data.type === 'RENT' || data.type === 'SOLD';
  const productIds = data.items.map(i => i.productId);

  const stocks = await prisma.stock.findMany({ where: { productId: { in: productIds } } });
  const stockMap = new Map(stocks.map(s => [s.productId, s]));

  if (needsStock) {
    for (const item of data.items) {
      const s = stockMap.get(item.productId);
      if (!s) throw new Error(`Stock not found for product: ${item.productId}`);
      if (s.quantity < item.quantity) throw new Error(`Insufficient stock for product: ${item.productId}`);
    }
  }

  const created = await prisma.$transaction(async tx => {
    const createdBy = data.createdBy ?? ctx?.userId;
    const createdTx = await tx.transaction.create({
      data: {
        customerId: data.customerId,
        type: data.type,
        totalAmount: data.totalAmount !== undefined ? new Decimal(String(data.totalAmount)) : null,
        totalCost: data.totalCost !== undefined ? new Decimal(String(data.totalCost)) : null,
        profitLoss: data.profitLoss !== undefined ? new Decimal(String(data.profitLoss)) : null,
        startDate: data.startDate,
        returnDate: data.returnDate,
        createdBy: createdBy,
        items: { create: data.items.map(i => ({ productId: i.productId, quantity: i.quantity, unitPrice: new Decimal(String(i.unitPrice)), unitCostPrice: i.unitCostPrice !== undefined ? new Decimal(String(i.unitCostPrice)) : null })) },
      },
      include: { customer: true, items: { include: { product: true } } },
    });

    if (needsStock) {
      for (const it of data.items) {
        const s = stockMap.get(it.productId)!;
        await tx.stock.update({ where: { id: s.id }, data: { quantity: { decrement: it.quantity } } });
      }
    }

    return createdTx;
  });

  return created;
}

export async function updateTransaction(id: string, data: UpdateTransactionData) {
  const transaction = await prisma.transaction.update({
    where: { id },
    data: {
      customerId: data.customerId,
      type: data.type,
      totalAmount: data.totalAmount !== undefined ? new Decimal(String(data.totalAmount)) : undefined,
      totalCost: data.totalCost !== undefined ? new Decimal(String(data.totalCost)) : undefined,
      profitLoss: data.profitLoss !== undefined ? new Decimal(String(data.profitLoss)) : undefined,
      startDate: data.startDate,
      returnDate: data.returnDate,
      updatedBy: data.updatedBy,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return transaction;
}

export async function updateTransactionWithStockAdjustments(id: string, data: UpdateTransactionData) {
  const existing = await getTransactionWithItems(id);
  if (!existing) throw new Error('Transaction not found');

  const newType = data.type !== undefined ? data.type : existing.type;

  if (newType === 'RETURNED' && existing.items?.length) {
    await prisma.$transaction(async tx => {
      for (const it of existing.items) {
        await tx.stock.update({ where: { productId: it.productId }, data: { quantity: { increment: it.quantity } } });
      }
      await tx.transaction.update({ where: { id }, data: { ...data } });
    });
    return getTransactionById(id);
  }

  if (existing.type === 'RETURNED' && (newType === 'RENT' || newType === 'SOLD')) {
    const productIds = existing.items.map(i => i.productId);
    const stocks = await prisma.stock.findMany({ where: { productId: { in: productIds } } });
    const stockMap = new Map(stocks.map(s => [s.productId, s]));
    for (const it of existing.items) {
      const s = stockMap.get(it.productId);
      if (!s || s.quantity < it.quantity) throw new Error(`Insufficient stock for product: ${it.productId}`);
    }

    await prisma.$transaction(async tx => {
      for (const it of existing.items) {
        const s = stockMap.get(it.productId)!;
        await tx.stock.update({ where: { id: s.id }, data: { quantity: { decrement: it.quantity } } });
      }
      await tx.transaction.update({ where: { id }, data: { ...data } });
    });

    return getTransactionById(id);
  }

  // Default update (no stock changes)
  return updateTransaction(id, data);
}

export async function deleteTransaction(id: string) {
  await prisma.transaction.delete({ where: { id } });
}

export async function getTransactionWithItems(id: string) {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });

  return transaction;
}

export async function deleteTransactionWithStockAdjustments(id: string) {
  const txObj = await getTransactionWithItems(id);
  if (!txObj) throw new Error('Transaction not found');

  const needRestore = txObj.type === 'RENT' || txObj.type === 'SOLD';
  if (!needRestore) {
    await deleteTransaction(id);
    return;
  }

  await prisma.$transaction(async tx => {
    for (const it of txObj.items) {
      await tx.stock.update({ where: { productId: it.productId }, data: { quantity: { increment: it.quantity } } });
    }
    await tx.transaction.delete({ where: { id } });
  });
}

export default {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  createTransactionWithStock,
  updateTransaction,
  updateTransactionWithStockAdjustments,
  deleteTransaction,
  getTransactionWithItems,
  deleteTransactionWithStockAdjustments,
};
