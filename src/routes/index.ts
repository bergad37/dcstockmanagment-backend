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

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/products', productRoutes);

router.use('/categories', categoryRoutes);

router.use('/suppliers', supplierRoutes);

router.use('/customers', customerRoutes);

router.use('/stock', stockRoutes);

router.use('/transactions', transactionRoutes);

export default router;
