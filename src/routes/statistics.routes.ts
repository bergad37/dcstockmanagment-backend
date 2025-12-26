import { Router } from 'express';
import { getStatistics } from '../controllers/statistics.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', AuthMiddleware.authenticate.bind(AuthMiddleware), getStatistics);

export default router;
