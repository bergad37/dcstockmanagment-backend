export const transactionPaths = {
  '/api/v1/transactions': {
    get: {
      tags: ['Transactions'],
      summary: 'Get all transactions',
      operationId: 'getAllTransactions',
      parameters: [
        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
        { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 } },
      ],
      responses: {
        '200': {
          description: 'Transactions retrieved successfully',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
      },
    },
    post: {
      tags: ['Transactions'],
      summary: 'Create transaction',
      operationId: 'createTransaction',
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
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Transaction retrieved successfully' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
    put: {
      tags: ['Transactions'],
      summary: 'Update transaction',
      operationId: 'updateTransaction',
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateTransactionInput' } } } },
      responses: {
        '200': { description: 'Transaction updated successfully' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
    delete: {
      tags: ['Transactions'],
      summary: 'Delete transaction',
      operationId: 'deleteTransaction',
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        '200': { description: 'Transaction deleted successfully' },
        '404': { $ref: '#/components/responses/NotFoundError' },
      },
    },
  },
};
