import { Router, Request, Response } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createTransactionValidation,
  updateTransactionValidation,
} from '../validations/transaction.validation';

const router: Router = Router();
const controller = new TransactionController();

// Get all transactions
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllTransactions(req, res)
);

// Get transaction by ID
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getTransactionById(req, res)
);

// Create transaction (buy/borrow/return)
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createTransactionValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.createTransaction(req, res)
);

// Update transaction
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateTransactionValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateTransaction(req, res)
);

// Delete transaction
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.deleteTransaction(req, res)
);

export default router;
