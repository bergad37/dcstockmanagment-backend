import { Router, Request, Response } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createCategoryValidation,
  updateCategoryValidation,
} from '../validations/category.validation';

const router: Router = Router();
const controller = new CategoryController();

// Get all categories
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllCategories(req, res)
);

// Get category by ID
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getCategoryById(req, res)
);

// Create category
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createCategoryValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.createCategory(req, res)
);

// Update category
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateCategoryValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateCategory(req, res)
);

// Delete category
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.deleteCategory(req, res)
);

export default router;
