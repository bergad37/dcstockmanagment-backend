import { Router, Request, Response } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createCustomerValidation,
  updateCustomerValidation,
} from '../validations/customer.validation';

const router: Router = Router();
const controller = new CustomerController();

router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllCustomers(req, res)
);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getCustomerById(req, res)
);

router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createCustomerValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.createCustomer(req, res)
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateCustomerValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateCustomer(req, res)
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.deleteCustomer(req, res)
);

export default router;
