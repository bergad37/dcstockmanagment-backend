import { CreateCategoryData, UpdateCategoryData } from '../common/types';
import prisma from '../utils/database';

export class CategoryService {
  async getAllCategories() {
    const categories = await prisma.productCategory.findMany({
      include: {
        products: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return categories;
  }

  async getCategoryById(id: number) {
    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async createCategory(data: CreateCategoryData) {
    const category = await prisma.productCategory.create({
      data: {
        name: data.name,
      },
      include: {
        products: true,
      },
    });

    return category;
  }

  async updateCategory(id: number, data: UpdateCategoryData) {
    const category = await prisma.productCategory.update({
      where: { id },
      data,
      include: {
        products: true,
      },
    });

    return category;
  }

  async deleteCategory(id: number) {
    await prisma.productCategory.delete({ where: { id } });
  }
}
