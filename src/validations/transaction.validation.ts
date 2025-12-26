import { body } from 'express-validator';

export const createStockOutValidation = [
  // Root product - removed since using items
  // body('productId')
  //   .notEmpty()
  //   .withMessage('Product ID is required')
  //   .isString()
  //   .withMessage('Product ID must be a string'),

  // Transaction type
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['SOLD', 'RENTED'])
    .withMessage('Transaction type must be SOLD or RENTED'),

  // Transaction date
  body('transactionDate')
    .notEmpty()
    .withMessage('Transaction date is required')
    .isISO8601()
    .withMessage('Transaction date must be a valid ISO8601 date'),

  // Return date (only for RENTED)
  body('returnDate')
    .if(body('type').equals('RENTED'))
    .notEmpty()
    .withMessage('Return date is required for rented items')
    .isISO8601()
    .withMessage('Return date must be a valid ISO8601 date'),

  // Items array
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be a non-empty array'),

  body('items.*.productId')
    .notEmpty()
    .withMessage('Item product ID is required')
    .isString()
    .withMessage('Item product ID must be a string'),

  body('customerId')
    .notEmpty()
    .withMessage('Customer ID is required')
    .isString()
    .withMessage('Customer ID must be a string'),

  body('items.*.quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer greater than 0'),

  // Optional unitPrice
  body('items.*.unitPrice')
    .optional()
    .isNumeric()
    .withMessage('Unit price must be a number'),
];

export const updateTransactionValidation = [
  body('type')
    .optional()
    .isIn(['SOLD', 'RENT', 'RETURNED'])
    .withMessage('Transaction type must be one of: SOLD, RENT, RETURNED'),
  body('customerId')
    .optional()
    .isString()
    .withMessage('Customer ID must be a string'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),
  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be a valid ISO8601 date'),
];
