import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { products, total } = await this.productService.getAllProducts(
        pagination.skip,
        pagination.limit
      );
      const meta = PaginationUtil.getPaginationMeta(
        pagination.page,
        pagination.limit,
        total
      );

      return ResponseUtil.success(res, 'Products retrieved successfully', {
        products,
        pagination: meta,
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get products'
      );
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const product = await this.productService.getProductById(id);
      return ResponseUtil.success(
        res,
        'Product retrieved successfully',
        product
      );
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Product not found'
      );
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.createProduct(
        req.body as Parameters<ProductService['createProduct']>[0]
      );
      return ResponseUtil.created(res, 'Product created successfully', product);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create product'
      );
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const product = await this.productService.updateProduct(
        id,
        req.body as Parameters<ProductService['updateProduct']>[1]
      );
      return ResponseUtil.success(res, 'Product updated successfully', product);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update product'
      );
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.productService.deleteProduct(id);
      return ResponseUtil.success(res, 'Product deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete product'
      );
    }
  };
}
