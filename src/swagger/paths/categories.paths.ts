export const categoryPaths = {
  '/api/v1/categories': {
    get: {
      tags: ['Categories'],
      summary: 'Get all categories',
      operationId: 'getAllCategories',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Categories retrieved successfully',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
      },
    },
    post: {
      tags: ['Categories'],
      summary: 'Create category',
      operationId: 'createCategory',
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
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Category created successfully',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
      },
    },
  },
  '/api/v1/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Get category by ID',
      operationId: 'getCategoryById',
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
          },
        },
      ],
      responses: {
        '200': {
          description: 'Category retrieved successfully',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
      },
    },
    put: {
      tags: ['Categories'],
      summary: 'Update category',
      operationId: 'updateCategory',
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
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Category updated successfully',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
      },
    },
    delete: {
      tags: ['Categories'],
      summary: 'Delete category',
      operationId: 'deleteCategory',
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
          },
        },
      ],
      responses: {
        '200': {
          description: 'Category deleted successfully',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
      },
    },
  },
};
