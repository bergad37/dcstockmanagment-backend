import { Response, NextFunction } from 'express';
import { AuthRequest, UserRole } from '../common/types';
import { JwtUtil } from '../utils/jwt';
import { ResponseUtil } from '../utils/response';

export class AuthMiddleware {
  static authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Response | void {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return ResponseUtil.unauthorized(res, 'No token provided');
      }

      const decoded = JwtUtil.verifyToken(token);
      req.user = decoded;
      next();
    } catch {
      return ResponseUtil.unauthorized(res, 'Invalid or expired token');
    }
  }

  static authorize(
    ...roles: UserRole[]
  ): (req: AuthRequest, res: Response, next: NextFunction) => Response | void {
    return (
      req: AuthRequest,
      res: Response,
      next: NextFunction
    ): Response | void => {
      if (!req.user) {
        return ResponseUtil.unauthorized(res, 'User not authenticated');
      }

      if (!roles.includes(req.user.role)) {
        return ResponseUtil.forbidden(
          res,
          'You do not have permission to access this resource'
        );
      }

      next();
    };
  }
}
