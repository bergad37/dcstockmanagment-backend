import { body } from 'express-validator';

export const createUserValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['ADMIN', 'MANAGER', 'STAFF']).withMessage('Invalid role'),
];

export const updateUserValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('role')
    .optional()
    .isIn(['ADMIN', 'MANAGER', 'STAFF'])
    .withMessage('Invalid role'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
];
