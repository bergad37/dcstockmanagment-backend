import { body } from 'express-validator';

export const createCustomerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('address')
    .optional()
    .isLength({ min: 5, max: 255 })
    .withMessage('Address must be between 5 and 255 characters'),
];

export const updateCustomerValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Customer name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('address')
    .optional()
    .isLength({ min: 5, max: 255 })
    .withMessage('Address must be between 5 and 255 characters'),
];
