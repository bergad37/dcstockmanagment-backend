import { body } from 'express-validator';

export const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
  body('costPrice')
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),
  body('sellingPrice')
    .isFloat({ min: 0 })
    .withMessage('Selling price must be a positive number'),
  body('supplierId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Supplier ID must be a positive integer'),
  body('type').optional().isString().withMessage('Type must be a string'),
];

export const updateProductValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Product name cannot be empty'),
  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),
  body('sellingPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Selling price must be a positive number'),
  body('supplierId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Supplier ID must be a positive integer'),
  body('type').optional().isString().withMessage('Type must be a string'),
];
