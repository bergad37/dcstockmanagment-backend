import { Request, Response } from 'express';
import * as customerService from '../services/customer.service';
import { CreateCustomerData, UpdateCustomerData } from '../common/types';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';



export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const pagination = PaginationUtil.getPaginationParams(req);
    const { searchKey } = req.query;
    const { customers, total } = await customerService.getAllCustomers(pagination.skip, pagination.limit, {
      searchKey: searchKey ? String(searchKey) : undefined,
    });
    const meta = PaginationUtil.getPaginationMeta(pagination.page, pagination.limit, total);

    return ResponseUtil.success(res, 'Customers retrieved successfully', { customers, pagination: meta });
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get customers');
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    const customer = await customerService.getCustomerById(id);
    return ResponseUtil.success(res, 'Customer retrieved successfully', customer);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'Customer not found');
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const user = authReq.user;
    const customer = await customerService.createCustomer(req.body as CreateCustomerData, { userId: user?.id, user } as any);
    return ResponseUtil.created(res, 'Customer created successfully', customer);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create customer');
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
  const authReq = req as any;
  const user = authReq.user;
  const customer = await customerService.updateCustomer(id, req.body as UpdateCustomerData, { userId: user?.id, user } as any);
    return ResponseUtil.success(res, 'Customer updated successfully', customer);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update customer');
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    await customerService.deleteCustomer(id);
    return ResponseUtil.success(res, 'Customer deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete customer');
  }
};
