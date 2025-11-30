import { Router, Request, Response } from 'express';
import { StockController } from '../controllers/stock.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { updateStockValidation } from '../validations/stock.validation';

const router: Router = Router();
const controller = new StockController();

// Get all stock
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getAllStock(req, res)
);

// Get stock by ID
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getStockById(req, res)
);

// Get stock by product ID
router.get(
  '/product/:productId',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => controller.getStockByProductId(req, res)
);

// Update stock
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateStockValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => controller.updateStock(req, res)
);

export default router;
