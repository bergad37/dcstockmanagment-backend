import { Router } from 'express';
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customer.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createCustomerValidation,
  updateCustomerValidation,
} from '../validations/customer.validation';

const router: Router = Router();
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllCustomers);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getCustomerById
);

router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createCustomerValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createCustomer
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateCustomerValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateCustomer
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteCustomer
);

export default router;
