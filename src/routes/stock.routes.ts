import { Router } from 'express';
import {
  getAllStock,
  getStockById,
  getStockByProductId,
  updateStock,
  markTransactionAsReturned,
} from '../controllers/stock.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  updateStockValidation,
  markAsReturnedValidation,
} from '../validations/stock.validation';

const router: Router = Router();
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllStock);

router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getStockById
);

router.get(
  '/product/:productId',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getStockByProductId
);

router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateStockValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateStock
);

router.patch(
  '/out/:transactionId/return',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  markAsReturnedValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  markTransactionAsReturned
);

export default router;
