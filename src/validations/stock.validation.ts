import { body } from 'express-validator';

export const updateStockValidation = [
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];

export const markAsReturnedValidation = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('productId').isString().notEmpty().withMessage('Product ID is required'),
];
