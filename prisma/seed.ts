import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stockmanagement.com' },
    update: {},
    create: {
      email: 'admin@stockmanagement.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create manager user
  const manager = await prisma.user.upsert({
    where: { email: 'manager@stockmanagement.com' },
    update: {},
    create: {
      email: 'manager@stockmanagement.com',
      password: await bcrypt.hash('manager123', 10),
      name: 'Manager User',
      role: 'MANAGER',
    },
  });

  console.log('✅ Created manager user:', manager.email);

  // Create staff user
  const staff = await prisma.user.upsert({
    where: { email: 'staff@stockmanagement.com' },
    update: {},
    create: {
      email: 'staff@stockmanagement.com',
      password: await bcrypt.hash('staff123', 10),
      name: 'Staff User',
      role: 'STAFF',
    },
  });

  console.log('✅ Created staff user:', staff.email);

  // Create product categories
  console.log('✅ Created product categories');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });