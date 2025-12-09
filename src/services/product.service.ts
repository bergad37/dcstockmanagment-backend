import { CreateProductData, UpdateProductData } from '../common/types';
import prisma from '../utils/database';
export class ProductService {
  async getAllProducts(skip: number, take: number) {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        include: {
          category: true,
          supplier: true,
          stock: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);

    return { products, total };
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: true,
        stock: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(data: CreateProductData) {
    const product = await prisma.product.create({
      data: {
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        name: data.name,
        type: data.type,
        serialNumber: data.serialNumber,
        warranty: data.warranty,
        description: data.description,
        costPrice: data.costPrice,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
      },
      include: {
        category: true,
        supplier: true,
        stock: true,
      },
    });

    return product;
  }

  async updateProduct(id: string, data: UpdateProductData) {
    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        supplier: true,
        stock: true,
      },
    });

    return product;
  }

  async deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
  }

  async createProductWithStock(data: CreateProductData) {
    const quantity = data.quantity ?? 1;

    const created = await prisma.$transaction(async tx => {
      const product = await tx.product.create({
        data: {
          categoryId: data.categoryId,
          supplierId: data.supplierId,
          name: data.name,
          type: data.type,
          serialNumber: data.serialNumber,
          warranty: data.warranty,
          description: data.description,
          costPrice: data.costPrice,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        },
        include: {
          category: true,
          supplier: true,
          stock: true,
        },
      });

      // Create stock
      await tx.stock.create({
        data: {
          productId: product.id,
          quantity,
          createdBy: data.createdBy,
        },
      });

      return tx.product.findUnique({
        where: { id: product.id },
        include: {
          category: true,
          supplier: true,
          stock: true,
        },
      });
    });

    return created;
  }
}
