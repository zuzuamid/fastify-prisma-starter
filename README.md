# Node.js Express Prisma Starter Template

A comprehensive, production-ready Node.js backend starter template built with Express.js, PostgreSQL, Prisma ORM, TypeScript, and modern development practices.

## 🚀 Features

- **🔧 Modern Stack**: Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM
- **🔐 Authentication**: JWT-based authentication with refresh tokens
- **👥 User Management**: Complete user CRUD with role-based access control
- **📁 File Upload**: Cloudinary integration for media management
- **📧 Email Service**: Nodemailer integration for email functionality
- **🛡️ Security**: Helmet, CORS, rate limiting, input validation
- **📊 Database**: PostgreSQL with Prisma ORM for type-safe operations
- **🧪 Testing**: Jest setup with coverage reporting
- **📝 Code Quality**: ESLint, Prettier, Husky for code standards
- **🐳 Docker**: Complete Docker setup with docker-compose
- **📚 Documentation**: Comprehensive documentation and API reference
- **🔄 CI/CD Ready**: GitHub Actions workflow templates

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git**

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nodejs-express-prisma-starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run migrate

# (Optional) Seed the database
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Your server will be running at `http://localhost:5000`

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run start` - Start production server

### Database
- `npm run migrate` - Run database migrations
- `npm run migrate:deploy` - Deploy migrations to production
- `npm run migrate:reset` - Reset database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

### Docker
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with docker-compose

## 📁 Project Structure

```
src/
├── controllers/         # Request handlers
├── services/           # Business logic
├── models/             # Data models
├── middleware/         # Express middleware
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── validators/         # Request validation schemas
├── database/           # Database configuration
├── routes/             # Route definitions
├── config/             # Configuration files
├── scripts/            # Utility scripts
├── templates/          # Email templates
├── tests/              # Test files
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## 🔧 Configuration

### Environment Variables

See `env.example` for all available environment variables:

- **Database**: PostgreSQL connection string
- **JWT**: Authentication secrets and expiration times
- **Email**: SMTP configuration for email sending
- **Cloudinary**: File upload and storage
- **Security**: CORS, rate limiting, and other security settings

### Database Schema

The template includes the following models:

- **User**: User authentication and profile management
- **Media**: File upload and metadata storage

## 🚀 Deployment

### Docker Deployment

```bash
# Build and start with docker-compose
npm run docker:compose

# Or build and run manually
npm run docker:build
npm run docker:run
```

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set up production environment**:
   ```bash
   cp env.example .env
   # Configure production environment variables
   ```

3. **Run database migrations**:
   ```bash
   npm run migrate:deploy
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

## 📚 Documentation

Comprehensive documentation is available in the `DOCS/` directory:

- **[Quick Start Guide](./DOCS/QUICK_START.md)** - Get started in 5 minutes
- **[API Documentation](./DOCS/API_DOCUMENTATION.md)** - Complete API reference
- **[Project Structure](./DOCS/PROJECT_STRUCTURE.md)** - Detailed project organization
- **[Deployment Guide](./DOCS/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Troubleshooting](./DOCS/TROUBLESHOOTING.md)** - Common issues and solutions

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔍 Code Quality

The project includes:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

See [Contributing Guide](./DOCS/CONTRIBUTING.md) for detailed information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `DOCS/` directory
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [PostgreSQL](https://www.postgresql.org/) - Database

---

**Happy Coding! 🎉**

// Commit 85

// Commit 95
