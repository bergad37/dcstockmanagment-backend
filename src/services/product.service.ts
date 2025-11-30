import prisma from '../utils/database';

interface CreateProductData {
  categoryId: number;
  supplierId?: number;
  name: string;
  type?: string;
  costPrice: number;
  sellingPrice: number;
}

interface UpdateProductData {
  categoryId?: number;
  supplierId?: number;
  name?: string;
  type?: string;
  costPrice?: number;
  sellingPrice?: number;
}

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

  async getProductById(id: number) {
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
        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
      },
      include: {
        category: true,
        supplier: true,
      },
    });

    return product;
  }

  async updateProduct(id: number, data: UpdateProductData) {
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

  async deleteProduct(id: number) {
    await prisma.product.delete({ where: { id } });
  }
}
