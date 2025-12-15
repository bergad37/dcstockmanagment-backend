export const customersPaths = {
  '/api/v1/customers': {
    get: {
      tags: ['Customers'],
      summary: 'List customers',
      security: [ { bearerAuth: [] } ],
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', default: 1 },
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', default: 10 },
        },
        {
          name: 'searchKey',
          in: 'query',
          schema: { type: 'string' },
          description: 'Search customer by name (case-insensitive contains)'
        },
      ],
      responses: {
        '200': { description: 'Customers list', content: { 'application/json': { schema: { $ref: '#/components/schemas/CustomersListResponse' } } } },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
    post: {
      tags: ['Customers'],
      summary: 'Create customer',
      security: [ { bearerAuth: [] } ],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCustomerInput' } } },
      },
      responses: {
        '201': { description: 'Customer created' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
  },
  '/api/v1/customers/{id}': {
    get: {
      tags: ['Customers'],
      summary: 'Get customer by id',
      security: [ { bearerAuth: [] } ],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: { '200': { description: 'Customer', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } },
    },
    put: {
      tags: ['Customers'],
      summary: 'Update customer',
      security: [ { bearerAuth: [] } ],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateCustomerInput' } } } },
      responses: { '200': { description: 'Customer updated' }, '400': { $ref: '#/components/responses/ValidationError' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } },
    },
    delete: {
      tags: ['Customers'],
      summary: 'Delete customer',
      security: [ { bearerAuth: [] } ],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: { '200': { description: 'Customer deleted' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } },
    },
  },
};
