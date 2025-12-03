import { components } from './components/index';
import { paths } from './paths';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Stock Management API',
    version: '1.0.0',
    description:
      'Comprehensive REST API for managing stock, inventory, transactions, customers, and suppliers. Built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development server',
    },
    {
      url: 'https://api.stockmanagement.com',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and authorization endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints (CRUD operations)',
    },
    {
      name: 'Products',
      description: 'Product management endpoints',
    },
    {
      name: 'Categories',
      description: 'Product category management',
    },
    {
      name: 'Suppliers',
      description: 'Supplier management endpoints',
    },
    {
      name: 'Customers',
      description: 'Customer management endpoints',
    },
    {
      name: 'Stock',
      description: 'Stock and inventory management',
    },
    {
      name: 'Transactions',
      description: 'Transaction management (buy, borrow, return)',
    },
  ],
  components,
  paths,
};
