import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import {
  TransactionType,
  CreateTransactionData,
  UpdateTransactionData,
  TransactionItemInput,
} from '../common/types';
import prisma from '../utils/database';

const normalizeType = (t?: string) =>
  t
    ? TransactionType[t.toUpperCase() as keyof typeof TransactionType]
    : undefined;

const validateItems = (items: TransactionItemInput[]) => {
  if (!items?.length) return 'At least one item is required';
  for (const i of items) {
    if (!i.productId) return 'Invalid productId';
    if (!Number.isInteger(i.quantity) || i.quantity <= 0)
      return 'Invalid quantity';
    if (typeof i.unitPrice !== 'number') return 'Invalid unitPrice';
  }
  return null;
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { skip, limit, page } = PaginationUtil.getPaginationParams(req);
    const { type, startDate, endDate, searchKey } = req.query;

    const conditions: {
      type?: string;
      startDate?: string;
      endDate?: string;
      searchKey?: string;
    } = {};
    if (type) {
      const normalized = normalizeType(String(type));
      if (normalized) conditions.type = String(normalized);
      else return ResponseUtil.error(res, 'Invalid transaction type');
    }
    if (startDate) conditions.startDate = String(startDate);
    if (endDate) conditions.endDate = String(endDate);
    if (searchKey) conditions.searchKey = String(searchKey);

    const { transactions, total } = await transactionService.getAllTransactions(
      skip,
      limit,
      conditions
    );
    return ResponseUtil.success(res, 'OK', {
      transactions,
      pagination: PaginationUtil.getPaginationMeta(page, limit, total),
    });
  } catch {
    return ResponseUtil.error(res, 'Failed to fetch transactions');
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const tx = await transactionService.getTransactionById(req.params.id!);
    return tx
      ? ResponseUtil.success(res, 'OK', tx)
      : ResponseUtil.notFound(res, 'Transaction not found');
  } catch {
    return ResponseUtil.error(res, 'Error fetching transaction');
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const user = authReq.user;
    const body = req.body;
    const type = normalizeType(body.type);
    if (!type) return ResponseUtil.error(res, 'Invalid transaction type');

    const itemError = validateItems(body.items);
    if (itemError) return ResponseUtil.error(res, itemError);
    const data: CreateTransactionData = {
      customerId: body.customerId,
      type,
      totalAmount: body.totalAmount,
      totalCost: body.totalCost,
      profitLoss: body.profitLoss,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
      expectedReturnDate: body.expectedReturnDate
        ? new Date(body.expectedReturnDate)
        : undefined,
      createdBy: body.createdBy ?? user?.id,
      items: body.items,
    };

    const result = await transactionService.createTransactionWithStock(data, {
      userId: user?.id,
      user,
    } as any);
    return ResponseUtil.created(res, 'Created', result);
  } catch {
    return ResponseUtil.error(res, 'Create failed');
  }
};

