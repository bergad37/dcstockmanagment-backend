import { body } from 'express-validator';

export const updateStockValidation = [
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];
