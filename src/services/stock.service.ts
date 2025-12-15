import { UpdateStockData } from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const stockInclude = {
  product: {
    include: { category: true, supplier: true },
  },
};

const base = createBaseService(prisma.stock, { idField: 'id', defaultInclude: stockInclude });

export async function getAllStock(
  skip: number,
  take: number,
  conditions?: {
    searchKey?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  const { searchKey, startDate, endDate } = conditions || {};
  const where: any = {};

  if (searchKey) {
    where.product = { name: { contains: searchKey, mode: 'insensitive' } };
  }

  if (startDate && endDate) {
    where.createdAt = { gte: new Date(String(startDate)), lte: new Date(String(endDate)) };
  }

  const { items: stocks, total } = await base.list({ skip, take, where, orderBy: { createdAt: 'desc' } });
  return { stocks, total };
}

export async function getStockByProductId(productId: string) {
  const stock = await prisma.stock.findUnique({ where: { productId }, include: stockInclude });
  if (!stock) throw new Error('Stock not found for this product');
  return stock;
}

export async function updateStock(id: string, data: UpdateStockData, ctx?: { userId?: string }) {
  return await base.updateById(id, data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function getStockById(id: string) {
  return await base.getById(id);
}

export default { getAllStock, getStockByProductId, updateStock, getStockById };
