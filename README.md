# DC Stock Management Backend

A robust and scalable **Stock Management System** backend API built with **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**. This API provides comprehensive inventory management capabilities including product management, stock tracking, user authentication, and transaction handling.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Available Scripts](#available-scripts)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

### Core Functionality

- 🔐 **Authentication & Authorization** - JWT-based user authentication with role-based access control
- 📦 **Product Management** - Create, read, update, and delete products with categorization
- 📊 **Stock Management** - Real-time inventory tracking and stock level monitoring
- 🏭 **Supplier Management** - Manage suppliers and their products
- 👥 **Customer Management** - Maintain customer information and transaction history
- 💳 **Transaction Management** - Track BUY, BORROW, and RETURN transactions
- 👤 **User Management** - Multi-role user system (ADMIN, MANAGER, STAFF)
- 📈 **Pagination Support** - Efficient data retrieval with pagination controls
- 🎯 **Input Validation** - Comprehensive request validation using express-validator
- 📚 **Swagger Documentation** - Interactive API documentation

### Technical Features

- ✅ Type-safe with **TypeScript**
- 🗄️ ORM with **Prisma** for database interactions
- 🔒 Password hashing with **bcryptjs**
- 🚀 Fast development with **nodemon** and **tsx**
- 🎨 Code formatting with **Prettier**
- 🔍 Linting with **ESLint**
- 🧪 Database seeding support

---

## 🛠️ Tech Stack

| Category             | Technology         |
| -------------------- | ------------------ |
| **Language**         | TypeScript 5.x     |
| **Runtime**          | Node.js 20.19.0+   |
| **Framework**        | Express 4.x        |
| **ORM**              | Prisma 5.x         |
| **Database**         | PostgreSQL 13+     |
| **Package Manager**  | pnpm 8.x           |
| **Authentication**   | JWT (jsonwebtoken) |
| **Password Hashing** | bcryptjs           |
| **Validation**       | express-validator  |
| **Documentation**    | Swagger/OpenAPI    |

---

## 📦 Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: v20.19.0 or higher
  - Check version: `node -v`
  - Install via [nvm](https://github.com/nvm-sh/nvm): `nvm install 20.19.0`

- **pnpm**: v8.0.0 or higher
  - Install globally: `npm install -g pnpm`
  - Check version: `pnpm -v`

- **PostgreSQL**: v13 or higher
  - Install via [official website](https://www.postgresql.org/download/)
  - Ensure the service is running

- **Git**: For version control
  - Install via [official website](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bergad37/dcstockmanagment-backend.git
cd dcstockmanagment-backend
```

### 2. Setup Node Version (Using nvm)

```bash
nvm install 20.19.0
nvm use 20.19.0
```

### 3. Install Dependencies

```bash
pnpm install
```

Or using the Makefile command:

```bash
make install
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Configure the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/stock_management_db"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=24h

# API Documentation
SWAGGER_ENABLED=true
SWAGGER_PATH=/api/docs

# Logging
LOG_LEVEL=debug
```

### 2. Database Setup

Create your PostgreSQL database:

```bash
createdb stock_management_db
```

Run Prisma migrations:

```bash
pnpm prisma:migrate
```

Or using the Makefile:

```bash
make db-setup
```

### 3. Seed the Database (Optional)

To populate the database with sample data:

```bash
pnpm prisma:seed
```

Or:

```bash
make prisma-seed
```

---

## ▶️ Running the Application

### Development Mode

Start the development server with automatic hot-reload:

```bash
pnpm run dev
```

Or using the Makefile:

```bash
make dev
```

The server will start on `http://localhost:3000`

### Production Mode

1. Build the TypeScript code:

```bash
pnpm run build
```

2. Start the production server:

```bash
pnpm run start
```

Or using the Makefile:

```bash
make build
make start
```

---

## 📁 Project Structure

```
dcstockmanagment-backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── common/
│   │   └── types.ts           # Common TypeScript types
│   ├── config/
│   │   └── swagger.ts         # Swagger/OpenAPI configuration
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── category.controller.ts
│   │   ├── customer.controller.ts
│   │   ├── product.controller.ts
│   │   ├── stock.controller.ts
│   │   ├── supplier.controller.ts
│   │   ├── transaction.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/           # Custom middleware functions
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/                # Route definitions
│   │   ├── auth.routes.ts
│   │   ├── category.routes.ts
│   │   ├── customer.routes.ts
│   │   ├── product.routes.ts
│   │   ├── stock.routes.ts
│   │   ├── supplier.routes.ts
│   │   ├── transaction.routes.ts
│   │   ├── user.routes.ts
│   │   └── index.ts
│   ├── services/              # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── category.service.ts
│   │   ├── customer.service.ts
│   │   ├── product.service.ts
│   │   ├── stock.service.ts
│   │   ├── supplier.service.ts
│   │   ├── transaction.service.ts
│   │   └── user.service.ts
│   ├── swagger/               # Swagger documentation
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── index.ts
│   │   │   ├── responses.ts
│   │   │   ├── schemas.ts
│   │   │   └── securitySchemes.ts
│   │   └── paths/
│   │       ├── index.ts
│   │       ├── auth.paths.ts
│   │       ├── categories.paths.ts
│   │       ├── products.paths.ts
│   │       └── users.paths.ts
│   ├── utils/                 # Utility functions
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   ├── pagination.ts
│   │   └── response.ts
│   └── validations/           # Input validation schemas
│       ├── auth.validation.ts
│       ├── category.validation.ts
│       ├── customer.validation.ts
│       ├── product.validation.ts
│       ├── stock.validation.ts
│       ├── supplier.validation.ts
│       ├── transaction.validation.ts
│       └── user.validation.ts
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── seed.ts                # Database seeding script
├── dist/                      # Compiled JavaScript (generated)
├── .env                       # Environment variables (create this)
├── .env.example               # Example environment file
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── tsconfig.json              # TypeScript configuration
├── nodemon.json               # Nodemon configuration
├── package.json               # Project metadata and scripts
├── pnpm-lock.yaml             # Dependency lock file
├── pnpm-workspace.yaml        # Workspace configuration
├── Makefile                   # Make commands for common tasks
└── README.md                  # This file
```

### Folder Responsibilities

| Folder             | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `src/controllers/` | Handle HTTP requests and responses           |
| `src/services/`    | Contain business logic and data processing   |
| `src/routes/`      | Define API endpoints and route handlers      |
| `src/middlewares/` | Process requests before reaching controllers |
| `src/validations/` | Define input validation rules                |
| `src/utils/`       | Reusable utility functions                   |
| `src/config/`      | Configuration files (Swagger, etc.)          |
| `prisma/`          | Database schema and migrations               |

---

## 📚 API Documentation

### Swagger Documentation

Once the server is running, access the interactive API documentation at:

```
http://localhost:3000/api/docs
```

### Main API Endpoints

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

#### Products

- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Categories

- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

#### Stock

- `GET /api/stock` - Get all stock records
- `GET /api/stock/:id` - Get stock details
- `PUT /api/stock/:id` - Update stock levels

#### Users

- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Customers

- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

#### Suppliers

- `GET /api/suppliers` - List all suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

#### Transactions

- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction details

---

## 🗄️ Database Schema

### Key Models

#### User

- Stores user account information
- Roles: ADMIN, MANAGER, STAFF
- Status: Active/Inactive

#### ProductCategory

- Categorizes products
- Links products to categories

#### Product

- Core product information
- References: Category, Supplier
- Pricing: Cost Price, Selling Price

#### Stock

- Tracks inventory levels
- References: Product
- Manages quantity on hand and reserved quantities

#### Transaction

- Records buy, borrow, return operations
- References: Customer, Products
- Tracks transaction details and amounts

#### Customer & Supplier

- Maintain contact information
- Links to transactions and products respectively

---

## 🔧 Available Scripts

### Development Commands

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `pnpm run dev`          | Start development server with hot-reload |
| `pnpm run build`        | Compile TypeScript to JavaScript         |
| `pnpm run start`        | Start production server                  |
| `pnpm run lint`         | Run ESLint checks                        |
| `pnpm run lint:fix`     | Fix ESLint issues automatically          |
| `pnpm run format`       | Format code with Prettier                |
| `pnpm run format:check` | Check code formatting                    |
| `pnpm run type-check`   | Check TypeScript types without emitting  |

### Database Commands

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm prisma:generate` | Generate Prisma Client          |
| `pnpm prisma:migrate`  | Create and apply migrations     |
| `pnpm prisma:push`     | Push schema changes to database |
| `pnpm prisma:studio`   | Open Prisma Studio GUI          |
| `pnpm prisma:seed`     | Seed database with sample data  |

### Makefile Commands

| Command         | Description                 |
| --------------- | --------------------------- |
| `make install`  | Install dependencies        |
| `make dev`      | Start development server    |
| `make build`    | Build project               |
| `make start`    | Start production server     |
| `make clean`    | Clean build artifacts       |
| `make lint`     | Run linter                  |
| `make lint-fix` | Fix linting issues          |
| `make format`   | Format code                 |
| `make db-setup` | Setup database              |
| `make db-reset` | Reset database              |
| `make help`     | Show all available commands |

---

## 📖 Development Guidelines

### Code Style

#### TypeScript Best Practices

- Use strict typing - avoid `any` types
- Define interfaces for complex objects
- Use enums for fixed values
- Use utility types appropriately

#### File Naming Conventions

```
Controllers:   *.controller.ts
Services:      *.service.ts
Routes:        *.routes.ts
Middlewares:   *.middleware.ts
Validations:   *.validation.ts
Utilities:     *.ts (or utility-specific name)
```

#### Directory Structure Rules

- Keep related files together
- One main export per file
- Use barrel exports (index.ts) for cleaner imports
- Avoid deep nesting (max 4 levels)

### Coding Standards

#### Variable Naming

```typescript
// ✅ Good
const userRepository = getUserById();
const isActive = true;
const MAX_RETRIES = 3;

// ❌ Avoid
const user_repo = getUserById();
const active = true;
const maxRetries = 3; // for constants
```

#### Function Naming

```typescript
// ✅ Good
async function fetchUserById(id: number): Promise<User> {}
function calculateTotalPrice(items: Item[]): number {}
function isValidEmail(email: string): boolean {}

// ❌ Avoid
async function getUser(id: number) {} // ambiguous
function calc(items) {} // unclear
function valid(email) {} // unclear
```

#### Error Handling

```typescript
// ✅ Good
try {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
} catch (error) {
  logger.error('Error fetching user:', error);
  throw error;
}

// ❌ Avoid
try {
  return await getUserById(id);
} catch (error) {
  console.log(error); // Use logger
}
```

### Middleware Usage

- Authentication should be applied early in the middleware chain
- Error handling should be the last middleware
- Validation middleware should run before controllers

### Service Layer

- All business logic should reside in services
- Controllers should be thin and delegate to services
- Services should handle data transformation and validation

### Database Queries

- Use Prisma's type safety
- Avoid N+1 queries with proper include/select statements
- Use transactions for related operations
- Implement pagination for list endpoints

### Comments and Documentation

```typescript
/**
 * Fetches a user by ID from the database
 * @param id - The user's unique identifier
 * @returns Promise<User> The user object
 * @throws Error if user not found
 */
async function getUserById(id: number): Promise<User> {
  // Implementation
}
```

### Git Commit Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>

Types:
  feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only
  style:    Changes that don't affect code meaning
  refactor: Code change that neither fixes nor adds feature
  perf:     Performance improvement
  test:     Add or modify tests
  chore:    Changes to build process or dependencies

Example:
  feat(auth): add JWT token refresh endpoint

  Added ability to refresh expired JWT tokens without re-authenticating

  Closes #123
```

---

## 🤝 Contributing

### Getting Started

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Run tests and linting: `make lint` and `make format:check`
4. Commit with descriptive messages
5. Push to your branch
6. Create a Pull Request

### Before Submitting PR

- ✅ Code follows style guidelines
- ✅ All tests pass
- ✅ Code is properly formatted
- ✅ No ESLint errors
- ✅ TypeScript types are correct
- ✅ Database migrations are included (if needed)

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue

Closes #(issue number)

## Changes Made

- List of changes

## Testing

Describe how changes were tested

## Screenshots (if applicable)

Include screenshots for UI changes
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:

- Ensure PostgreSQL is installed and running
- Check `DATABASE_URL` in `.env` file
- Verify PostgreSQL service: `brew services list` (macOS)

#### 2. pnpm Not Found

**Problem**: `command not found: pnpm`

**Solution**:

```bash
npm install -g pnpm@8.15.0
```

#### 3. Wrong Node Version

**Problem**: `The engine "node" is incompatible`

**Solution**:

```bash
nvm install 20.19.0
nvm use 20.19.0
```

#### 4. Prisma Client Not Generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:

```bash
pnpm prisma:generate
```

#### 5. Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Kill process on port 3000
lsof -ti :3000 | xargs kill -9

# Or change PORT in .env file
```

#### 6. Migration Issues

**Problem**: Migration fails or schema is out of sync

**Solution**:

```bash
# Reset database (development only!)
make db-reset

# Or manually:
pnpm prisma:migrate -- --force-reset
```

---

## 📋 Performance Considerations

- Use pagination for list endpoints
- Implement caching for frequently accessed data
- Optimize database queries with proper indexing
- Use connection pooling for database connections
- Monitor API response times
- Implement rate limiting for sensitive endpoints

---

## 🔒 Security Best Practices

- Never commit `.env` file
- Validate and sanitize all inputs
- Use parameterized queries (Prisma handles this)
- Implement proper authentication and authorization
- Hash passwords with bcryptjs (already implemented)
- Use HTTPS in production
- Implement rate limiting
- Add CORS configuration appropriately
- Regularly update dependencies

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📧 Support

For issues, questions, or suggestions:

- Create an issue on GitHub
- Contact the development team
- Check existing documentation

---

## 🎯 Roadmap

- [ ] Add unit tests
- [ ] Implement integration tests
- [ ] Add API rate limiting
- [ ] Implement caching layer
- [ ] Add transaction batch operations
- [ ] Implement audit logging
- [ ] Add email notifications
- [ ] Create mobile app API

---

**Last Updated**: November 30, 2025

**Maintained by**: Development Team

For the latest updates and documentation, please refer to the official repository.
