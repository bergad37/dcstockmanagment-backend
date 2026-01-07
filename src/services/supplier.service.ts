import { CreateSupplierData, UpdateSupplierData, ServiceContext } from '../common/types';
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

export async function getSupplierById(id: string) {
  return await base.getById(id);
}

export async function getSupplierByName(name: string) {
  return await prisma.supplier.findUnique({
    where: { name: name.trim() },
    include: supplierInclude,
  });
}

export async function createSupplier(data: CreateSupplierData, ctx?: ServiceContext) {
  return await base.create(data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function updateSupplier(id: string, data: UpdateSupplierData, ctx?: ServiceContext) {
  return await base.updateById(id, data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function deleteSupplier(id: string) {
  return await base.deleteById(id);
}

export default { getAllSuppliers, getSupplierById, getSupplierByName, createSupplier, updateSupplier, deleteSupplier };
