import { Router } from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  createStockOutTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createStockOutValidation,
  updateTransactionValidation,
} from '../validations/transaction.validation';

const router: Router = Router();
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getAllTransactions
);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getTransactionById
);

router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createStockOutValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createTransaction
);

router.post(
  '/stock/out',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createStockOutValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createStockOutTransaction
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateTransactionValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateTransaction
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteTransaction
);

export default router;
