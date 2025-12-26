import prisma from '../utils/database';
import { Decimal } from '@prisma/client/runtime/library';

function toNumber(val: Decimal | null | undefined) {
  if (val === null || val === undefined) return 0;
  return Number(String(val));
}

export async function getStatistics() {
  // Totals: outbound (SOLD, RENT) and inbound (RETURNED)
  const outboundAgg = await prisma.transactionItem.aggregate({
    _sum: { quantity: true },
    where: { transaction: { type: { in: ['SOLD', 'RENT'] } } },
  });

  const inboundAgg = await prisma.transactionItem.aggregate({
    _sum: { quantity: true },
    where: { transaction: { type: 'RETURNED' } },
  });

  const totalOutbound = outboundAgg._sum.quantity ?? 0;
  const totalInbound = inboundAgg._sum.quantity ?? 0;

  // Total revenue (SOLD and RENT transactions)
  const revenueAgg = await prisma.transaction.aggregate({
    _sum: { totalAmount: true },
    where: { type: { in: ['SOLD', 'RENT'] } },
  });

  const totalRevenue = toNumber(revenueAgg._sum.totalAmount);

  // Stock flow for last 6 months (array of months with inbound/outbound/net)
  const months: Array<{ label: string; inbound: number; outbound: number; net: number }> = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStart = new Date(dt.getFullYear(), dt.getMonth(), 1);
    const monthEnd = new Date(dt.getFullYear(), dt.getMonth() + 1, 1);

    const outboundMonth = await prisma.transactionItem.aggregate({
      _sum: { quantity: true },
      where: { transaction: { createdAt: { gte: monthStart, lt: monthEnd }, type: { in: ['SOLD', 'RENT'] } } },
    });

    const inboundMonth = await prisma.transactionItem.aggregate({
      _sum: { quantity: true },
      where: { transaction: { createdAt: { gte: monthStart, lt: monthEnd }, type: 'RETURNED' } },
    });

    const outQty = outboundMonth._sum.quantity ?? 0;
    const inQty = inboundMonth._sum.quantity ?? 0;

    months.push({ label: dt.toLocaleString('default', { month: 'short' }), inbound: inQty, outbound: outQty, net: inQty - outQty });
  }

  // Top 5 high moving items (by units sold/rented)
  const topItemsGroup = await prisma.transactionItem.groupBy({
    by: ['productId'],
    where: { transaction: { type: { in: ['SOLD', 'RENT'] } } },
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });

  const topProductIds = topItemsGroup.map(g => g.productId);
  const topProducts = await prisma.product.findMany({ where: { id: { in: topProductIds } }, include: { category: true, supplier: true, stock: true } });

  const topItems = topItemsGroup.map(g => {
    const prod = topProducts.find(p => p.id === g.productId);
    return {
      productId: g.productId,
      name: prod?.name ?? 'Unknown',
      units: g._sum.quantity ?? 0,
      category: prod?.category ?? null,
      stock: prod?.stock ?? null,
    };
  });

  // Low moving items (bottom 5)
  const lowItemsGroup = await prisma.transactionItem.groupBy({
    by: ['productId'],
    where: { transaction: { type: { in: ['SOLD', 'RENT'] } } },
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'asc' } },
    take: 5,
  });

  const lowProductIds = lowItemsGroup.map(g => g.productId);
  const lowProducts = await prisma.product.findMany({ where: { id: { in: lowProductIds } }, include: { category: true, supplier: true, stock: true } });

  const lowItems = lowItemsGroup.map(g => {
    const prod = lowProducts.find(p => p.id === g.productId);
    return {
      productId: g.productId,
      name: prod?.name ?? 'Unknown',
      units: g._sum.quantity ?? 0,
      category: prod?.category ?? null,
      stock: prod?.stock ?? null,
    };
  });

  // Category performance: units rented vs sold per category
  const soldItems = await prisma.transactionItem.findMany({ where: { transaction: { type: 'SOLD' } }, include: { product: { include: { category: true } } } });
  const rentedItems = await prisma.transactionItem.findMany({ where: { transaction: { type: 'RENT' } }, include: { product: { include: { category: true } } } });

  const categoryMap: Record<string, { categoryId: string; name: string | null; sold: number; rented: number }> = {};

  for (const it of soldItems) {
    const cat = it.product?.category;
    const key = cat?.id ?? 'uncategorized';
    if (!categoryMap[key]) categoryMap[key] = { categoryId: key, name: cat?.name ?? null, sold: 0, rented: 0 };
    categoryMap[key].sold += it.quantity ?? 0;
  }

  for (const it of rentedItems) {
    const cat = it.product?.category;
    const key = cat?.id ?? 'uncategorized';
    if (!categoryMap[key]) categoryMap[key] = { categoryId: key, name: cat?.name ?? null, sold: 0, rented: 0 };
    categoryMap[key].rented += it.quantity ?? 0;
  }

  const categoryPerformance = Object.values(categoryMap);
  const revenueItems = await prisma.transactionItem.findMany({ where: { transaction: { type: { in: ['SOLD', 'RENT'] } } }, include: { product: { include: { category: true } } } });

  const revenueByCategoryMap: Record<string, { categoryId: string; name: string | null; revenue: number }> = {};

  for (const it of revenueItems) {
    const cat = it.product?.category;
    const key = cat?.id ?? 'uncategorized';
    if (!revenueByCategoryMap[key]) revenueByCategoryMap[key] = { categoryId: key, name: cat?.name ?? null, revenue: 0 };
    const unitPrice = it.unitPrice ? Number(String(it.unitPrice)) : 0;
    revenueByCategoryMap[key].revenue += unitPrice * (it.quantity ?? 0);
  }

  const revenueByCategory = Object.values(revenueByCategoryMap);

  return {
    totals: {
      totalInbound,
      totalOutbound,
      netFlow: totalInbound - totalOutbound,
      totalRevenue,
    },
    stockFlow: months,
    categoryPerformance,
    topItems,
    lowItems,
    revenueByCategory,
  };
}

export default { getStatistics };
