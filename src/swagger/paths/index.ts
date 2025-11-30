import { authPaths } from './auth.paths';
import { usersPaths } from './users.paths';
import { productPaths } from './products.paths';
import { categoryPaths } from './categories.paths';

export const paths = {
  ...authPaths,
  ...usersPaths,
  ...productPaths,
  ...categoryPaths,
};
