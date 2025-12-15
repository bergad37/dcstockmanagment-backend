import prisma from '../utils/database';
import type { PrismaClient } from '@prisma/client';
import type { ServiceContext } from '../common/types';

type DelegateShape = {
  findMany(args?: unknown): Promise<unknown[]>;
  count(args?: unknown): Promise<number>;
  findUnique(args?: unknown): Promise<unknown | null>;
  create(args?: unknown): Promise<unknown>;
  update(args?: unknown): Promise<unknown>;
  delete(args?: unknown): Promise<unknown>;
};

/**
 * Functional factory for a BaseService-like API.
 * Returns an object with CRUD helpers bound to the provided delegate.
 */
// Use shared ServiceContext imported from common types

export function createBaseService<
  D extends DelegateShape,
  Model = unknown,
  Create = unknown,
  Update = unknown,
  Where = unknown,
  Include = unknown
>(delegate: D, opts?: { idField?: string; defaultInclude?: Include }) {
  const idField = opts?.idField ?? 'id';
  const defaultInclude = opts?.defaultInclude as Include | undefined;

  async function listAndCount(opts: { skip?: number; take?: number; where?: Where; include?: Include; orderBy?: unknown } = {}) {
    const { skip, take, where, include, orderBy } = opts;
    const finalInclude = (include ?? defaultInclude) as unknown;

    const [items, total] = await Promise.all([
      (delegate as unknown as { findMany(args?: unknown): Promise<Model[]> }).findMany({ skip, take, where, include: finalInclude, orderBy } as unknown),
      (delegate as unknown as { count(args?: unknown): Promise<number> }).count({ where } as unknown),
    ]);

    return { items, total } as { items: Model[]; total: number };
  }

  async function getById(id: unknown, include?: Include): Promise<Model> {
    const where = { [idField]: id } as unknown;
    const item = await (delegate as unknown as { findUnique(args?: unknown): Promise<Model | null> }).findUnique({ where, include: include ?? defaultInclude } as unknown);
    if (!item) throw new Error('Not found');
    return item as Model;
  }

  async function create(data: Create, include?: Include, ctx?: ServiceContext): Promise<Model> {
    // try to inject createdBy from context when available and not already present on data
    const baseData = (data as unknown) as Record<string, unknown>;
    const finalData = { ...baseData } as Record<string, unknown>;
    if (ctx?.user?.id && finalData['createdBy'] == null) finalData['createdBy'] = ctx.user.id;

    return await (delegate as unknown as { create(args?: unknown): Promise<Model> }).create({ data: finalData, include: include ?? defaultInclude } as unknown);
  }

  async function updateById(id: unknown, data: Update, include?: Include, ctx?: ServiceContext): Promise<Model> {
    const where = { [idField]: id } as unknown;
    const baseData = (data as unknown) as Record<string, unknown>;
    const finalData = { ...baseData } as Record<string, unknown>;
    if (ctx?.user?.id && finalData['updatedBy'] == null) finalData['updatedBy'] = ctx.user.id;

    return await (delegate as unknown as { update(args?: unknown): Promise<Model> }).update({ where, data: finalData, include: include ?? defaultInclude } as unknown);
  }

  async function deleteById(id: unknown): Promise<Model> {
    const where = { [idField]: id } as unknown;
    return await (delegate as unknown as { delete(args?: unknown): Promise<Model> }).delete({ where } as unknown);
  }

  function getPrisma(): PrismaClient {
    return prisma;
  }

  return {
    listAndCount,
    list: listAndCount,
    getById,
    create,
    updateById,
    deleteById,
    getPrisma,
    delegate,
  } as const;
}
