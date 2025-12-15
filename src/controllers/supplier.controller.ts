import { Request, Response } from 'express';
import * as supplierService from '../services/supplier.service';
import { CreateSupplierData, UpdateSupplierData } from '../common/types';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';



export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const pagination = PaginationUtil.getPaginationParams(req);
    const { searchKey } = req.query;
    const { suppliers, total } = await supplierService.getAllSuppliers(pagination.skip, pagination.limit, {
      searchKey: searchKey ? String(searchKey) : undefined,
    });
    const meta = PaginationUtil.getPaginationMeta(pagination.page, pagination.limit, total);

    return ResponseUtil.success(res, 'Suppliers retrieved successfully', { suppliers, pagination: meta });
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get suppliers');
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    const supplier = await supplierService.getSupplierById(id);
    return ResponseUtil.success(res, 'Supplier retrieved successfully', supplier);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'Supplier not found');
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const userId = authReq.user?.id;
  const supplier = await supplierService.createSupplier(req.body as CreateSupplierData, { userId });
    return ResponseUtil.created(res, 'Supplier created successfully', supplier);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create supplier');
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
  const authReq = req as any;
  const userId = authReq.user?.id;
  const supplier = await supplierService.updateSupplier(id, req.body as UpdateSupplierData, { userId });
    return ResponseUtil.success(res, 'Supplier updated successfully', supplier);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update supplier');
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    await supplierService.deleteSupplier(id);
    return ResponseUtil.success(res, 'Supplier deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete supplier');
  }
};
