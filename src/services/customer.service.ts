import { CreateCustomerData, UpdateCustomerData, ServiceContext } from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const customerInclude = { transactions: true };

const base = createBaseService(prisma.customer, { idField: 'id', defaultInclude: customerInclude });

export async function getAllCustomers(
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
  return { customers: items, total };
}

export async function getCustomerById(id: string) {
  return await base.getById(id);
}

export async function createCustomer(data: CreateCustomerData, ctx?: ServiceContext) {
  return await base.create(data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function updateCustomer(id: string, data: UpdateCustomerData, ctx?: ServiceContext) {
  return await base.updateById(id, data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function deleteCustomer(id: string) {
  return await base.deleteById(id);
}

export default { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
