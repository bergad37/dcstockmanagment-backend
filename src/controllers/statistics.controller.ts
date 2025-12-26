import { Request, Response } from 'express';
import statisticsService from '../services/statistics.service';
import { ResponseUtil } from '../utils/response';

export const getStatistics = async (_req: Request, res: Response) => {
  try {
    const stats = await statisticsService.getStatistics();
    return ResponseUtil.success(res, 'Statistics retrieved successfully', stats);
  } catch (error) {
    return ResponseUtil.serverError(res, error instanceof Error ? error.message : 'Failed to retrieve statistics');
  }
};

export default { getStatistics };
