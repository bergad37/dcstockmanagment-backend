import { CreateSupplierData, UpdateSupplierData } from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const supplierInclude = { products: true };

const base = createBaseService(prisma.supplier, { idField: 'id', defaultInclude: supplierInclude });

export async function getAllSuppliers(
  skip: number,
  take: number,
  conditions?: { searchKey?: string }
) {
  const where: any = {};
  const searchKey = conditions?.searchKey;
  if (searchKey) {
    where.name = { contains: String(searchKey), mode: 'insensitive' };
  }

  const { items, total } = await base.list({ skip, take, where: Object.keys(where).length ? where : undefined, orderBy: { createdAt: 'desc' } });
  return { suppliers: items, total };
}

export async function getSupplierById(id: number) {
  return await base.getById(id);
}

export async function createSupplier(data: CreateSupplierData, ctx?: { userId?: string }) {
  return await base.create(data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function updateSupplier(id: number, data: UpdateSupplierData, ctx?: { userId?: string }) {
  return await base.updateById(id, data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function deleteSupplier(id: number) {
  return await base.deleteById(id);
}

export default { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };
