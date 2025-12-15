import { CreateCategoryData, UpdateCategoryData, ServiceContext } from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const categoryInclude = { products: true };

const base = createBaseService(prisma.productCategory, { idField: 'id', defaultInclude: categoryInclude });

export async function getAllCategories() {
  const { items } = await base.list({ orderBy: { createdAt: 'desc' } });
  return items;
}

export async function getCategoryById(id: number) {
  return await base.getById(id);
}

export async function createCategory(data: CreateCategoryData, ctx?: ServiceContext) {
  return await base.create({ name: data.name }, undefined, ctx);
}

export async function updateCategory(id: number, data: UpdateCategoryData, ctx?: ServiceContext) {
  return await base.updateById(id, data, undefined, ctx);
}

export async function deleteCategory(id: number) {
  return await base.deleteById(id);
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
