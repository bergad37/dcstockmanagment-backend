import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  getAllCustomers = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { customers, total } = await this.customerService.getAllCustomers(
        pagination.skip,
        pagination.limit
      );
      const meta = PaginationUtil.getPaginationMeta(
        pagination.page,
        pagination.limit,
        total
      );

      return ResponseUtil.success(res, 'Customers retrieved successfully', {
        customers,
        pagination: meta,
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get customers'
      );
    }
  };

  getCustomerById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const customer = await this.customerService.getCustomerById(id);
      return ResponseUtil.success(
        res,
        'Customer retrieved successfully',
        customer
      );
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Customer not found'
      );
    }
  };

  createCustomer = async (req: Request, res: Response) => {
    try {
      const customer = await this.customerService.createCustomer(
        req.body as Parameters<CustomerService['createCustomer']>[0]
      );
      return ResponseUtil.created(
        res,
        'Customer created successfully',
        customer
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create customer'
      );
    }
  };

  updateCustomer = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const customer = await this.customerService.updateCustomer(
        id,
        req.body as Parameters<CustomerService['updateCustomer']>[1]
      );
      return ResponseUtil.success(
        res,
        'Customer updated successfully',
        customer
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update customer'
      );
    }
  };

  deleteCustomer = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.customerService.deleteCustomer(id);
      return ResponseUtil.success(res, 'Customer deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete customer'
      );
    }
  };
}
