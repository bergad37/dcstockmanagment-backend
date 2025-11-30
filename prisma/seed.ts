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
  const laptopCategory = await prisma.productCategory.upsert({
    where: { name: 'Laptops' },
    update: {},
    create: { name: 'Laptops' },
  });

  const riceCategory = await prisma.productCategory.upsert({
    where: { name: 'Rice' },
    update: {},
    create: { name: 'Rice' },
  });

  console.log('✅ Created product categories');

  // Create suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Tech Supplies Ltd',
      phone: '+250788123456',
      email: 'contact@techsupplies.com',
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Rice Importers Co',
      phone: '+250788654321',
      email: 'info@riceimporters.com',
    },
  });

  console.log('✅ Created suppliers');

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Doe',
      phone: '+250788111222',
      email: 'john@example.com',
      address: 'Kigali, Rwanda',
    },
  });

  console.log('✅ Created customers');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });