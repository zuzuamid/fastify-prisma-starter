# Quick Start Guide

Get up and running with the Node.js Fastify PostgreSQL Prisma starter template in minutes.

## ⚡ 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repository-url>
cd server.amzadfood

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT Configuration
JWT_SECRET="your-jwt-secret-key"
EXPIRES_IN="1d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"
RESET_PASS_TOKEN="your-reset-password-token"
RESET_PASS_TOKEN_EXPIRES_IN="1h"

# Server Configuration
NODE_ENV="development"
PORT=5000

# Email Configuration
EMAIL="your-email@gmail.com"
APP_PASS="your-app-password"

# Cloudinary Configuration
CLOUD_NAME="your-cloudinary-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"

# Reset Password Link
RESET_PASS_LINK="http://localhost:3000/reset-password"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run postinstall

# Run database migrations
npm run migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Your server will be running at `http://localhost:5000`

## 🧪 Test the API

### 1. Create a User

```bash
curl -X POST http://localhost:5000/api/v1/user/create-user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "USER"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get Profile (with token from login)

```bash
curl -X GET http://localhost:5000/api/v1/user/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🎯 Next Steps

1. **Explore the API**: Check out the [API Documentation](./API_DOCUMENTATION.md)
2. **Understand the Structure**: Read [Project Structure](./PROJECT_STRUCTURE.md)
3. **Learn about Modules**: Review [Module Documentation](./MODULES/)
4. **Deploy**: Follow the [Deployment Guide](./DEPLOYMENT_GUIDE.md)

## 🚀 Module Scripts

### Create a New Module

The `create-module` script generates a complete module structure with all necessary files:

```bash
# Create a new module
npm run create-module <module-name>

# Example:
npm run create-module product
npm run create-module order
npm run create-module category
```

**What it creates:**
- `module.routes.ts` - Fastify plugin routes with authentication
- `module.controller.ts` - Request handlers with FastifyRequest/FastifyReply
- `module.service.ts` - Business logic with Prisma
- `module.interface.ts` - TypeScript interfaces
- `module.validation.ts` - Zod validation schemas
- `module.constant.ts` - Module constants

**Example:**
```bash
npm run create-module product
```

This creates:
```
src/app/modules/product/
├── product.routes.ts      # Fastify routes
├── product.controller.ts  # Controllers
├── product.service.ts     # Services
├── product.interface.ts  # Interfaces
├── product.validation.ts # Validation schemas
└── product.constant.ts   # Constants
```

**After creating a module:**
1. Register routes in `src/app/routes/index.ts`:
```typescript
import { ProductRoutes } from "../modules/product/product.routes";

const router = async (fastify: FastifyInstance) => {
  // ... existing routes
  fastify.register(ProductRoutes, { prefix: "/product" });
};
```

2. Update Prisma schema if needed:
```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

3. Run migrations:
```bash
npm run migrate
```

### Rename a Module

The `rename-module` script renames an existing module and updates all references:

```bash
# Rename a module
npm run rename-module <old-name> <new-name>

# Example:
npm run rename-module product item
npm run rename-module order purchase
```

**What it does:**
- Renames the module directory
- Updates all file contents (lowercase and capitalized names)
- Renames files if they contain the module name
- Updates all references throughout the codebase

**Example:**
```bash
npm run rename-module product item
```

This will:
- Rename `src/app/modules/product/` → `src/app/modules/item/`
- Update all `product` references to `item` in files
- Update all `Product` references to `Item` in files
- Rename files like `product.routes.ts` → `item.routes.ts`

**Important Notes:**
- Make sure the module exists before renaming
- The new module name should not already exist
- Update route registrations manually after renaming
- Update Prisma schema manually if needed

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run studio           # Open Prisma Studio

# Database
npm run migrate          # Run database migrations
npm run validate         # Validate Prisma schema

# Module Management
npm run create-module <name>        # Create new module
npm run rename-module <old> <new>   # Rename existing module
```

## 🆘 Need Help?

- Check the [README](./README.md) for detailed setup instructions
- Review the [API Documentation](./API_DOCUMENTATION.md) for endpoint details
- Look at the [Module Documentation](./MODULES/) for specific features
- Follow the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for production setup

---

**Happy Coding! 🎉**

