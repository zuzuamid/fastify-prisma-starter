# Contributing Guide

Thank you for your interest in contributing to the Node.js Fastify PostgreSQL Prisma starter template! This guide will help you get started with contributing to the project.

## 🤝 How to Contribute

### 1. Fork the Repository

1. Click the "Fork" button on the GitHub repository page
2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/server.amzadfood.git
   cd server.amzadfood
   ```

### 2. Set Up Development Environment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database**:
   ```bash
   npm run migrate
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### 3. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-description
```

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments where necessary
- Update documentation if needed

### 5. Test Your Changes

```bash
# Run tests (if available)
npm test

# Check for TypeScript errors
npm run build

# Validate Prisma schema
npm run validate
```

### 6. Commit Your Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

### 7. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

## 📝 Code Style Guidelines

### 1. TypeScript

- Use TypeScript for all new code
- Define interfaces for complex objects
- Use proper type annotations
- Avoid `any` type when possible

### 2. Naming Conventions

- **Files**: Use kebab-case (`user-service.ts`)
- **Classes**: Use PascalCase (`UserService`)
- **Functions/Variables**: Use camelCase (`getUserById`)
- **Constants**: Use UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### 3. Code Organization

- Keep functions small and focused
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Group related functionality together

### 4. Error Handling

- Use try-catch blocks for async operations
- Throw meaningful error messages
- Use the custom `ApiError` class
- Log errors appropriately

## 🧪 Testing Guidelines

### 1. Test Coverage

- Write tests for new features
- Test error scenarios
- Test edge cases
- Aim for high test coverage

### 2. Test Structure

```typescript
describe('Feature Name', () => {
  describe('Method Name', () => {
    it('should do something when condition is met', () => {
      // Test implementation
    });
    
    it('should throw error when invalid input', () => {
      // Test error scenario
    });
  });
});
```

### 3. Test Data

- Use realistic test data
- Create test fixtures
- Clean up after tests
- Use factories for complex objects

## 📚 Documentation Guidelines

### 1. Code Documentation

- Add JSDoc comments for public functions
- Document complex algorithms
- Explain business logic
- Update README when needed

### 2. API Documentation

- Document all new endpoints
- Include request/response examples
- Document error responses
- Update API documentation

### 3. Module Documentation

- Document new modules
- Explain module purpose
- Include usage examples
- Update module documentation

## 🚀 Feature Development

### 1. Planning

- Create an issue describing the feature
- Discuss the approach with maintainers
- Break down large features into smaller tasks
- Consider backward compatibility

### 2. Implementation

- Follow the existing architecture
- Use the module generator for new modules
- Implement proper error handling
- Add appropriate validation

### 3. Testing

- Write unit tests
- Test integration scenarios
- Test error cases
- Verify performance impact

### 4. Documentation

- Update relevant documentation
- Add usage examples
- Document configuration changes
- Update API documentation

## 🐛 Bug Fixes

### 1. Bug Report

- Create a detailed issue
- Include steps to reproduce
- Provide error messages
- Include environment details

### 2. Investigation

- Reproduce the bug locally
- Identify the root cause
- Check for similar issues
- Consider edge cases

### 3. Fix Implementation

- Write a minimal fix
- Add tests to prevent regression
- Consider performance impact
- Update documentation if needed

### 4. Testing

- Test the fix thoroughly
- Test related functionality
- Verify no new issues introduced
- Test in different environments

## 🔧 Module Development

### 1. Using the Module Generator

#### Create a New Module

```bash
# Create a new module
npm run create-module <module-name>

# Examples:
npm run create-module product
npm run create-module order
npm run create-module category
```

**What it creates:**
- `module.routes.ts` - Fastify plugin routes with authentication
- `module.controller.ts` - Request handlers (FastifyRequest/FastifyReply)
- `module.service.ts` - Business logic with Prisma
- `module.interface.ts` - TypeScript interfaces
- `module.validation.ts` - Zod validation schemas
- `module.constant.ts` - Module constants

#### Rename a Module

```bash
# Rename an existing module
npm run rename-module <old-name> <new-name>

# Examples:
npm run rename-module product item
npm run rename-module order purchase
```

**What it does:**
- Renames the module directory
- Updates all file contents (lowercase and capitalized names)
- Renames files if they contain the module name
- Updates all references throughout the codebase

**Important:** After renaming, manually update:
- Route registrations in `src/app/routes/index.ts`
- Prisma schema if needed
- Any other external references

### 2. Module Structure

```
modules/YourModule/
├── your-module.routes.ts        # Fastify plugin routes
├── your-module.controller.ts    # Request handling
├── your-module.service.ts       # Business logic
├── your-module.interface.ts      # Type definitions
├── your-module.validation.ts    # Request validation
└── your-module.constant.ts      # Module constants
```

### 3. Registering Routes

```typescript
// Add to src/app/routes/index.ts
import { FastifyInstance } from "fastify";
import { YourModuleRoutes } from "../modules/your-module/your-module.routes";

const router = async (fastify: FastifyInstance) => {
  // ... existing routes
  fastify.register(YourModuleRoutes, { prefix: "/your-module" });
};

export default router;
```

### 4. Complete Module Setup Workflow

1. **Create the module:**
   ```bash
   npm run create-module product
   ```

2. **Update Prisma schema** (`prisma/schema.prisma`):
   ```prisma
   model Product {
     id        Int      @id @default(autoincrement())
     name      String
     price     Float?
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

3. **Run migrations:**
   ```bash
   npm run migrate
   ```

4. **Register routes** in `src/app/routes/index.ts`:
   ```typescript
   fastify.register(ProductRoutes, { prefix: "/product" });
   ```

5. **Customize the generated code** as needed:
   - Update interfaces in `product.interface.ts`
   - Add validation rules in `product.validation.ts`
   - Implement business logic in `product.service.ts`
   - Add custom routes in `product.routes.ts`

## 📋 Pull Request Guidelines

### 1. PR Description

- Describe what the PR does
- Reference related issues
- Include screenshots if applicable
- List breaking changes

### 2. PR Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Backward compatibility maintained

### 3. Review Process

- Address review comments
- Make requested changes
- Respond to feedback
- Keep PR up to date

## 🏷️ Commit Message Guidelines

### 1. Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### 2. Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 3. Examples

```
feat(auth): add password reset functionality

fix(user): resolve profile update validation issue

docs(api): update authentication endpoints

refactor(media): improve file upload error handling
```

## 🚫 What Not to Do

### 1. Don't

- Commit sensitive information
- Push directly to main branch
- Ignore existing code style
- Skip testing
- Make breaking changes without discussion

### 2. Avoid

- Large, complex PRs
- Mixing unrelated changes
- Incomplete implementations
- Poor commit messages
- Ignoring feedback

## 🎯 Contribution Ideas

### 1. Features

- Add new authentication methods
- Implement file compression
- Add caching layer
- Create admin dashboard
- Add API rate limiting

### 2. Improvements

- Performance optimizations
- Better error handling
- Enhanced validation
- Improved documentation
- Additional test coverage

### 3. Bug Fixes

- Fix known issues
- Improve error messages
- Resolve compatibility issues
- Fix security vulnerabilities

## 📞 Getting Help

### 1. Questions

- Check existing issues
- Search documentation
- Ask in discussions
- Contact maintainers

### 2. Resources

- [Project Documentation](./README.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation
- GitHub contributors page

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing! 🎉**

