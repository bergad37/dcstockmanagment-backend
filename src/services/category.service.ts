import { CreateCategoryData, UpdateCategoryData, ServiceContext } from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const categoryInclude = { products: true };

const base = createBaseService(prisma.productCategory, { idField: 'id', defaultInclude: categoryInclude });

export async function getAllCategories(
  skip?: number,
  take?: number,
  conditions?: { searchKey?: string }
) {
  const where: any = {};
  const searchKey = conditions?.searchKey;
  if (searchKey) {
    where.name = { contains: String(searchKey), mode: 'insensitive' };
  }
  if (typeof skip === 'number' && typeof take === 'number') {
    const { items, total } = await base.list({ skip, take, where: Object.keys(where).length ? where : undefined, orderBy: { createdAt: 'desc' } });
    return { categories: items, total } as unknown as { categories: unknown[]; total: number };
  }
  const { items } = await base.list({ where: Object.keys(where).length ? where : undefined, orderBy: { createdAt: 'desc' } });
  return items;
}

export async function getCategoryById(id: string) {
  return await base.getById(id);
}

export async function createCategory(data: CreateCategoryData, ctx?: ServiceContext) {
  return await base.create({ name: data.name }, undefined, ctx);
}

export async function updateCategory(id: string, data: UpdateCategoryData, ctx?: ServiceContext) {
  return await base.updateById(id, data, undefined, ctx);
}

export async function deleteCategory(id: string) {
  return await base.deleteById(id);
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
