import { Request, Response } from 'express';
import * as stockService from '../services/stock.service';
import * as transactionService from '../services/transaction.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import { UpdateStockData, TransactionType } from '../common/types';

export const getAllStock = async (req: Request, res: Response) => {
  try {
    const { searchKey, startDate, endDate } = req.query;

    const pagination = PaginationUtil.getPaginationParams(req);
    const conditions = {
      searchKey: searchKey ? String(searchKey) : undefined,
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
    };

    const { stocks, total } = await stockService.getAllStock(
      pagination.skip,
      pagination.limit,
      conditions
    );
    const meta = PaginationUtil.getPaginationMeta(
      pagination.page,
      pagination.limit,
      total
    );

    return ResponseUtil.success(res, 'Stock retrieved successfully', {
      stocks,
      pagination: meta,
    });
  } catch (error) {
    return ResponseUtil.error(
      res,
      error instanceof Error ? error.message : 'Failed to get stock'
    );
  }
};

export const getStockByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId!;
    const stock = await stockService.getStockByProductId(productId);
    return ResponseUtil.success(res, 'Stock retrieved successfully', stock);
  } catch (error) {
    return ResponseUtil.notFound(
      res,
      error instanceof Error ? error.message : 'Stock not found'
    );
  }
};

export const getStockById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id!;
    const stock = await stockService.getStockById(id);
    return ResponseUtil.success(res, 'Stock retrieved successfully', stock);
  } catch (error) {
    return ResponseUtil.notFound(
      res,
      error instanceof Error ? error.message : 'Stock not found'
    );
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const id = req.params.id!;
    const authReq = req as any;
    const user = authReq.user;
    const stock = await stockService.updateStock(
      id,
      req.body as UpdateStockData,
      { userId: user?.id, user } as any
    );
    return ResponseUtil.success(res, 'Stock updated successfully', stock);
  } catch (error) {
    return ResponseUtil.error(
      res,
      error instanceof Error ? error.message : 'Failed to update stock'
    );
  }
};

export const markTransactionAsReturned = async (
  req: Request,
  res: Response
) => {
  try {
    const transactionId = req.params.transactionId!;
    const authReq = req as any;
    const user = authReq.user;

    // Mark the transaction as RETURNED, which will update stock automatically
    const transaction =
      await transactionService.updateTransactionWithStockAdjustments(
        transactionId,
        {
          type: TransactionType.RETURNED,
          returnDate: new Date(req.body.returnDate),
        },
        { userId: user?.id, user } as any
      );
    return ResponseUtil.success(
      res,
      'Transaction marked as returned successfully',
      transaction
    );
  } catch (error) {
    return ResponseUtil.error(
      res,
      error instanceof Error
        ? error.message
        : 'Failed to mark transaction as returned'
    );
  }
};
