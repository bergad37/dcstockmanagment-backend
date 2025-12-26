import { body } from 'express-validator';

export const createSupplierValidation = [
  body('name')
    .notEmpty()
    .withMessage('Supplier name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Supplier name must be between 2 and 100 characters'),
];

export const updateSupplierValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Supplier name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Supplier name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .custom((value) => {
      if (!value) return true;
      const cleaned = String(value).replace(/[\s-]/g, '');
      if (/^\+?\d{7,15}$/.test(cleaned)) return true;
      throw new Error('Please provide a valid phone number (e.g. +250 788 123 456)');
    }),
];
