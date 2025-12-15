# Deployment Guide

Complete guide for deploying the Node.js Express PostgreSQL Prisma starter template to various platforms.

## 🚀 Prerequisites

Before deploying, ensure you have:

- **Node.js** (v16 or higher)
- **PostgreSQL** database
- **Git** repository
- **Cloud storage** (Cloudinary) account
- **Email service** (Gmail/SMTP) configured
- **Domain name** (for production)

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration

Create production environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database_name"

# JWT Configuration
JWT_SECRET="your-super-secure-jwt-secret-key"
EXPIRES_IN="1d"
REFRESH_TOKEN_SECRET="your-super-secure-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"
RESET_PASS_TOKEN="your-super-secure-reset-password-token"
RESET_PASS_TOKEN_EXPIRES_IN="1h"

# Server Configuration
NODE_ENV="production"
PORT=5000

# Email Configuration
EMAIL="your-production-email@gmail.com"
APP_PASS="your-app-password"

# Cloudinary Configuration
CLOUD_NAME="your-cloudinary-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"

# Reset Password Link
RESET_PASS_LINK="https://your-domain.com/reset-password"

# Stripe Configuration (optional)
STRIPE_SECRET_KEY="your-stripe-secret-key"
```

### 2. Database Setup

1. **Create Production Database**:
   ```sql
   CREATE DATABASE your_production_db;
   ```

2. **Run Migrations**:
   ```bash
   npm run migrate
   ```

3. **Verify Schema**:
   ```bash
   npm run validate
   ```

### 3. Build Application

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Verify build
ls dist/
```

## 🌐 Deployment Platforms

### 1. Vercel Deployment

Vercel is already configured with `vercel.json`.

#### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add all production environment variables

#### Vercel Configuration (`vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

### 2. Heroku Deployment

#### Steps:

1. **Install Heroku CLI**:
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

4. **Add PostgreSQL Addon**:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set REFRESH_TOKEN_SECRET=your-refresh-token-secret
   # ... add all other environment variables
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

7. **Run Migrations**:
   ```bash
   heroku run npm run migrate
   ```

#### Heroku Configuration:

Create `Procfile`:
```
web: node dist/server.js
```

### 3. DigitalOcean App Platform

#### Steps:

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Create new app
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Run Command: `node dist/server.js`
   - Source Directory: `/`

3. **Add Database**:
   - Add PostgreSQL database
   - Note the connection string

4. **Set Environment Variables**:
   - Add all production environment variables
   - Use the database connection string

5. **Deploy**:
   - Click "Create Resources"
   - Wait for deployment to complete

### 4. AWS EC2 Deployment

#### Steps:

1. **Launch EC2 Instance**:
   - Choose Ubuntu 20.04 LTS
   - Select t3.micro (free tier)
   - Configure security groups (ports 22, 80, 443, 5000)

2. **Connect to Instance**:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib -y
   
   # Install PM2
   sudo npm install -g pm2
   ```

4. **Setup Database**:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE your_production_db;
   CREATE USER your_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE your_production_db TO your_user;
   \q
   ```

5. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Set environment variables
   nano .env
   # Add all production environment variables
   
   # Run migrations
   npm run migrate
   
   # Start with PM2
   pm2 start dist/server.js --name "your-app"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx** (Optional):
   ```bash
   sudo apt install nginx -y
   
   # Create Nginx configuration
   sudo nano /etc/nginx/sites-available/your-app
   ```

   Nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 5. Docker Deployment

#### Create Dockerfile:

```dockerfile
# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "dist/server.js"]
```

#### Create docker-compose.yml:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/database
      - JWT_SECRET=your-jwt-secret
      - REFRESH_TOKEN_SECRET=your-refresh-token-secret
      # ... add other environment variables
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=database
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### Deploy with Docker:

```bash
# Build and start
docker-compose up -d

# Run migrations
docker-compose exec app npm run migrate

# View logs
docker-compose logs -f
```

## 🔧 Production Configuration

### 1. Environment Variables

#### Required Variables:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secure-jwt-secret
REFRESH_TOKEN_SECRET=your-super-secure-refresh-token-secret
EMAIL=your-production-email@gmail.com
APP_PASS=your-app-password
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

#### Optional Variables:
```env
STRIPE_SECRET_KEY=your-stripe-secret-key
RESET_PASS_LINK=https://your-domain.com/reset-password
```

### 2. Database Configuration

#### PostgreSQL Settings:
```sql
-- Create production database
CREATE DATABASE your_production_db;

-- Create user
CREATE USER your_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE your_production_db TO your_user;

-- Connect to database
\c your_production_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### 3. Security Configuration

#### CORS Settings:
```typescript
// Update in src/app.ts
app.use(
  cors({
    origin: ["https://your-domain.com", "https://www.your-domain.com"],
    credentials: true,
  })
);
```

#### JWT Configuration:
- Use strong, random secrets
- Set appropriate expiration times
- Use HTTPS in production

#### File Upload Limits:
```typescript
// Update in src/app/helpers/fileUploader.ts
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add file type validation
  }
});
```

## 📊 Monitoring and Logging

### 1. Application Monitoring

#### PM2 Monitoring (for EC2):
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/server.js --name "your-app"

# Monitor
pm2 monit

# View logs
pm2 logs your-app

# Restart application
pm2 restart your-app
```

#### Health Check Endpoint:
```typescript
// Add to src/app.ts
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### 2. Database Monitoring

#### Connection Pooling:
```typescript
// Update in src/app/utils/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});
```

### 3. Error Tracking

#### Sentry Integration:
```bash
npm install @sentry/node
```

```typescript
// Add to src/server.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});

app.use(Sentry.requestHandler());
app.use(Sentry.errorHandler());
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### 2. Environment-Specific Deployments

#### Development:
- Automatic deployment on push to `develop` branch
- Uses development environment variables
- Deploys to staging URL

#### Production:
- Manual deployment from `main` branch
- Uses production environment variables
- Deploys to production URL

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check TypeScript compilation errors

2. **Database Connection Issues**:
   - Verify database URL format
   - Check network connectivity
   - Verify database credentials

3. **Environment Variable Issues**:
   - Ensure all required variables are set
   - Check variable names and values
   - Verify special characters are escaped

4. **File Upload Issues**:
   - Check Cloudinary configuration
   - Verify file size limits
   - Check CORS settings

5. **Email Sending Issues**:
   - Verify SMTP credentials
   - Check email service limits
   - Verify network connectivity

### Debugging Commands

```bash
# Check application status
pm2 status

# View application logs
pm2 logs your-app

# Restart application
pm2 restart your-app

# Check database connection
npm run studio

# Validate Prisma schema
npm run validate

# Run migrations
npm run migrate
```

## 📚 Related Documentation

- [Project Structure](./PROJECT_STRUCTURE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Authentication Module](./MODULES/AUTH_MODULE.md)
- [User Module](./MODULES/USER_MODULE.md)
- [Media Module](./MODULES/MEDIA_MODULE.md)

## 🆘 Support

For deployment issues:

1. Check the troubleshooting section
2. Review platform-specific documentation
3. Check application logs
4. Verify environment configuration
5. Contact support if needed

---

**Happy Deploying! 🚀**

