import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createProductValidation,
  updateProductValidation,
} from '../validations/product.validation';

const router: Router = Router();
const controller = new ProductController();
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllProducts(req, res),
);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getProductById(req, res),
);

// Create product
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createProductValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.createProduct(req, res),
);

// Update product
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateProductValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateProduct(req, res),
);

// Delete product
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.deleteProduct(req, res),
);

export default router;
