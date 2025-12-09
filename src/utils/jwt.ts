import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';
import { UserRole } from '../common/types';

interface JwtPayload {
  id:string;
  email: string;
  role: UserRole;
}

export class JwtUtil {
  private static readonly secret: string =
    process.env.JWT_SECRET || 'default-secret';
  private static readonly expiresIn: string = process.env.JWT_EXPIRE || '7d';

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      this.secret as Secret,
      {
        expiresIn: this.expiresIn,
      } as SignOptions
    );
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
