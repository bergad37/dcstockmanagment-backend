import { body } from 'express-validator';

export const createStockOutValidation = [
  // Transaction type
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['SOLD', 'RENTED', 'MAINTAINED', 'NOT_MAINTAINED'])
    .withMessage(
      'Transaction type must be SOLD, RENTED, MAINTAINED, or NOT_MAINTAINED'
    ),

  // Transaction date
  body('transactionDate')
    .notEmpty()
    .withMessage('Transaction date is required')
    .isISO8601()
    .withMessage('Transaction date must be a valid ISO8601 date'),

  // Expected return date (required only for RENTED)
  body('expectedReturnDate')
    .if(body('type').equals('RENTED'))
    .notEmpty()
    .withMessage('Expected return date is required for rented items')
    .isISO8601()
    .withMessage('Expected return date must be a valid ISO8601 date'),

  // CustomerId (optional)
  body('customerId')
    .optional()
    .isString()
    .withMessage('Customer ID must be a string'),

  // CustomerName (optional)
  body('customerName')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Customer name cannot be empty'),

  // ❗ Require at least one of customerId or customerName
  body().custom((value) => {
    if (!value.customerId && !value.customerName) {
      throw new Error('Either customerId or customerName must be provided');
    }
    return true;
  }),

  // Items array
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be a non-empty array'),

  body('items.*.productId')
    .notEmpty()
    .withMessage('Item product ID is required')
    .isString()
    .withMessage('Item product ID must be a string'),

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
    .isIn(['SOLD', 'RENT', 'RETURNED', 'MAINTAINED', 'NOT_MAINTAINED'])
    .withMessage(
      'Transaction type must be one of: SOLD, RENT, RETURNED, MAINTAINED, NOT_MAINTAINED'
    ),
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
  body('expectedReturnDate')
    .optional()
    .isISO8601()
    .withMessage('Expected return date must be a valid ISO8601 date'),
];
