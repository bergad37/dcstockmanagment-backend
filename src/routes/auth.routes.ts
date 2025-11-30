import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  registerValidation,
  loginValidation,
} from '../validations/auth.validation';

const router: Router = Router();
const authController = new AuthController();

router.post(
  '/register',
  registerValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => authController.register(req, res)
);

router.post(
  '/login',
  loginValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => authController.login(req, res)
);

router.get(
  '/profile',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => authController.getProfile(req, res)
);

export default router;
