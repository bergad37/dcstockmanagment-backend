import prisma from '../utils/database';

interface CreateSupplierData {
  name: string;
  phone?: string;
  email?: string;
}

interface UpdateSupplierData {
  name?: string;
  phone?: string;
  email?: string;
}

export class SupplierService {
  async getAllSuppliers(skip: number, take: number) {
    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        skip,
        take,
        include: {
          products: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.supplier.count(),
    ]);

    return { suppliers, total };
  }

  async getSupplierById(id: number) {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      throw new Error('Supplier not found');
    }

    return supplier;
  }

  async createSupplier(data: CreateSupplierData) {
    const supplier = await prisma.supplier.create({
      data,
      include: {
        products: true,
      },
    });

    return supplier;
  }

  async updateSupplier(id: number, data: UpdateSupplierData) {
    const supplier = await prisma.supplier.update({
      where: { id },
      data,
      include: {
        products: true,
      },
    });

    return supplier;
  }

  async deleteSupplier(id: number) {
    await prisma.supplier.delete({ where: { id } });
  }
}
