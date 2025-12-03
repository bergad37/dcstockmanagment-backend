import { Request } from 'express';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export enum TransactionType {
  BUY = 'BUY',
  BORROW = 'BORROW',
  RETURN = 'RETURN',
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
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
  categoryId: number;
  supplierId?: number;
  name: string;
  type?: string;
  costPrice: number;
  sellingPrice: number;
}

export interface UpdateProductData {
  categoryId?: number;
  supplierId?: number;
  name?: string;
  type?: string;
  costPrice?: number;
  sellingPrice?: number;
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

export interface CreateTransactionData {
  customerId?: number;
  type: TransactionType;
  totalAmount: number;
  totalCost: number;
  profitLoss: number;
  items: Array<{
    productId: number;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    subtotalCost: number;
    subtotalRevenue: number;
    profitLoss: number;
  }>;
}

export interface UpdateTransactionData {
  customerId?: number;
  type?: TransactionType;
  totalAmount?: number;
  totalCost?: number;
  profitLoss?: number;
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
  totalQuantity?: number;
  availableQuantity?: number;
  itemCount?: number;
}

