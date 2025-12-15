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
      // Accept: "Bearer <token>", bare token, or x-access-token header
      const authHeader = req.headers.authorization;
      let token: string | undefined;

      if (authHeader) {
        const parts = String(authHeader).split(' ');
        token = parts.length > 1 ? parts[1] : parts[0];
      }

      if (!token) {
        const alt = req.headers['x-access-token'];
        if (typeof alt === 'string') token = alt;
      }

      if (!token) {
        return ResponseUtil.unauthorized(res, 'No token provided');
      }

      const decoded = JwtUtil.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      // Log the error for debugging (do not leak sensitive data)
      // eslint-disable-next-line no-console
      console.error('AuthMiddleware.verifyToken error:', err instanceof Error ? err.message : String(err));
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
