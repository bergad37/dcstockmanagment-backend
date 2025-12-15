import { Response, Request } from 'express';
import { AuthRequest, RegisterData, LoginData } from '../common/types';
import * as authService from '../services/auth.service';
import { ResponseUtil } from '../utils/response';



export const register = async (req: Request, res: Response) => {
  try {
  const result = await authService.register(req.body as RegisterData);
    return ResponseUtil.created(res, 'User registered successfully', result);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Registration failed');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
  const result = await authService.login(req.body as LoginData);
    return ResponseUtil.success(res, 'Login successful', result);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Login failed', undefined, 401);
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await authService.getProfile(userId);
    return ResponseUtil.success(res, 'Profile retrieved successfully', user);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get profile');
  }
};
