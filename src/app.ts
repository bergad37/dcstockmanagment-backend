import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app: Express = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Global Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}`, routes);

// Swagger Documentation
setupSwagger(app);

// Error Handling Middlewares (Must be last)
app.use((_req: express.Request, res: express.Response): void => {
  ErrorMiddleware.notFound(_req, res);
});
app.use((err: unknown, _req: express.Request, res: express.Response): void => {
  if (err instanceof Error) {
    ErrorMiddleware.handle(err, _req, res);
  } else {
    ErrorMiddleware.handle(new Error('Unknown error'), _req, res);
  }
});

export default app;
