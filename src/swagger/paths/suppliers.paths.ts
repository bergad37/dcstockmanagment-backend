export const suppliersPaths = {
  '/api/v1/suppliers': {
    get: {
      tags: ['Suppliers'],
      summary: 'List suppliers',
      security: [ { bearerAuth: [] } ],
      parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
        { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        { name: 'searchKey', in: 'query', schema: { type: 'string' }, description: 'Search supplier by name (case-insensitive contains)' },
      ],
      responses: {
        '200': { description: 'Suppliers list', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuppliersListResponse' } } } },
        '401': { $ref: '#/components/responses/UnauthorizedError' },
      },
    },
    post: {
      tags: ['Suppliers'],
      summary: 'Create supplier',
      security: [ { bearerAuth: [] } ],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateSupplierInput' } } } },
      responses: { '201': { description: 'Supplier created' }, '400': { $ref: '#/components/responses/ValidationError' }, '401': { $ref: '#/components/responses/UnauthorizedError' } },
    },
  },
  '/api/v1/suppliers/{id}': {
    get: { tags: ['Suppliers'], summary: 'Get supplier by id', security: [ { bearerAuth: [] } ], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Supplier', content: { 'application/json': { schema: { $ref: '#/components/schemas/Supplier' } } } }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } } },
    put: { tags: ['Suppliers'], summary: 'Update supplier', security: [ { bearerAuth: [] } ], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateSupplierInput' } } } }, responses: { '200': { description: 'Supplier updated' }, '400': { $ref: '#/components/responses/ValidationError' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } } },
    delete: { tags: ['Suppliers'], summary: 'Delete supplier', security: [ { bearerAuth: [] } ], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Supplier deleted' }, '401': { $ref: '#/components/responses/UnauthorizedError' }, '404': { $ref: '#/components/responses/NotFoundError' } } },
  },
};