export const createStockOutTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    const authReq = req as any;
    const user = authReq.user;
    const body = req.body;

    // Normalize type
    const type =
      body.type === 'RENTED' ? TransactionType.RENT : TransactionType.SOLD;

    // Validate customer
    const customer = await prisma.customer.findUnique({
      where: { id: body.customerId },
    });

    if (!customer) {
      return ResponseUtil.error(
        res,
        'Customer not found, please add the client first.'
      );
    }

    // Load products + stock
    const productIds = body.items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { stock: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    // 🔍 Stock validation
    for (const item of body.items) {
      const product = productMap.get(item.productId);

      if (!product)
        return ResponseUtil.error(res, `Product not found: ${item.productId}`);

      if (!product.stock)
        return ResponseUtil.error(
          res,
          `Stock not found for product: ${product.name}`
        );

      if (product.type === 'QUANTITY') {
        if (product.stock.quantity < item.quantity) {
          return ResponseUtil.error(
            res,
            `Insufficient stock for ${product.name}. Available: ${product.stock.quantity}`
          );
        }
      }

      if (product.type === 'ITEM') {
        if (item.quantity !== 1) {
          return ResponseUtil.error(
            res,
            `Quantity must be 1 for item-type product: ${product.name}`
          );
        }
        if (product.stock.quantity < 1) {
          return ResponseUtil.error(
            res,
            `Item not available in stock: ${product.name}`
          );
        }
      }
    }

    // RENT requires expected return date
    if (type === TransactionType.RENT && !body.expectedReturnDate) {
      return ResponseUtil.error(
        res,
        'Expected return date is required for rented items'
      );
    }

    const startDate = new Date(body.transactionDate);
    const expectedReturnDate = body.expectedReturnDate
      ? new Date(body.expectedReturnDate)
      : undefined;

    // 🟢 SOLD → single transaction (existing behavior)
    if (type === TransactionType.SOLD) {
      const items = body.items.map((item: any) => {
        const product = productMap.get(item.productId);

        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice || 0,
          unitCostPrice: product?.costPrice ? Number(product.costPrice) : 0,
        };
      });

      const totalAmount = items.reduce(
        (sum: number, i: any) => sum + i.unitPrice * i.quantity,
        0
      );

      const totalCost = items.reduce(
        (sum: number, i: any) => sum + i.unitCostPrice * i.quantity,
        0
      );

      const data: CreateTransactionData = {
        customerId: body.customerId,
        type,
        startDate,
        createdBy: user?.id,
        items,
        totalAmount,
        totalCost,
        profitLoss: totalAmount - totalCost,
      };

      const result = await transactionService.createTransactionWithStock(data, {
        userId: user?.id,
        user,
      } as any);

      return ResponseUtil.created(
        res,
        'Stock out transaction created successfully',
        result
      );
    }

    // 🟡 RENT → one transaction per item
    const createdTransactions = [];

    for (const item of body.items) {
      const product = productMap.get(item.productId);

      const unitCostPrice = product?.costPrice ? Number(product.costPrice) : 0;

      const totalAmount = (item.unitPrice || 0) * item.quantity;
      const totalCost = unitCostPrice * item.quantity;

      const data: CreateTransactionData = {
        customerId: body.customerId,
        type: TransactionType.RENT,
        startDate,
        expectedReturnDate,
        createdBy: user?.id,
        items: [
          {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice || 0,
            unitCostPrice,
          },
        ],
        totalAmount,
        totalCost,
        profitLoss: totalAmount - totalCost,
      };

      const tx = await transactionService.createTransactionWithStock(data, {
        userId: user?.id,
        user,
      } as any);

      createdTransactions.push(tx);
    }

    return ResponseUtil.created(
      res,
      'Rental transactions created successfully',
      createdTransactions
    );
  } catch (error) {
    console.error('Create stock out transaction error:', error);
    return ResponseUtil.error(res, 'Failed to create stock out transaction');
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const authReq = req as any;
    const user = authReq.user;

    const existing = await transactionService.getTransactionWithItems(id!);
    if (!existing) return ResponseUtil.notFound(res, 'Not found');

    const newType = body.type ? normalizeType(body.type) : undefined;
    if (body.type && !newType)
      return ResponseUtil.error(res, 'Invalid transaction type');

    const data: UpdateTransactionData = {
      ...body,
      type: newType,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
      expectedReturnDate: body.expectedReturnDate
        ? new Date(body.expectedReturnDate)
        : undefined,
    };

    // attach updatedBy from authenticated user when available
    if (user) (data as any).updatedBy = user.id;

    const updated =
      await transactionService.updateTransactionWithStockAdjustments(
        id!,
        data,
        { userId: user?.id, user } as any
      );
    return ResponseUtil.success(res, 'Updated', updated);
  } catch {
    return ResponseUtil.error(res, 'Update failed');
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const tx = await transactionService.getTransactionWithItems(id!);
    if (!tx) return ResponseUtil.notFound(res, 'Not found');

    await transactionService.deleteTransactionWithStockAdjustments(id!);
    return ResponseUtil.success(res, 'Deleted');
  } catch {
    return ResponseUtil.error(res, 'Delete failed');
  }
};
