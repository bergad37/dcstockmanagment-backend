export const responses = {
  UnauthorizedError: {
    description: 'Authentication token is missing or invalid',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          success: false,
          message: 'Unauthorized',
          error: 'Invalid or expired token',
        },
      },
    },
  },

  ForbiddenError: {
    description: 'User does not have permission to access this resource',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          success: false,
          message: 'Forbidden',
          error: 'You do not have permission to access this resource',
        },
      },
    },
  },

  NotFoundError: {
    description: 'The requested resource was not found',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          success: false,
          message: 'Not found',
          error: 'Resource not found',
        },
      },
    },
  },

  ValidationError: {
    description: 'Request validation failed',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data provided',
        },
      },
    },
  },

  ServerError: {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
        example: {
          success: false,
          message: 'Internal server error',
          error: 'An unexpected error occurred',
        },
      },
    },
  },
};
