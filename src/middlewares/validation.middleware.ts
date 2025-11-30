import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ResponseUtil } from '../utils/response';

export class ValidationMiddleware {
  static handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseUtil.error(
        res,
        'Validation failed',
        JSON.stringify(errors.array()),
        400
      );
    }
    next();
  }
}
