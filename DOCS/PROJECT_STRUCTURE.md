# Project Structure

This document outlines the organized structure of the Node.js Fastify Prisma starter template following industry best practices.

## 📁 Root Directory

```
nodejs-fastify-prisma-starter/
├── .github/                    # GitHub workflows and templates
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline
├── .husky/                    # Git hooks
│   └── pre-commit            # Pre-commit hook
├── DOCS/                      # Comprehensive documentation
│   ├── MODULES/              # Module-specific documentation
│   ├── API_DOCUMENTATION.md  # Complete API reference
│   ├── DEPLOYMENT_GUIDE.md   # Production deployment guide
│   ├── TROUBLESHOOTING.md    # Common issues and solutions
│   └── ...                   # Other documentation files
├── src/                       # Source code
├── prisma/                    # Database schema and migrations
├── uploads/                   # File uploads (development)
├── logs/                      # Application logs
├── coverage/                  # Test coverage reports
├── dist/                      # Build output
├── node_modules/              # Dependencies
├── .env                       # Environment variables (not in git)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── .dockerignore             # Docker ignore rules
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── jest.config.js            # Jest testing configuration
├── tsconfig.json             # TypeScript configuration
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── nginx.conf                # Nginx configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
└── vercel.json               # Vercel deployment configuration
```

## 📁 Source Code Structure (`src/`)

```
src/
├── controllers/              # Request handlers (MVC Controllers)
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   └── media.controller.ts
├── services/                 # Business logic layer
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── media.service.ts
├── models/                   # Data models and interfaces
│   ├── user.model.ts
│   ├── media.model.ts
│   └── index.ts
├── middleware/               # Fastify middleware functions
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── validation.middleware.ts
│   └── upload.middleware.ts
├── utils/                    # Utility functions and helpers
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│   ├── jwtHelpers.ts
│   ├── emailHelper.ts
│   └── fileUploader.ts
├── types/                    # TypeScript type definitions
│   ├── common.types.ts
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── api.types.ts
├── constants/                # Application constants
│   ├── user.constants.ts
│   ├── auth.constants.ts
│   └── app.constants.ts
├── validators/               # Request validation schemas
│   ├── auth.validator.ts
│   ├── user.validator.ts
│   └── media.validator.ts
├── database/                 # Database configuration and utilities
│   ├── prisma.ts
│   ├── connection.ts
│   └── migrations/
├── routes/                   # Route definitions
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── media.routes.ts
│   └── index.ts
├── config/                   # Configuration files
│   ├── database.config.ts
│   ├── email.config.ts
│   ├── cloudinary.config.ts
│   └── index.ts
├── scripts/                  # Utility scripts
│   ├── createModule.ts
│   ├── seed.ts
│   └── migrate.ts
├── templates/                # Email templates
│   ├── forgotPassword.template.hbs
│   ├── welcome.template.hbs
│   └── resetPassword.template.hbs
├── tests/                    # Test files
│   ├── setup.ts
│   ├── auth.test.ts
│   ├── user.test.ts
│   └── media.test.ts
├── app.ts                    # Fastify application configuration
└── server.ts                 # Server entry point
```

## 🏗️ Architecture Patterns

### 1. MVC Pattern
- **Models**: Data models and business logic (`src/models/`)
- **Views**: JSON API responses (handled by controllers)
- **Controllers**: Request handling (`src/controllers/`)

### 2. Service Layer Pattern
- **Services**: Business logic (`src/services/`)
- **Controllers**: HTTP concerns only
- **Models**: Data access and validation

### 3. Repository Pattern (via Prisma)
- **Database**: Prisma ORM for data access
- **Services**: Business logic layer
- **Controllers**: Request/response handling

### 4. Middleware Pattern
- **Authentication**: JWT token validation
- **Validation**: Request data validation
- **Error Handling**: Centralized error management
- **Logging**: Request/response logging

## 📋 File Naming Conventions

### Controllers
- `*.controller.ts` - Request handlers
- Example: `auth.controller.ts`, `user.controller.ts`

### Services
- `*.service.ts` - Business logic
- Example: `auth.service.ts`, `user.service.ts`

