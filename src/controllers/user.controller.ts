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
    const id = parseInt(req.params.id || '0');
    const user = await userService.getUserById(id);
    return ResponseUtil.success(res, 'User retrieved successfully', user);
  } catch (error) {
    return ResponseUtil.notFound(res, error instanceof Error ? error.message : 'User not found');
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
  const user = await userService.createUser(req.body as CreateUserData);
    return ResponseUtil.created(res, 'User created successfully', user);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to create user');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
  const user = await userService.updateUser(id, req.body as UpdateUserData);
    return ResponseUtil.success(res, 'User updated successfully', user);
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to update user');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    await userService.deleteUser(id);
    return ResponseUtil.success(res, 'User deleted successfully');
  } catch (error) {
    return ResponseUtil.error(res, error instanceof Error ? error.message : 'Failed to delete user');
  }
};
