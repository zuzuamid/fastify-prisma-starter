# Troubleshooting Guide

Common issues and solutions for the Node.js Express PostgreSQL Prisma starter template.

## 🚨 Common Issues

### 1. Database Connection Issues

#### Problem: Cannot connect to database
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions**:
1. **Check PostgreSQL is running**:
   ```bash
   # Windows
   net start postgresql-x64-13
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

2. **Verify DATABASE_URL**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

3. **Check database exists**:
   ```sql
   CREATE DATABASE your_database_name;
   ```

4. **Verify user permissions**:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
   ```

#### Problem: Prisma client not generated
```
Error: PrismaClient is not defined
```

**Solutions**:
1. **Generate Prisma client**:
   ```bash
   npm run postinstall
   # or
   npx prisma generate
   ```

2. **Check Prisma schema**:
   ```bash
   npm run validate
   ```

3. **Reset Prisma client**:
   ```bash
   rm -rf node_modules/.prisma
   npm run postinstall
   ```

### 2. Authentication Issues

#### Problem: JWT token errors
```
Error: jwt malformed
```

**Solutions**:
1. **Check JWT secret**:
   ```env
   JWT_SECRET="your-super-secure-jwt-secret"
   ```

2. **Verify token format**:
   ```javascript
   // Correct format
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Check token expiration**:
   ```env
   EXPIRES_IN="1d"
   REFRESH_TOKEN_EXPIRES_IN="7d"
   ```

#### Problem: Password hashing issues
```
Error: bcrypt hash error
```

**Solutions**:
1. **Check bcrypt installation**:
   ```bash
   npm install bcrypt @types/bcrypt
   ```

2. **Verify password format**:
   ```javascript
   // Password should be string
   const hashedPassword = await bcrypt.hash(password, 12);
   ```

### 3. File Upload Issues

#### Problem: Multer errors
```
Error: Unexpected field
```

**Solutions**:
1. **Check form data format**:
   ```javascript
   // Correct multipart form data
   const formData = new FormData();
   formData.append('file', file);
   formData.append('data', JSON.stringify(data));
   ```

2. **Verify multer configuration**:
   ```typescript
   const upload = multer({
     storage: storage,
     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
     fileFilter: (req, file, cb) => {
       // Add file type validation
       cb(null, true);
     }
   });
   ```

#### Problem: Cloudinary upload fails
```
Error: Cloudinary upload failed
```

**Solutions**:
1. **Check Cloudinary credentials**:
   ```env
   CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUD_API_KEY="your-cloudinary-api-key"
   CLOUD_API_SECRET="your-cloudinary-api-secret"
   ```

2. **Verify file format**:
   ```javascript
   // Supported formats
   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
   ```

3. **Check file size**:
   ```javascript
   // Default limit is 5MB
   const maxSize = 5 * 1024 * 1024; // 5MB
   ```

### 4. Email Sending Issues

#### Problem: Email not sent
```
Error: SMTP connection failed
```

**Solutions**:
1. **Check email credentials**:
   ```env
   EMAIL="your-email@gmail.com"
   APP_PASS="your-app-password"  # Not your regular password
   ```

2. **Enable 2-factor authentication**:
   - Go to Google Account settings
   - Enable 2FA
   - Generate app password

3. **Check SMTP settings**:
   ```javascript
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL,
       pass: process.env.APP_PASS
     }
   });
   ```

### 5. CORS Issues

#### Problem: CORS errors in browser
```
Error: Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions**:
1. **Update CORS configuration**:
   ```typescript
   app.use(
     cors({
       origin: ["http://localhost:3000", "https://your-domain.com"],
       credentials: true,
     })
   );
   ```

2. **Check frontend request**:
   ```javascript
   fetch('http://localhost:5000/api/v1/endpoint', {
     method: 'POST',
     credentials: 'include', // Important for cookies
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
   });
   ```

### 6. TypeScript Compilation Issues

#### Problem: TypeScript errors
```
Error: Cannot find module '@prisma/client'
```

**Solutions**:
1. **Install missing types**:
   ```bash
   npm install @types/node @types/express @types/bcrypt
   ```

2. **Check tsconfig.json**:
   ```json
   {
     "compilerOptions": {
       "target": "es2016",
       "module": "commonjs",
       "rootDir": "./src",
       "outDir": "./dist",
       "strict": true,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "skipLibCheck": true
     }
   }
   ```

3. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

### 7. Module Creation Issues

#### Problem: Module generator fails
```
Error: Cannot find module 'fs'
```

**Solutions**:
1. **Check Node.js version**:
   ```bash
   node --version  # Should be v16 or higher
   ```

2. **Run with proper permissions**:
   ```bash
   npm run create-module product
   ```

3. **Check file permissions**:
   ```bash
   chmod +x src/scripts/createModule.ts
   ```

### 8. Environment Variable Issues

#### Problem: Environment variables not loaded
```
Error: process.env.VARIABLE is undefined
```

**Solutions**:
1. **Check .env file location**:
   ```
   project-root/
   ├── .env          # Should be here
   ├── src/
   └── package.json
   ```

2. **Verify .env format**:
   ```env
   # Correct format
   VARIABLE_NAME=value
   
   # No spaces around =
   # No quotes unless needed
   ```

3. **Restart development server**:
   ```bash
   npm run dev
   ```

## 🔍 Debugging Tips

### 1. Enable Debug Logging

```typescript
// Add to src/server.ts
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URL:', process.env.DATABASE_URL);
console.log('Port:', process.env.PORT);
```

### 2. Check Database Connection

```typescript
// Add to src/app/utils/prisma.ts
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));
```

### 3. Verify JWT Tokens

```javascript
// Decode JWT token (for debugging only)
const jwt = require('jsonwebtoken');
const token = 'your-jwt-token';
const decoded = jwt.decode(token);
console.log(decoded);
```

### 4. Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:5000/

# Test with verbose output
curl -v http://localhost:5000/api/v1/auth/login
```

## 🛠️ Useful Commands

### Database Commands
```bash
# Reset database
npx prisma migrate reset

# View database in browser
npm run studio

# Check schema
npm run validate

# Generate client
npx prisma generate
```

### Development Commands
```bash
# Start with debug
DEBUG=* npm run dev

# Build and check
npm run build
node dist/server.js

# Check for errors
npm run lint
```

### Module Commands
```bash
# Create module
npm run create-module <name>

# List modules
ls src/app/modules/
```

## 📚 Getting Help

### 1. Check Logs
```bash
# Application logs
npm run dev

# PM2 logs (if using PM2)
pm2 logs

# Docker logs (if using Docker)
docker-compose logs
```

### 2. Common Error Codes
- `ECONNREFUSED`: Database connection failed
- `EADDRINUSE`: Port already in use
- `ENOENT`: File or directory not found
- `EACCES`: Permission denied
- `EMFILE`: Too many open files

### 3. Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 Still Need Help?

1. **Check the logs** for specific error messages
2. **Verify your environment** variables are correct
3. **Test with minimal setup** to isolate the issue
4. **Check the documentation** for your specific use case
5. **Search for similar issues** in the project repository
6. **Create an issue** with detailed error information

---

**Happy Debugging! 🐛**

