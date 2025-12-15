import { authPaths } from './auth.paths';
import { usersPaths } from './users.paths';
import { productPaths } from './products.paths';
import { categoryPaths } from './categories.paths';
import { transactionPaths } from './transactions.paths';
import { stockPaths } from './stock.paths';
import { customersPaths } from './customers.paths';
import { suppliersPaths } from './suppliers.paths';

export const paths = {
  ...authPaths,
  ...usersPaths,
  ...productPaths,
  ...transactionPaths,
  ...categoryPaths,
  ...stockPaths,
  ...customersPaths,
  ...suppliersPaths,
};
