import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerDocument } from '../swagger';

export const setupSwagger = (app: Express): void => {
  // Swagger UI options
  const swaggerOptions = {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .scheme-container { margin: 20px 0; padding: 20px; background: #fafafa; }
    `,
    customSiteTitle: 'Stock Management API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  };

  // Serve Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );

  // Serve Swagger JSON
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  // eslint-disable-next-line no-console
  console.log('📚 Swagger documentation available at /api-docs');
};
