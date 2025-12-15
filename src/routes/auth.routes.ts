import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import {
  registerValidation,
  loginValidation,
} from '../validations/auth.validation';

const router: Router = Router();
router.post('/register', registerValidation, ValidationMiddleware.handle.bind(ValidationMiddleware), register);

router.post('/login', loginValidation, ValidationMiddleware.handle.bind(ValidationMiddleware), login);

router.get('/profile', AuthMiddleware.authenticate.bind(AuthMiddleware), getProfile);

export default router;
