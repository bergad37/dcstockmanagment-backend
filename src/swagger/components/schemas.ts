export const schemas = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'User ID',
        example: 1,
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'admin@stockmanagement.com',
      },
      name: {
        type: 'string',
        description: 'User full name',
        example: 'Admin User',
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'MANAGER', 'STAFF'],
        description: 'User role',
        example: 'ADMIN',
      },
      isActive: {
        type: 'boolean',
        description: 'User account status',
        example: true,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Account creation timestamp',
        example: '2024-01-01T00:00:00.000Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp',
        example: '2024-01-01T00:00:00.000Z',
      },
    },
  },

  RegisterInput: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'user@example.com',
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'User password (minimum 6 characters)',
        example: 'password123',
      },
      name: {
        type: 'string',
        description: 'User full name',
        example: 'John Doe',
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'MANAGER', 'STAFF'],
        description: 'User role',
        default: 'STAFF',
        example: 'STAFF',
      },
    },
  },

  LoginInput: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'admin@stockmanagement.com',
      },
      password: {
        type: 'string',
        description: 'User password',
        example: 'admin123',
      },
    },
  },

  AuthResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'Login successful',
      },
      data: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/User',
          },
          token: {
            type: 'string',
            description: 'JWT authentication token',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
    },
  },

  CreateUserInput: {
    type: 'object',
    required: ['email', 'password', 'name', 'role'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'newuser@example.com',
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'User password (minimum 6 characters)',
        example: 'password123',
      },
      name: {
        type: 'string',
        description: 'User full name',
        example: 'New User',
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'MANAGER', 'STAFF'],
        description: 'User role',
        example: 'STAFF',
      },
    },
  },

  UpdateUserInput: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'updated@example.com',
      },
      name: {
        type: 'string',
        description: 'User full name',
        example: 'Updated Name',
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'MANAGER', 'STAFF'],
        description: 'User role',
        example: 'MANAGER',
      },
      isActive: {
        type: 'boolean',
        description: 'User account status',
        example: true,
      },
    },
  },

  ApiResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Indicates if the request was successful',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Operation completed successfully',
      },
      data: {
        type: 'object',
        description: 'Response data (varies by endpoint)',
      },
      error: {
        type: 'string',
        description: 'Error message (only present on failure)',
        example: 'An error occurred',
      },
    },
  },

  PaginationMeta: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        description: 'Current page number',
        example: 1,
      },
      limit: {
        type: 'integer',
        description: 'Number of items per page',
        example: 10,
      },
      total: {
        type: 'integer',
        description: 'Total number of items',
        example: 100,
      },
      totalPages: {
        type: 'integer',
        description: 'Total number of pages',
        example: 10,
      },
    },
  },

  UsersListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'Users retrieved successfully',
      },
      data: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User',
            },
          },
          pagination: {
            $ref: '#/components/schemas/PaginationMeta',
          },
        },
      },
    },
  },

  Error: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false,
      },
      message: {
        type: 'string',
        description: 'Error message',
        example: 'An error occurred',
      },
      error: {
        type: 'string',
        description: 'Detailed error information',
        example: 'Invalid input data',
      },
    },
  },
};
