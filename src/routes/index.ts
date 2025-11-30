import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import supplierRoutes from './supplier.routes';
import customerRoutes from './customer.routes';
import stockRoutes from './stock.routes';
import transactionRoutes from './transaction.routes';

const router: Router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management
router.use('/users', userRoutes);

// Product management
router.use('/products', productRoutes);

// Category management
router.use('/categories', categoryRoutes);

// Supplier management
router.use('/suppliers', supplierRoutes);

// Customer management
router.use('/customers', customerRoutes);

// Stock/Inventory management
router.use('/stock', stockRoutes);

// Transaction management
router.use('/transactions', transactionRoutes);

export default router;
