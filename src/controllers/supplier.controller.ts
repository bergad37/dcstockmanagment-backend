import { Request, Response } from 'express';
import * as supplierService from '../services/supplier.service';
import { CreateSupplierData, UpdateSupplierData } from '../common/types';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';
import prisma from '../utils/database';



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
    const supplier = await supplierService.getSupplierById(req.params.id!);
    return ResponseUtil.success(res, 'Supplier retrieved successfully', supplier);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'Supplier not found');
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const user = authReq.user;
  const supplier = await supplierService.createSupplier(req.body as CreateSupplierData, { userId: user?.id, user } as any);
    return ResponseUtil.created(res, 'Supplier created successfully', supplier);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create supplier');
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const user = authReq.user;
  const supplier = await supplierService.updateSupplier(req.params.id!, req.body as UpdateSupplierData, { userId: user?.id, user } as any);
    return ResponseUtil.success(res, 'Supplier updated successfully', supplier);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update supplier');
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const supplierId = req.params.id!;
    const referencedCount = await prisma.product.count({ where: { supplierId } });
    if (referencedCount > 0) {
      return ResponseUtil.error(res, 'Cannot delete supplier: there are products assigned to this supplier', undefined, 400);
    }
    await supplierService.deleteSupplier(supplierId);
    return ResponseUtil.success(res, 'Supplier deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete supplier');
  }
};
