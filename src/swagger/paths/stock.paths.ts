export const stockPaths = {
  '/api/v1/stock': {
    get: {
      tags: ['Stock'],
      summary: 'Get all stock records',
      operationId: 'getAllStock',
      security: [ { bearerAuth: [] } ],
      parameters: [
        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' },
        { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Items per page' },
        { in: 'query', name: 'searchKey', schema: { type: 'string' }, description: 'Filter by product name (contains, case-insensitive)' , example: 'phone' },
        { in: 'query', name: 'startDate', schema: { type: 'string', format: 'date' }, description: 'Start date (YYYY-MM-DD)', example: '2025-01-01' },
        { in: 'query', name: 'endDate', schema: { type: 'string', format: 'date' }, description: 'End date (YYYY-MM-DD)', example: '2025-12-31' },
      ],
      responses: {
        '200': { description: 'Stock retrieved successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
  },
  '/api/v1/stock/{id}': {
    get: {
      tags: ['Stock'],
      summary: 'Get stock by ID',
      operationId: 'getStockById',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Stock retrieved successfully' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } },
    },
    put: {
      tags: ['Stock'],
      summary: 'Update stock',
      operationId: 'updateStock',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateStockInput' } } } },
      responses: { '200': { description: 'Stock updated successfully' }, '400': { $ref: '#/components/responses/ValidationError' }, '401': { $ref: '#/components/responses/UnauthorizedError' } },
    },
  },
  '/api/v1/stock/product/{productId}': {
    get: {
      tags: ['Stock'],
      summary: 'Get stock by product id',
      operationId: 'getStockByProductId',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'productId', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Stock retrieved successfully' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } },
    },
  },
};
