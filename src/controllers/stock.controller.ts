import { Request, Response } from 'express';
import { StockService } from '../services/stock.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class StockController {
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }

  getAllStock = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { stocks, total } = await this.stockService.getAllStock(
        pagination.skip,
        pagination.limit
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

  getStockByProductId = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId || '0');
      const stock = await this.stockService.getStockByProductId(productId);
      return ResponseUtil.success(res, 'Stock retrieved successfully', stock);
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Stock not found'
      );
    }
  };

  getStockById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const stock = await this.stockService.getStockById(id);
      return ResponseUtil.success(res, 'Stock retrieved successfully', stock);
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Stock not found'
      );
    }
  };

  updateStock = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const stock = await this.stockService.updateStock(
        id,
        req.body as Parameters<StockService['updateStock']>[1]
      );
      return ResponseUtil.success(res, 'Stock updated successfully', stock);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update stock'
      );
    }
  };
}
