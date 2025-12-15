import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/user.validation';

const router: Router = Router();
// Get all users - requires authentication
router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getAllUsers);

// Get user by ID - requires authentication
router.get(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  getUserById
);

// Create user - requires authentication
router.post(
  '/',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  createUserValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  createUser
);

// Update user - requires authentication
router.put(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  updateUserValidation,
  ValidationMiddleware.handle.bind(ValidationMiddleware),
  updateUser
);

// Delete user - requires authentication
router.delete(
  '/:id',
  AuthMiddleware.authenticate.bind(AuthMiddleware),
  deleteUser
);

export default router;
