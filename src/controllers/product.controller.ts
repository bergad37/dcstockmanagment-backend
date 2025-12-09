import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import {
  AuthRequest,
  CreateProductData,
  UpdateProductData,
  ProductType,
} from '../common/types';

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
      const id = String(req.params.id || '');
      if (!id) return ResponseUtil.notFound(res, 'Product id is required');
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
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      const body = req.body as CreateProductData;
      const type: ProductType = body.type;
      let quantity: number = body.quantity ?? 1;
      if (type === ProductType.ITEM) {
        quantity = 1;
      }

      const createData: CreateProductData = {
        categoryId: body.categoryId,
        supplierId: body.supplierId,
        name: body.name,
        type: body.type,
        serialNumber: body.serialNumber,
        warranty: body.warranty,
        description: body.description,
        costPrice: body.costPrice,
        quantity,
        createdBy: userId,
      };

      const productWithStock = await this.productService.createProductWithStock(createData);

      return ResponseUtil.created(
        res,
        'Product created successfully',
        productWithStock
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create product'
      );
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id || '');
      if (!id) return ResponseUtil.error(res, 'Product id is required');
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;

      const updateData = {
        ...(req.body as UpdateProductData),
      } as UpdateProductData;
      if (userId) updateData.updatedBy = userId;

      const product = await this.productService.updateProduct(id, updateData);
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
      const id = String(req.params.id || '');
      if (!id) return ResponseUtil.error(res, 'Product id is required');
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
