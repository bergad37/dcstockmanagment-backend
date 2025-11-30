import { Response } from 'express';
import { AuthRequest } from '../common/types';
import { AuthService } from '../services/auth.service';
import { ResponseUtil } from '../utils/response';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: AuthRequest, res: Response) => {
    try {
      const result = await this.authService.register(
        req.body as Parameters<AuthService['register']>[0]
      );
      return ResponseUtil.created(res, 'User registered successfully', result);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Registration failed'
      );
    }
  };

  login = async (req: AuthRequest, res: Response) => {
    try {
      const result = await this.authService.login(
        req.body as Parameters<AuthService['login']>[0]
      );
      return ResponseUtil.success(res, 'Login successful', result);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Login failed',
        undefined,
        401
      );
    }
  };

  getProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const user = await this.authService.getProfile(userId);
      return ResponseUtil.success(res, 'Profile retrieved successfully', user);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get profile'
      );
    }
  };
}
