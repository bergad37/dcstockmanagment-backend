import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  getAllTransactions = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { transactions, total } =
        await this.transactionService.getAllTransactions(
          pagination.skip,
          pagination.limit
        );
      const meta = PaginationUtil.getPaginationMeta(
        pagination.page,
        pagination.limit,
        total
      );

      return ResponseUtil.success(res, 'Transactions retrieved successfully', {
        transactions,
        pagination: meta,
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get transactions'
      );
    }
  };

  getTransactionById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const transaction = await this.transactionService.getTransactionById(id);
      return ResponseUtil.success(
        res,
        'Transaction retrieved successfully',
        transaction
      );
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Transaction not found'
      );
    }
  };

  createTransaction = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.createTransaction(
        req.body as Parameters<TransactionService['createTransaction']>[0]
      );
      return ResponseUtil.created(
        res,
        'Transaction created successfully',
        transaction
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create transaction'
      );
    }
  };

  updateTransaction = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const transaction = await this.transactionService.updateTransaction(
        id,
        req.body as Parameters<TransactionService['updateTransaction']>[1]
      );
      return ResponseUtil.success(
        res,
        'Transaction updated successfully',
        transaction
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update transaction'
      );
    }
  };

  deleteTransaction = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.transactionService.deleteTransaction(id);
      return ResponseUtil.success(res, 'Transaction deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete transaction'
      );
    }
  };
}
