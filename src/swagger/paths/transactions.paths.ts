export const transactionPaths = {
  '/api/v1/transactions': {
    get: {
      tags: ['Transactions'],
      summary: 'Get all transactions',
      operationId: 'getAllTransactions',
      security: [ { bearerAuth: [] } ],
      parameters: [
        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' },
        { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Items per page' },
        { in: 'query', name: 'type', schema: { type: 'string' }, description: 'Transaction type (SOLD | RENT | RETURNED)', example: 'SOLD' },
        { in: 'query', name: 'searchKey', schema: { type: 'string' }, description: 'Search by customer name or product name', example: 'john' },
        { in: 'query', name: 'startDate', schema: { type: 'string', format: 'date' }, description: 'Start date (YYYY-MM-DD)', example: '2025-01-01' },
        { in: 'query', name: 'endDate', schema: { type: 'string', format: 'date' }, description: 'End date (YYYY-MM-DD)', example: '2025-12-31' },
      ],
      responses: {
        '200': {
          description: 'Transactions retrieved successfully',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
    post: {
      tags: ['Transactions'],
      summary: 'Create transaction',
      operationId: 'createTransaction',
      security: [ { bearerAuth: [] } ],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateTransactionInput' } } } },
      responses: {
        '201': { description: 'Transaction created successfully' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
  },
  '/api/v1/transactions/{id}': {
    get: {
      tags: ['Transactions'],
      summary: 'Get transaction by ID',
      operationId: 'getTransactionById',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Transaction retrieved successfully' },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
    put: {
      tags: ['Transactions'],
      summary: 'Update transaction',
      operationId: 'updateTransaction',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateTransactionInput' } } } },
      responses: {
        '200': { description: 'Transaction updated successfully' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
    delete: {
      tags: ['Transactions'],
      summary: 'Delete transaction',
      operationId: 'deleteTransaction',
      security: [ { bearerAuth: [] } ],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Transaction deleted successfully' },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
  },
};
