import prisma from '../utils/database';

interface UpdateStockData {
  totalQuantity?: number;
  availableQuantity?: number;
  itemCount?: number;
}

export class StockService {
  async getAllStock(skip: number, take: number) {
    const [stocks, total] = await Promise.all([
      prisma.stock.findMany({
        skip,
        take,
        include: {
          product: {
            include: {
              category: true,
              supplier: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.stock.count(),
    ]);

    return { stocks, total };
  }

  async getStockByProductId(productId: number) {
    const stock = await prisma.stock.findUnique({
      where: { productId },
      include: {
        product: {
          include: {
            category: true,
            supplier: true,
          },
        },
      },
    });

    if (!stock) {
      throw new Error('Stock not found for this product');
    }

    return stock;
  }

  async updateStock(id: number, data: UpdateStockData) {
    const stock = await prisma.stock.update({
      where: { id },
      data,
      include: {
        product: {
          include: {
            category: true,
            supplier: true,
          },
        },
      },
    });

    return stock;
  }

  async getStockById(id: number) {
    const stock = await prisma.stock.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            category: true,
            supplier: true,
          },
        },
      },
    });

    if (!stock) {
      throw new Error('Stock not found');
    }

    return stock;
  }
}
