import {
  CreateProductData,
  UpdateProductData,
  ServiceContext,
} from '../common/types';
import prisma from '../utils/database';
import { createBaseService } from './base.service';

const productInclude = {
  category: true,
  supplier: true,
  stock: true,
};

const base = createBaseService(prisma.product, {
  idField: 'id',
  defaultInclude: productInclude,
});

export async function getAllProducts(
  skip: number,
  take: number,
  conditions?: {
    categoryId?: string | number;
    startDate?: string;
    endDate?: string;
    searchKey?: string;
  }
) {
  const { categoryId, startDate, endDate, searchKey } = conditions || {};

  const where: any = {};

  if (
    categoryId !== undefined &&
    categoryId !== null &&
    String(categoryId) !== ''
  ) {
    const maybeNum = Number(String(categoryId));
    where.categoryId = Number.isNaN(maybeNum) ? String(categoryId) : maybeNum;
  }

  if (startDate && endDate) {
    where.createdAt = {
      gte: new Date(String(startDate)),
      lte: new Date(String(endDate)),
    };
  }

  if (searchKey) {
    where.name = { contains: String(searchKey), mode: 'insensitive' };
  }

  const { items, total } = await base.list({
    skip,
    take,
    where: Object.keys(where).length ? where : undefined,
    orderBy: { createdAt: 'desc' },
  });
  return { products: items, total };
}

export async function getProductById(id: string) {
  return await base.getById(id);
}

export async function createProduct(
  data: CreateProductData,
  ctx?: ServiceContext
) {
  return await base.create(
    data as unknown as Record<string, unknown>,
    undefined,
    ctx
  );
}

export async function updateProduct(
  id: string,
  data: UpdateProductData,
  ctx?: ServiceContext
) {
  return await base.updateById(
    id,
    data as unknown as Record<string, unknown>,
    undefined,
    ctx
  );
}

export async function deleteProduct(id: string) {
  return await base.deleteById(id);
}

export async function createProductWithStock(
  data: CreateProductData,
  ctx?: ServiceContext
) {
  const quantity = data.quantity ?? 1;

  const created = await prisma.$transaction(async (tx) => {
    const createdBy = data.createdBy ?? ctx?.user?.id;
    const updatedBy = data.updatedBy ?? ctx?.user?.id;

    // Build product create payload and only include optional supplierId when provided
    const productCreateData: any = {
      categoryId: data.categoryId,
      name: data.name,
      type: data.type,
      serialNumber: data.serialNumber,
      warranty: data.warranty,
      description: data.description,
      costPrice: data.costPrice,
      createdBy,
      updatedBy,
    };

    if (data.supplierId) {
      productCreateData.supplierId = data.supplierId;
    }

    const product = await tx.product.create({
      data: productCreateData,
      include: productInclude,
    });

    await tx.stock.create({
      data: {
        productId: product.id,
        quantity,
        createdBy: createdBy,
      },
    });

    return tx.product.findUnique({
      where: { id: product.id },
      include: productInclude,
    });
  });

  return created;
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductWithStock,
};
