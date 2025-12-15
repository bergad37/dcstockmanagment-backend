import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createCategoryValidation,
  updateCategoryValidation,
} from '../validations/category.validation';

const router: Router = Router();
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllCategories);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getCategoryById
);

router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createCategoryValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createCategory
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateCategoryValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateCategory
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteCategory
);

export default router;
