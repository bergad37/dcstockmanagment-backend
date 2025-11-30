export const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description:
      'Enter your JWT token in the format: Bearer <token>. You can obtain a token by logging in through the /api/v1/auth/login endpoint.',
  },
};
