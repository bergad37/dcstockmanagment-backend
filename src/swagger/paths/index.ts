import { authPaths } from './auth.paths';
import { usersPaths } from './users.paths';
import { productPaths } from './products.paths';
import { categoryPaths } from './categories.paths';
import { transactionPaths } from './transactions.paths';

export const paths = {
  ...authPaths,
  ...usersPaths,
  ...productPaths,
  ...transactionPaths,
  ...categoryPaths,
};
