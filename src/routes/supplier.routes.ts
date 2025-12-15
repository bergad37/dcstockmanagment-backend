import { Router } from 'express';
import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from '../controllers/supplier.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createSupplierValidation,
  updateSupplierValidation,
} from '../validations/supplier.validation';

const router: Router = Router();
// Get all suppliers
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllSuppliers);

// Get supplier by ID
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getSupplierById
);

// Create supplier
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createSupplierValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createSupplier
);

// Update supplier
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateSupplierValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateSupplier
);

// Delete supplier
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteSupplier
);

export default router;
