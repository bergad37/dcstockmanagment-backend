import { Request, Response } from 'express';

export class ErrorMiddleware {
  static notFound(req: Request, res: Response): void {
    res.status(404).json({
      success: false,
      message: 'Route not found',
      error: `Cannot ${req.method} ${req.originalUrl}`,
    });
  }

  static handle(error: Error, _req: Request, res: Response): void {
    console.error('Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong',
    });
  }
}
