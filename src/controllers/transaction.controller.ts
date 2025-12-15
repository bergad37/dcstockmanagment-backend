import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import { TransactionType, CreateTransactionData, UpdateTransactionData, TransactionItemInput } from '../common/types';



const normalizeType = (t?: string) => (t ? TransactionType[t.toUpperCase() as keyof typeof TransactionType] : undefined);

const validateItems = (items: TransactionItemInput[]) => {
  if (!items?.length) return 'At least one item is required';
  for (const i of items) {
    if (!i.productId) return 'Invalid productId';
    if (!Number.isInteger(i.quantity) || i.quantity <= 0) return 'Invalid quantity';
    if (typeof i.unitPrice !== 'number') return 'Invalid unitPrice';
  }
  return null;
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { skip, limit, page } = PaginationUtil.getPaginationParams(req);
    const { type, startDate, endDate, searchKey } = req.query;

    const conditions: { type?: string; startDate?: string; endDate?: string; searchKey?: string } = {};
    if (type) {
      const normalized = normalizeType(String(type));
      if (normalized) conditions.type = String(normalized);
      else return ResponseUtil.error(res, 'Invalid transaction type');
    }
    if (startDate) conditions.startDate = String(startDate);
    if (endDate) conditions.endDate = String(endDate);
    if (searchKey) conditions.searchKey = String(searchKey);

    const { transactions, total } = await transactionService.getAllTransactions(skip, limit, conditions);
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
    return tx ? ResponseUtil.success(res, 'OK', tx) : ResponseUtil.notFound(res, 'Transaction not found');
  } catch {
    return ResponseUtil.error(res, 'Error fetching transaction');
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
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
      createdBy: body.createdBy,
      items: body.items,
    };

    const result = await transactionService.createTransactionWithStock(data);
    return ResponseUtil.created(res, 'Created', result);
  } catch {
    return ResponseUtil.error(res, 'Create failed');
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const existing = await transactionService.getTransactionWithItems(id!);
    if (!existing) return ResponseUtil.notFound(res, 'Not found');

    const newType = body.type ? normalizeType(body.type) : undefined;
    if (body.type && !newType) return ResponseUtil.error(res, 'Invalid transaction type');

    const data: UpdateTransactionData = {
      ...body,
      type: newType,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
    };

    const updated = await transactionService.updateTransactionWithStockAdjustments(id!, data);
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
