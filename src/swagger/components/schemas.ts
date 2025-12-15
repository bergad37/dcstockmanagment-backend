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

  Product: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Product ID (UUID)' },
      categoryId: { type: 'string' },
      supplierId: { type: 'string', nullable: true },
      name: { type: 'string' },
      type: { type: 'string', enum: ['ITEM', 'QUANTITY'] },
      serialNumber: { type: 'string', nullable: true },
      warranty: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      costPrice: { type: 'string', format: 'decimal', nullable: true },
      entryDate: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  Customer: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      phone: { type: 'string', nullable: true },
      email: { type: 'string', format: 'email', nullable: true },
      address: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateCustomerInput: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
      address: { type: 'string' },
    },
  },

  UpdateCustomerInput: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
      address: { type: 'string' },
    },
  },

  CreateProductInput: {
    type: 'object',
    required: ['categoryId', 'name', 'type', 'quantity'],
    properties: {
      categoryId: { type: 'string' },
      supplierId: { type: 'string' },
      name: { type: 'string' },
      type: { type: 'string', enum: ['ITEM', 'QUANTITY'] },
      quantity: { type: 'integer' },
      serialNumber: { type: 'string' },
      warranty: { type: 'string' },
      description: { type: 'string' },
      costPrice: { type: 'number' },
    },
  },

  UpdateProductInput: {
    type: 'object',
    properties: {
      categoryId: { type: 'string' },
      supplierId: { type: 'string' },
      name: { type: 'string' },
      type: { type: 'string', enum: ['ITEM', 'QUANTITY'] },
      serialNumber: { type: 'string' },
      warranty: { type: 'string' },
      description: { type: 'string' },
      costPrice: { type: 'number' },
    },
  },

  TransactionItem: {
    type: 'object',
    properties: {
      productId: { type: 'string' },
      quantity: { type: 'integer' },
      unitPrice: { type: 'number' },
      unitCostPrice: { type: 'number', nullable: true },
    },
  },

  Transaction: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      customerId: { type: 'string', nullable: true },
      type: { type: 'string', enum: ['SOLD', 'RETURNED', 'RENT'] },
      totalAmount: { type: 'number', nullable: true },
      totalCost: { type: 'number', nullable: true },
      profitLoss: { type: 'number', nullable: true },
      startDate: { type: 'string', format: 'date-time', nullable: true },
      returnDate: { type: 'string', format: 'date-time', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      items: { type: 'array', items: { $ref: '#/components/schemas/TransactionItem' } },
    },
  },

  CreateTransactionInput: {
    type: 'object',
    required: ['type', 'items'],
    properties: {
      customerId: { type: 'string' },
      type: { type: 'string', enum: ['SOLD', 'RETURNED', 'RENT'] },
      totalAmount: { type: 'number' },
      totalCost: { type: 'number' },
      profitLoss: { type: 'number' },
      startDate: { type: 'string', format: 'date-time' },
      returnDate: { type: 'string', format: 'date-time' },
      items: { type: 'array', items: { $ref: '#/components/schemas/TransactionItem' } },
    },
  },

  UpdateTransactionInput: {
    type: 'object',
    properties: {
      customerId: { type: 'string' },
      type: { type: 'string', enum: ['SOLD', 'RETURNED', 'RENT'] },
      totalAmount: { type: 'number' },
      totalCost: { type: 'number' },
      profitLoss: { type: 'number' },
      startDate: { type: 'string', format: 'date-time' },
      returnDate: { type: 'string', format: 'date-time' },
    },
  },

  Stock: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      productId: { type: 'string' },
      quantity: { type: 'integer' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      product: { $ref: '#/components/schemas/Product' },
    },
  },

  Supplier: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      phone: { type: 'string', nullable: true },
      email: { type: 'string', format: 'email', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateSupplierInput: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  },

  UpdateSupplierInput: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  },

  UpdateStockInput: {
    type: 'object',
    properties: {
      quantity: { type: 'integer' },
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

  CustomersListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Customers retrieved successfully' },
      data: {
        type: 'object',
        properties: {
          customers: { type: 'array', items: { $ref: '#/components/schemas/Customer' } },
          pagination: { $ref: '#/components/schemas/PaginationMeta' },
        },
      },
    },
  },

  SuppliersListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Suppliers retrieved successfully' },
      data: {
        type: 'object',
        properties: {
          suppliers: { type: 'array', items: { $ref: '#/components/schemas/Supplier' } },
          pagination: { $ref: '#/components/schemas/PaginationMeta' },
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
