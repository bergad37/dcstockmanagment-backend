import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/user.validation';

const router: Router = Router();
const userController = new UserController();

// Get all users - requires authentication
router.get(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => userController.getAllUsers(req, res)
);

// Get user by ID - requires authentication
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => userController.getUserById(req, res)
);

// Create user - requires authentication
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createUserValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => userController.createUser(req, res)
);

// Update user - requires authentication
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateUserValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  (req: Request, res: Response) => userController.updateUser(req, res)
);

// Delete user - requires authentication
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  (req: Request, res: Response) => userController.deleteUser(req, res)
);

export default router;
