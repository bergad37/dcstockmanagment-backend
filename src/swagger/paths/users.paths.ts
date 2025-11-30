export const usersPaths = {
  '/api/v1/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      description:
        'Retrieve a paginated list of all users. Only accessible by ADMIN and MANAGER roles.',
      operationId: 'getAllUsers',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1,
            minimum: 1,
          },
          description: 'Page number for pagination',
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
          },
          description: 'Number of items per page',
        },
      ],
      responses: {
        '200': {
          description: 'Users retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UsersListResponse',
              },
            },
          },
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },

    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      description: 'Create a new user account. Only accessible by ADMIN role.',
      operationId: 'createUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserInput',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully',
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
                    example: 'User created successfully',
                  },
                  data: {
                    $ref: '#/components/schemas/User',
                  },
                },
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
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },

  '/api/v1/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      description:
        'Retrieve a specific user by their ID. Only accessible by ADMIN and MANAGER roles.',
      operationId: 'getUserById',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'User ID',
        },
      ],
      responses: {
        '200': {
          description: 'User retrieved successfully',
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
                    example: 'User retrieved successfully',
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
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },

    put: {
      tags: ['Users'],
      summary: 'Update user',
      description:
        "Update an existing user's information. Only accessible by ADMIN role.",
      operationId: 'updateUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'User ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserInput',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
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
                    example: 'User updated successfully',
                  },
                  data: {
                    $ref: '#/components/schemas/User',
                  },
                },
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
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },

    delete: {
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Delete a user account. Only accessible by ADMIN role.',
      operationId: 'deleteUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'User ID',
        },
      ],
      responses: {
        '200': {
          description: 'User deleted successfully',
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
                    example: 'User deleted successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },
};
