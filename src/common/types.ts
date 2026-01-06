import { Request } from 'express';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export enum ProductType {
  ITEM = 'ITEM',
  QUANTITY = 'QUANTITY',
}

export enum TransactionType {
  SOLD = 'SOLD',
  RETURNED = 'RETURNED',
  RENT = 'RENT',
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface ServiceContext {
  user?: {
    id: string;
    email?: string;
    role?: UserRole;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateProductData {
  categoryId: string;
  supplierId?: string;
  name: string;
  type: ProductType;
  quantity: number; // Required - added for stock creation
  serialNumber?: string;
  warranty?: string;
  description?: string;
  costPrice?: number;
  createdBy?: string;
  updatedBy?: string;
}

export interface UpdateProductData {
  categoryId?: string;
  supplierId?: string;
  name?: string;
  type?: ProductType;
  serialNumber?: string;
  warranty?: string;
  description?: string;
  costPrice?: number;
  updatedBy?: string;
}

export interface CreateCustomerData {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateCustomerData {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface CreateCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface TransactionItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
  unitCostPrice?: number;
}

export interface CreateTransactionData {
  customerId?: string;
  type: TransactionType;
  totalAmount?: number;
  totalCost?: number;
  profitLoss?: number;
  startDate?: Date;
  returnDate?: Date;
  expectedReturnDate?: Date;
  items: TransactionItemInput[];
  createdBy?: string;
}

export interface UpdateTransactionData {
  customerId?: string;
  type?: TransactionType;
  totalAmount?: number;
  totalCost?: number;
  profitLoss?: number;
  startDate?: Date;
  returnDate?: Date;
  expectedReturnDate?: Date;
  updatedBy?: string;
}

export interface CreateSupplierData {
  name: string;
  phone?: string;
  email?: string;
}

export interface UpdateSupplierData {
  name?: string;
  phone?: string;
  email?: string;
}

export interface UpdateStockData {
  quantity?: number;
}
