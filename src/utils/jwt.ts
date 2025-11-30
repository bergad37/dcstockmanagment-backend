import jwt from 'jsonwebtoken';
import { UserRole } from '../common/types';

interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

export class JwtUtil {
  private static readonly secret: string =
    process.env.JWT_SECRET || 'default-secret';
  private static readonly expiresIn: string = process.env.JWT_EXPIRE || '7d';

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      expiresIn: this.expiresIn as any,
    });
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}
