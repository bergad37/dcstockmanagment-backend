import { Response } from 'express';
import { ApiResponse } from '../common/types';

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    error?: string,
    statusCode = 400
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, message: string, data?: T): Response {
    return this.success(res, message, data, 201);
  }

  static unauthorized(res: Response, message = 'Unauthorized'): Response {
    return this.error(res, message, undefined, 401);
  }

  static forbidden(res: Response, message = 'Forbidden'): Response {
    return this.error(res, message, undefined, 403);
  }

  static notFound(res: Response, message = 'Not found'): Response {
    return this.error(res, message, undefined, 404);
  }

  static serverError(
    res: Response,
    message = 'Internal server error',
    error?: string
  ): Response {
    return this.error(res, message, error, 500);
  }
}
