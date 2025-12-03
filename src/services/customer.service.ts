import { CreateCustomerData, UpdateCustomerData } from '../common/types';
import prisma from '../utils/database';
export class CustomerService {
  async getAllCustomers(skip: number, take: number) {
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        skip,
        take,
        include: {
          transactions: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count(),
    ]);

    return { customers, total };
  }

  async getCustomerById(id: number) {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }

  async createCustomer(data: CreateCustomerData) {
    const customer = await prisma.customer.create({
      data,
      include: {
        transactions: true,
      },
    });

    return customer;
  }

  async updateCustomer(id: number, data: UpdateCustomerData) {
    const customer = await prisma.customer.update({
      where: { id },
      data,
      include: {
        transactions: true,
      },
    });

    return customer;
  }

  async deleteCustomer(id: number) {
    await prisma.customer.delete({ where: { id } });
  }
}
