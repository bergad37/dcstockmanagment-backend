.PHONY: help install dev build start clean prisma-generate prisma-migrate prisma-push prisma-studio prisma-seed db-reset db-setup lint lint-fix format format-check type-check setup all check-node check-pnpm

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
BLUE   := \033[0;34m
RED    := \033[0;31m
NC     := \033[0m

help: ## Show this help message
	@echo '$(BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)'
	@echo '$(BLUE)  Stock Management Backend - Available Commands$(NC)'
	@echo '$(BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo '$(BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)'

check-node: ## Check Node.js version (20.19.0 required)
	@echo "$(YELLOW)🔍 Checking Node.js version...$(NC)"
	@node -v | grep -q "v20.19" || (echo "$(RED)❌ Error: Node.js 20.19.x is required$(NC)" && echo "$(YELLOW)Current version: $$(node -v)$(NC)" && echo "$(YELLOW)Run: nvm install 20.19.0 && nvm use 20.19.0$(NC)" && exit 1)
	@echo "$(GREEN)✓ Node.js version is correct: $$(node -v)$(NC)"

check-pnpm: ## Check pnpm installation
	@echo "$(YELLOW)🔍 Checking pnpm installation...$(NC)"
	@command -v pnpm >/dev/null 2>&1 || (echo "$(RED)❌ Error: pnpm is not installed$(NC)" && echo "$(YELLOW)Run: npm install -g pnpm$(NC)" && exit 1)
	@echo "$(GREEN)✓ pnpm is installed: v$$(pnpm -v)$(NC)"

install: check-node check-pnpm ## Install dependencies using pnpm
	@echo "$(YELLOW)📦 Installing dependencies...$(NC)"
	@pnpm install
	@echo "$(GREEN)✓ Dependencies installed successfully$(NC)"

dev: ## Start development server
	@echo "$(YELLOW)🚀 Starting development server...$(NC)"
	@pnpm run dev

build: ## Build TypeScript to JavaScript
	@echo "$(YELLOW)🔨 Building project...$(NC)"
	@pnpm run build
	@echo "$(GREEN)✓ Build completed successfully$(NC)"

start: ## Start production server
	@echo "$(YELLOW)🚀 Starting production server...$(NC)"
	@pnpm run start

clean: ## Clean build artifacts and dependencies
	@echo "$(YELLOW)🧹 Cleaning build artifacts...$(NC)"
	@rm -rf dist node_modules .pnpm-store *.tsbuildinfo
	@echo "$(GREEN)✓ Cleaned successfully$(NC)"

prisma-generate: ## Generate Prisma Client
	@echo "$(YELLOW)⚙️  Generating Prisma Client...$(NC)"
	@pnpm run prisma:generate
	@echo "$(GREEN)✓ Prisma Client generated$(NC)"

prisma-migrate: ## Run Prisma migrations
	@echo "$(YELLOW)🔄 Running Prisma migrations...$(NC)"
	@pnpm run prisma:migrate
	@echo "$(GREEN)✓ Migrations completed$(NC)"

prisma-push: ## Push Prisma schema to database
	@echo "$(YELLOW)📤 Pushing schema to database...$(NC)"
	@pnpm run prisma:push
	@echo "$(GREEN)✓ Schema pushed successfully$(NC)"

prisma-studio: ## Open Prisma Studio
	@echo "$(YELLOW)🎨 Opening Prisma Studio...$(NC)"
	@pnpm run prisma:studio

prisma-seed: ## Seed database with initial data
	@echo "$(YELLOW)🌱 Seeding database...$(NC)"
	@pnpm run prisma:seed
	@echo "$(GREEN)✓ Database seeded successfully$(NC)"

db-reset: ## Reset database (⚠️  CAUTION: Deletes all data)
	@echo "$(RED)⚠️  WARNING: This will delete all data!$(NC)"
	@echo "$(YELLOW)Press Ctrl+C to cancel, or wait 3 seconds to continue...$(NC)"
	@sleep 3
	@echo "$(YELLOW)🔄 Resetting database...$(NC)"
	@pnpm prisma migrate reset --force
	@echo "$(GREEN)✓ Database reset completed$(NC)"

db-setup: prisma-generate prisma-migrate prisma-seed ## Complete database setup
	@echo "$(GREEN)✓ Database setup completed successfully$(NC)"

lint: ## Run ESLint
	@echo "$(YELLOW)🔍 Running ESLint...$(NC)"
	@pnpm run lint

lint-fix: ## Fix ESLint errors automatically
	@echo "$(YELLOW)🔧 Fixing ESLint errors...$(NC)"
	@pnpm run lint:fix
	@echo "$(GREEN)✓ Linting completed$(NC)"

format: ## Format code with Prettier
	@echo "$(YELLOW)✨ Formatting code...$(NC)"
	@pnpm run format
	@echo "$(GREEN)✓ Code formatted successfully$(NC)"

format-check: ## Check code formatting
	@echo "$(YELLOW)🔍 Checking code formatting...$(NC)"
	@pnpm run format:check

type-check: ## Run TypeScript type checking
	@echo "$(YELLOW)🔍 Running type check...$(NC)"
	@pnpm run type-check
	@echo "$(GREEN)✓ Type check passed$(NC)"

setup: check-node check-pnpm install db-setup ## Complete project setup
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(GREEN)✓ Project setup completed successfully!$(NC)"
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo ""
	@echo "$(BLUE)Next steps:$(NC)"
	@echo "  1. $(YELLOW)make dev$(NC)          - Start development server"
	@echo "  2. Visit $(YELLOW)http://localhost:3000/api-docs$(NC) for API documentation"
	@echo "  3. Visit $(YELLOW)http://localhost:3000/health$(NC) for health check"
	@echo ""

all: lint type-check build ## Run all checks and build
	@echo "$(GREEN)✓ All tasks completed successfully$(NC)"

logs: ## Show recent logs
	@echo "$(YELLOW)📋 Showing logs...$(NC)"
	@tail -f logs/*.log 2>/dev/null || echo "$(YELLOW)No log files found$(NC)"