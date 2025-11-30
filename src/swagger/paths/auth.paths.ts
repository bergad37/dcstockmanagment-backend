export const authPaths = {
  '/api/v1/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description:
        'Create a new user account with email, password, name, and optional role. Default role is STAFF.',
      operationId: 'registerUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterInput',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },

  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
      description:
        'Authenticate user with email and password. Returns user data and JWT token.',
      operationId: 'loginUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginInput',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },

  '/api/v1/auth/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Get user profile',
      description:
        'Retrieve authenticated user profile information. Requires valid JWT token.',
      operationId: 'getUserProfile',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Profile retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'Profile retrieved successfully',
                  },
                  data: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },
};
