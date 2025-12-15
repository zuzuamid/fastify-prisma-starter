# Quick Start Guide

Get up and running with the Node.js Express PostgreSQL Prisma starter template in minutes.

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

## 🚀 Create Your First Module

```bash
# Create a new module
npm run create-module product

# This creates a complete Product module with:
# - Controller
# - Service
# - Routes
# - Interface
# - Validation
# - Constants
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run studio           # Open Prisma Studio

# Database
npm run migrate          # Run database migrations
npm run validate         # Validate Prisma schema

# Module Creation
npm run create-module <name>  # Create new module
```

## 🆘 Need Help?

- Check the [README](./README.md) for detailed setup instructions
- Review the [API Documentation](./API_DOCUMENTATION.md) for endpoint details
- Look at the [Module Documentation](./MODULES/) for specific features
- Follow the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for production setup

---

**Happy Coding! 🎉**

// Commit 68
