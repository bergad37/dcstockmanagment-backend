import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { CreateUserData, UpdateUserData } from '../common/types';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pagination = PaginationUtil.getPaginationParams(req);
    const { users, total } = await userService.getAllUsers(pagination);
    const meta = PaginationUtil.getPaginationMeta(pagination.page, pagination.limit, total);

    return ResponseUtil.success(res, 'Users retrieved successfully', { users, pagination: meta });
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to get users');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id!);
    return ResponseUtil.success(res, 'User retrieved successfully', user);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'User not found');
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const user = authReq.user;

  const userData = {...req.body,password:'password123'}; // Temporary password assignment

  const newUser = await userService.createUser(userData as CreateUserData, { userId: user?.id, user } as any);
    return ResponseUtil.created(res, 'User created successfully', newUser);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create user');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
  const authReq = req as any;
  const user = authReq.user;
  const updated = await userService.updateUser(req.params.id!, req.body as UpdateUserData, { userId: user?.id, user } as any);
    return ResponseUtil.success(res, 'User updated successfully', updated);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update user');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id!);
    return ResponseUtil.success(res, 'User deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete user');
  }
};
