import { Request, Response } from 'express';
import { SupplierService } from '../services/supplier.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class SupplierController {
  private supplierService: SupplierService;

  constructor() {
    this.supplierService = new SupplierService();
  }

  getAllSuppliers = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { suppliers, total } = await this.supplierService.getAllSuppliers(
        pagination.skip,
        pagination.limit
      );
      const meta = PaginationUtil.getPaginationMeta(
        pagination.page,
        pagination.limit,
        total
      );

      return ResponseUtil.success(res, 'Suppliers retrieved successfully', {
        suppliers,
        pagination: meta,
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get suppliers'
      );
    }
  };

  getSupplierById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const supplier = await this.supplierService.getSupplierById(id);
      return ResponseUtil.success(
        res,
        'Supplier retrieved successfully',
        supplier
      );
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Supplier not found'
      );
    }
  };

  createSupplier = async (req: Request, res: Response) => {
    try {
      const supplier = await this.supplierService.createSupplier(
        req.body as Parameters<SupplierService['createSupplier']>[0]
      );
      return ResponseUtil.created(
        res,
        'Supplier created successfully',
        supplier
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create supplier'
      );
    }
  };

  updateSupplier = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const supplier = await this.supplierService.updateSupplier(
        id,
        req.body as Parameters<SupplierService['updateSupplier']>[1]
      );
      return ResponseUtil.success(
        res,
        'Supplier updated successfully',
        supplier
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update supplier'
      );
    }
  };

  deleteSupplier = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.supplierService.deleteSupplier(id);
      return ResponseUtil.success(res, 'Supplier deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete supplier'
      );
    }
  };
}
