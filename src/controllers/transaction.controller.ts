import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import {
  TransactionType,
  CreateTransactionData,
  UpdateTransactionData,
  TransactionItemInput,
} from '../common/types';

export class TransactionController {
  private transactionService = new TransactionService();

  private normalizeType = (t?: string) =>
    t ? TransactionType[t.toUpperCase() as keyof typeof TransactionType] : undefined;

  private validateItems(items: TransactionItemInput[]) {
    if (!items?.length) return 'At least one item is required';
    for (const i of items) {
      if (!i.productId) return 'Invalid productId';
      if (!Number.isInteger(i.quantity) || i.quantity <= 0) return 'Invalid quantity';
      if (typeof i.unitPrice !== 'number') return 'Invalid unitPrice';
    }
    return null;
  }
  getAllTransactions = async (req: Request, res: Response) => {
    try {
      const { skip, limit, page } = PaginationUtil.getPaginationParams(req);
      const { transactions, total } = await this.transactionService.getAllTransactions(skip, limit);
      return ResponseUtil.success(res, 'OK', {
        transactions,
        pagination: PaginationUtil.getPaginationMeta(page, limit, total),
      });
    } catch {
      return ResponseUtil.error(res, 'Failed to fetch transactions');
    }
  };

  getTransactionById = async (req: Request, res: Response) => {
    try {
      const tx = await this.transactionService.getTransactionById(req.params.id!);
      return tx
        ? ResponseUtil.success(res, 'OK', tx)
        : ResponseUtil.notFound(res, 'Transaction not found');
    } catch {
      return ResponseUtil.error(res, 'Error fetching transaction');
    }
  };

  createTransaction = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const type = this.normalizeType(body.type);
      if (!type) return ResponseUtil.error(res, 'Invalid transaction type');

      const itemError = this.validateItems(body.items);
      if (itemError) return ResponseUtil.error(res, itemError);
      const data: CreateTransactionData = {
        customerId: body.customerId,
        type,
        totalAmount: body.totalAmount,
        totalCost: body.totalCost,
        profitLoss: body.profitLoss,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
        createdBy: body.createdBy,
        items: body.items,
      };

      const result = await this.transactionService.createTransactionWithStock(data);
      return ResponseUtil.created(res, 'Created', result);
    } catch {
      return ResponseUtil.error(res, 'Create failed');
    }
  };

  updateTransaction = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const existing = await this.transactionService.getTransactionWithItems(id!);
      if (!existing) return ResponseUtil.notFound(res, 'Not found');

      const newType = body.type ? this.normalizeType(body.type) : undefined;
      if (body.type && !newType) return ResponseUtil.error(res, 'Invalid transaction type');

      const data: UpdateTransactionData = {
        ...body,
        type: newType,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
      };

      const updated = await this.transactionService.updateTransactionWithStockAdjustments(id!, data);
      return ResponseUtil.success(res, 'Updated', updated);
    } catch {
      return ResponseUtil.error(res, 'Update failed');
    }
  };

  deleteTransaction = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const tx = await this.transactionService.getTransactionWithItems(id!);
      if (!tx) return ResponseUtil.notFound(res, 'Not found');

      await this.transactionService.deleteTransactionWithStockAdjustments(id!);
      return ResponseUtil.success(res, 'Deleted');
    } catch {
      return ResponseUtil.error(res, 'Delete failed');
    }
  };
}
