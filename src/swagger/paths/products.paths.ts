export const productPaths = {
  '/api/v1/products': {
    get: {
      tags: ['Products'],
      summary: 'Get all products',
      description:
        'Retrieve a paginated list of all products with filtering and sorting options',
      operationId: 'getAllProducts',
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
          },
          description: 'Page number',
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
          },
          description: 'Items per page',
        },
      ],
      responses: {
        '200': {
          description: 'Products retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                  },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
      },
    },
    post: {
      tags: ['Products'],
      summary: 'Create product',
      operationId: 'createProduct',
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
              $ref: '#/components/schemas/CreateProductInput',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Product created successfully',
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
  '/api/v1/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Get product by ID',
      operationId: 'getProductById',
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
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Product retrieved successfully',
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
      tags: ['Products'],
      summary: 'Update product',
      operationId: 'updateProduct',
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
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateProductInput',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Product updated successfully',
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
      tags: ['Products'],
      summary: 'Delete product',
      operationId: 'deleteProduct',
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
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Product deleted successfully',
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
