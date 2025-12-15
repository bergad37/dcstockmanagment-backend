import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createProductValidation,
  updateProductValidation,
} from '../validations/product.validation';

const router: Router = Router();
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllProducts);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getProductById
);

router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createProductValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createProduct
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateProductValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateProduct
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteProduct
);

export default router;
