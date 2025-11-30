import { Router, Request, Response } from 'express';
import { SupplierController } from '../controllers/supplier.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createSupplierValidation,
  updateSupplierValidation,
} from '../validations/supplier.validation';

const router: Router = Router();
const controller = new SupplierController();

// Get all suppliers
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllSuppliers(req, res)
);

// Get supplier by ID
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getSupplierById(req, res)
);

// Create supplier
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createSupplierValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.createSupplier(req, res)
);

// Update supplier
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateSupplierValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateSupplier(req, res)
);

// Delete supplier
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.deleteSupplier(req, res)
);

export default router;
