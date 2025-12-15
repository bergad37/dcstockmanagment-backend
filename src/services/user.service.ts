import bcrypt from 'bcryptjs';
import prisma from '../utils/database';
import { CreateUserData, PaginationParams, UpdateUserData } from '../common/types';
import { createBaseService } from './base.service';

const base = createBaseService(prisma.user, { idField: 'id' });

export async function getAllUsers(pagination: PaginationParams) {
  const { items, total } = await base.list({ skip: pagination.skip, take: pagination.limit, orderBy: { createdAt: 'desc' } });
  return { users: items, total };
}

export async function getUserById(id: number) {
  return await base.getById(id);
}

export async function createUser(data: CreateUserData, ctx?: { userId?: string }) {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await base.create({ email: data.email, password: hashedPassword, name: data.name, role: data.role } as unknown as Record<string, unknown>, undefined, ctx);
}

export async function updateUser(id: number, data: UpdateUserData, ctx?: { userId?: string }) {
  return await base.updateById(id, data as unknown as Record<string, unknown>, undefined, ctx);
}

export async function deleteUser(id: number) {
  return await base.deleteById(id);
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
