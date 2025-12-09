import { body } from 'express-validator';

export const createTransactionValidation = [
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['SOLD', 'RENT', 'RETURNED'])
    .withMessage('Transaction type must be one of: SOLD, RENT, RETURNED'),
  body('customerId')
    .optional()
    .isString()
    .withMessage('Customer ID must be a string'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one transaction item is required'),
  body('items.*.productId')
    .notEmpty()
    .isString()
    .withMessage('Each item must have a valid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('items.*.unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a non-negative number'),
  body('items.*.unitCostPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Unit cost price must be a non-negative number'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),
  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be a valid ISO8601 date'),
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
