import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { CreateCategoryData, UpdateCategoryData } from '../common/types';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';



export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const pagination = PaginationUtil.getPaginationParams(req);
    const { searchKey } = req.query;
    const result = (await categoryService.getAllCategories(pagination.skip, pagination.limit, {
      searchKey: searchKey ? String(searchKey) : undefined,
    } as any)) as any;
    const { categories, total } = result;
    const meta = PaginationUtil.getPaginationMeta(pagination.page, pagination.limit, total);

    return ResponseUtil.success(res, 'Categories retrieved successfully', { categories, pagination: meta });
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get categories');
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
  const id = String(req.params.id || '');
    const category = await categoryService.getCategoryById(id);
    return ResponseUtil.success(res, 'Category retrieved successfully', category);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'Category not found');
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const user = authReq.user;
  const category = await categoryService.createCategory(req.body as CreateCategoryData, { userId: user?.id, user } as any);
    return ResponseUtil.created(res, 'Category created successfully', category);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create category');
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
  const id = String(req.params.id || '');
  const authReq = req as any;
  const user = authReq.user;
  const category = await categoryService.updateCategory(id, req.body as UpdateCategoryData, { userId: user?.id, user } as any);
    return ResponseUtil.success(res, 'Category updated successfully', category);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update category');
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
  const id = String(req.params.id || '');
  await categoryService.deleteCategory(id);
    return ResponseUtil.success(res, 'Category deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete category');
  }
};
