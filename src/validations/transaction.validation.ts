import { body } from 'express-validator';

export const createTransactionValidation = [
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['BUY', 'BORROW', 'RETURN'])
    .withMessage('Transaction type must be one of: BUY, BORROW, RETURN'),
  body('supplierId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Supplier ID must be a positive integer'),
  body('customerId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Customer ID must be a positive integer'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one transaction item is required'),
  body('items.*.productId')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('items.*.unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a non-negative number'),
];

export const updateTransactionValidation = [
  body('type')
    .optional()
    .isIn(['BUY', 'BORROW', 'RETURN'])
    .withMessage('Transaction type must be one of: BUY, BORROW, RETURN'),
  body('supplierId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Supplier ID must be a positive integer'),
  body('customerId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Customer ID must be a positive integer'),
];
