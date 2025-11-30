import bcrypt from 'bcryptjs';
import prisma from '../utils/database';
import { UserRole } from '../common/types';
import { PaginationParams } from '../common/types';

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

interface UpdateUserData {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export class UserService {
  async getAllUsers(pagination: PaginationParams) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });

    return user;
  }

  async updateUser(id: number, data: UpdateUserData) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async deleteUser(id: number) {
    await prisma.user.delete({ where: { id } });
  }
}
