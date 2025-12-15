import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { CreateCategoryData, UpdateCategoryData } from '../common/types';
import { ResponseUtil } from '../utils/response';



export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return ResponseUtil.success(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get categories');
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
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
    const id = parseInt(req.params.id || '0');
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
    const id = parseInt(req.params.id || '0');
    await categoryService.deleteCategory(id);
    return ResponseUtil.success(res, 'Category deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete category');
  }
};