### Models
- `*.model.ts` - Data models
- Example: `user.model.ts`, `media.model.ts`

### Middleware
- `*.middleware.ts` - Fastify middleware
- Example: `auth.middleware.ts`, `error.middleware.ts`

### Routes
- `*.routes.ts` - Route definitions
- Example: `auth.routes.ts`, `user.routes.ts`

### Types
- `*.types.ts` - TypeScript type definitions
- Example: `auth.types.ts`, `user.types.ts`

### Validators
- `*.validator.ts` - Request validation schemas
- Example: `auth.validator.ts`, `user.validator.ts`

### Constants
- `*.constants.ts` - Application constants
- Example: `user.constants.ts`, `auth.constants.ts`

## 🔄 Data Flow

```
Request → Routes → Middleware → Controller → Service → Database
                ↓
Response ← Controller ← Service ← Database
```

### Detailed Flow:
1. **Request** arrives at route
2. **Middleware** processes (auth, validation, logging)
3. **Controller** handles HTTP concerns
4. **Service** implements business logic
5. **Database** (via Prisma) handles data operations
6. **Response** flows back through the layers

## 📦 Module Organization

Each feature module follows this structure:

```
feature/
├── feature.controller.ts      # HTTP request handling
├── feature.service.ts         # Business logic
├── feature.routes.ts          # Route definitions
├── feature.validator.ts       # Request validation
├── feature.types.ts           # TypeScript types
├── feature.constants.ts       # Module constants
└── feature.model.ts           # Data model (if needed)
```

## 🛠️ Configuration Management

### Environment Configuration
- **Development**: `.env` (local development)
- **Production**: Environment variables
- **Template**: `env.example` (for reference)

### TypeScript Configuration
- **Main**: `tsconfig.json`
- **Paths**: Configured for absolute imports
- **Strict**: Enabled for type safety

### Code Quality
- **ESLint**: `.eslintrc.js`
- **Prettier**: `.prettierrc`
- **Husky**: Pre-commit hooks
- **lint-staged**: Staged file linting

## 🧪 Testing Structure

```
tests/
├── setup.ts                  # Test setup and configuration
├── auth.test.ts              # Authentication tests
├── user.test.ts              # User management tests
├── media.test.ts             # Media upload tests
├── __mocks__/                # Mock implementations
└── fixtures/                 # Test data fixtures
```

## 🐳 Docker Structure

```
├── Dockerfile                # Application container
├── docker-compose.yml        # Multi-service setup
├── nginx.conf                # Reverse proxy configuration
└── .dockerignore             # Docker ignore rules
```

## 📚 Documentation Structure

```
DOCS/
├── README.md                 # Main documentation
├── QUICK_START.md           # Quick start guide
├── API_DOCUMENTATION.md     # API reference
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
├── TROUBLESHOOTING.md       # Common issues
├── CONTRIBUTING.md          # Contribution guidelines
├── PROJECT_STRUCTURE.md     # This file
└── MODULES/                 # Module-specific docs
    ├── AUTH_MODULE.md
    ├── USER_MODULE.md
    └── MEDIA_MODULE.md
```

## 🚀 Best Practices

### 1. Separation of Concerns
- Controllers handle HTTP only
- Services contain business logic
- Models handle data operations
- Middleware handles cross-cutting concerns

### 2. Error Handling
- Centralized error handling
- Custom error classes
- Proper HTTP status codes
- Error logging

### 3. Security
- Input validation
- Authentication middleware
- Rate limiting
- CORS configuration
- Security headers

### 4. Performance
- Database query optimization
- Caching strategies
- Compression
- Connection pooling

### 5. Maintainability
- Clear file organization
- Consistent naming conventions
- Comprehensive documentation
- Type safety with TypeScript

## 🔧 Development Workflow

1. **Feature Development**:
   - Create feature branch
   - Implement in appropriate modules
   - Add tests
   - Update documentation

2. **Code Quality**:
   - ESLint checks
   - Prettier formatting
   - TypeScript compilation
   - Test coverage

3. **Deployment**:
   - Build application
   - Run migrations
   - Deploy to environment
   - Monitor health

This structure provides a solid foundation for building scalable, maintainable Node.js applications with clear separation of concerns and industry best practices.

