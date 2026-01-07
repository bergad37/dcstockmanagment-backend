import { body } from 'express-validator';
import { ProductType } from '../common/types';

export const createProductValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),

  body('categoryId')
    .notEmpty()
    .withMessage('Category ID is required')
    .isString()
    .withMessage('Category ID must be a UUID string'),

  body('type')
    .notEmpty()
    .withMessage('Product type is required')
    .isIn(Object.values(ProductType))
    .withMessage(
      `Product type must be one of: ${Object.values(ProductType).join(', ')}`
    ),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
    .custom((value, { req }) => {
      // If type is ITEM, quantity should be 1 by default (can be provided but validated)
      const body = req.body as { type?: ProductType };
      if (body.type === ProductType.ITEM && value !== 1) {
        throw new Error('Quantity for ITEM type must be 1');
      }
      return true;
    }),

  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string'),

  body('warranty')
    .optional({ nullable: true })
    .isString()
    .withMessage('Warranty must be a string or null'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('costPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),

  body('supplierId')
    // Convert empty string to null (clearing relation from forms) and allow null/undefined
    .customSanitizer((value) => (value === '' ? null : value))
    .optional({ nullable: true })
    .isUUID()
    .withMessage('Supplier ID must be a UUID string'),

  body('supplierName')
    .optional()
    .isString()
    .withMessage('Supplier name must be a string')
    .custom((value, { req }) => {
      const body = req.body as { supplierId?: string; supplierName?: string };
      // If supplierId is not provided, supplierName is required
      if (!body.supplierId && !value) {
        throw new Error('Either supplierId or supplierName must be provided');
      }
      return true;
    })
    .custom(async (value) => {
      // Check if supplier name already exists when creating a new supplier
      if (value) {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        try {
          const existingSupplier = await prisma.supplier.findUnique({
            where: { name: value.trim() },
          });
          if (existingSupplier) {
            throw new Error(
              `Supplier with name "${value.trim()}" already exists`
            );
          }
        } finally {
          await prisma.$disconnect();
        }
      }
      return true;
    }),
];

export const updateProductValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Product name cannot be empty')
    .isString()
    .withMessage('Product name must be a string'),

  body('categoryId')
    .optional()
    .isString()
    .withMessage('Category ID must be a UUID string'),

  body('type')
    .optional()
    .isIn(Object.values(ProductType))
    .withMessage(
      `Product type must be one of: ${Object.values(ProductType).join(', ')}`
    ),

  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string'),

  body('warranty')
    .optional()
    .isString()
    .withMessage('Warranty must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),

  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
    .custom((value, { req }) => {
      const body = req.body as { type?: ProductType };
      if (body.type === ProductType.ITEM && value !== 1) {
        throw new Error('Quantity for ITEM type must be 1');
      }
      return true;
    }),

  body('supplierId')
    .customSanitizer((value) => (value === '' ? null : value))
    .optional({ nullable: true })
    .isUUID()
    .withMessage('Supplier ID must be a UUID string'),

  body('supplierName')
    .optional()
    .isString()
    .withMessage('Supplier name must be a string'),
];
