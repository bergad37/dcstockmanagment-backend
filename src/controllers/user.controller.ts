import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseUtil } from '../utils/response';
import { PaginationUtil } from '../utils/pagination';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const pagination = PaginationUtil.getPaginationParams(req);
      const { users, total } = await this.userService.getAllUsers(pagination);
      const meta = PaginationUtil.getPaginationMeta(
        pagination.page,
        pagination.limit,
        total
      );

      return ResponseUtil.success(res, 'Users retrieved successfully', {
        users,
        pagination: meta,
      });
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to get users'
      );
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const user = await this.userService.getUserById(id);
      return ResponseUtil.success(res, 'User retrieved successfully', user);
    } catch (error) {
      return ResponseUtil.notFound(
        res,
        error instanceof Error ? error.message : 'User not found'
      );
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(
        req.body as Parameters<UserService['createUser']>[0]
      );
      return ResponseUtil.created(res, 'User created successfully', user);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to create user'
      );
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      const user = await this.userService.updateUser(
        id,
        req.body as Parameters<UserService['updateUser']>[1]
      );
      return ResponseUtil.success(res, 'User updated successfully', user);
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to update user'
      );
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || '0');
      await this.userService.deleteUser(id);
      return ResponseUtil.success(res, 'User deleted successfully');
    } catch (error) {
      return ResponseUtil.error(
        res,
        error instanceof Error ? error.message : 'Failed to delete user'
      );
    }
  };
}
