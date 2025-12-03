import { CreateTransactionData, UpdateTransactionData } from '../common/types';
import prisma from '../utils/database';



export class TransactionService {
  async getAllTransactions(skip: number, take: number) {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        skip,
        take,
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.transaction.count(),
    ]);

    return { transactions, total };
  }

  async getTransactionById(id: number) {
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

  async createTransaction(data: CreateTransactionData) {
    const transaction = await prisma.transaction.create({
      data: {
        customerId: data.customerId,
        type: data.type,
        totalAmount: data.totalAmount,
        totalCost: data.totalCost,
        profitLoss: data.profitLoss,
        items: {
          create: data.items,
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

  async updateTransaction(id: number, data: UpdateTransactionData) {
    const transaction = await prisma.transaction.update({
      where: { id },
      data,
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

  async deleteTransaction(id: number) {
    await prisma.transaction.delete({ where: { id } });
  }
}
