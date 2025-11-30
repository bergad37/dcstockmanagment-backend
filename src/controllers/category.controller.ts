import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { ResponseUtil } from '../utils/response';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getAllCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      return ResponseUtil.success(
        res,
        'Categories retrieved successfully',
        categories
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get categories'
      );
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const category = await this.categoryService.getCategoryById(id);
      return ResponseUtil.success(
        res,
        'Category retrieved successfully',
        category
      );
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'Category not found'
      );
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.createCategory(
        req.body as Parameters<CategoryService['createCategory']>[0]
      );
      return ResponseUtil.created(
        res,
        'Category created successfully',
        category
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create category'
      );
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const category = await this.categoryService.updateCategory(
        id,
        req.body as Parameters<CategoryService['updateCategory']>[1]
      );
      return ResponseUtil.success(
        res,
        'Category updated successfully',
        category
      );
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update category'
      );
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.categoryService.deleteCategory(id);
      return ResponseUtil.success(res, 'Category deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete category'
      );
    }
  };
}
