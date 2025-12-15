import bcrypt from 'bcryptjs';
import prisma from '../utils/database';
import { JwtUtil } from '../utils/jwt';
import { LoginData, RegisterData, UserRole } from '../common/types';

export async function register(data: RegisterData) {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role || UserRole.STAFF,
    },
  });
}

export async function login(data: LoginData) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account is deactivated');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = JwtUtil.generateToken({ id: user.id as string, email: user.email, role: user.role as UserRole });

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export default { register, login, getProfile };
