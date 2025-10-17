# SlayerForge - Free Hosting Deployment Guide

## 🎯 Recommended Free Hosting Solution

**Best Option: Vercel (Frontend) + Railway/Render (Backend)**

This combination provides:
- ✅ Free hosting for both frontend and backend
- ✅ Automatic deployments from GitHub
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Good performance
- ✅ Easy setup

---

## 📋 Table of Contents

1. [Option 1: Vercel + Railway (Recommended)](#option-1-vercel--railway-recommended)
2. [Option 2: Netlify + Render](#option-2-netlify--render)
3. [Option 3: GitHub Pages + Railway](#option-3-github-pages--railway)
4. [Pre-Deployment Checklist](#pre-deployment-checklist)
5. [Environment Variables Setup](#environment-variables-setup)
6. [Database Migration](#database-migration)
7. [Troubleshooting](#troubleshooting)

---

## Option 1: Vercel + Railway (Recommended) ⭐

### Why This Stack?
- **Vercel**: Best-in-class frontend hosting with automatic builds
- **Railway**: Free tier with PostgreSQL database included
- **Total Cost**: $0/month (within free tier limits)

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited builds
- **Railway**: 500 hours/month, 512MB RAM, 1GB disk

---

## 🚀 Step-by-Step Deployment

### Part A: Deploy Backend to Railway

#### 1. Prepare Backend for Production

First, update your backend configuration for production:

**Update `backend/config/database.ts`:**
```typescript
export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      },
    },
    useNullAsDefault: true,
  },
});
```

**Update `backend/config/server.ts`:**
```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

**Create `backend/package.json` build script:**
```json
{
  "scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build",
    "strapi": "strapi"
  }
}
```

#### 2. Create Railway Account & Deploy

1. **Sign up for Railway**
   - Go to https://railway.app/
   - Sign up with GitHub (recommended)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `slayerforge` repository
   - Select the `backend` folder as root directory

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically provision a PostgreSQL database
   - Connection details will be auto-configured

4. **Configure Environment Variables**
   ```env
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   
   # Railway automatically provides DATABASE_URL
   DATABASE_CLIENT=postgres
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   
   # Generate these with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   APP_KEYS=<generate-random-key1>,<generate-random-key2>
   API_TOKEN_SALT=<generate-random-salt>
   ADMIN_JWT_SECRET=<generate-random-secret>
   TRANSFER_TOKEN_SALT=<generate-random-salt>
   JWT_SECRET=<generate-random-secret>
   
   # Your Railway app URL (will be available after first deploy)
   PUBLIC_URL=https://your-app.railway.app
   ```

5. **Deploy**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (~3-5 minutes)
   - Copy your Railway app URL (e.g., `https://your-app.railway.app`)

6. **Access Strapi Admin**
   - Visit `https://your-app.railway.app/admin`
   - Create your admin account
   - Import products using the import script (see below)

#### 3. Import Products to Railway

Update your local `backend/.env` temporarily to point to Railway:
```env
STRAPI_URL=https://your-app.railway.app
```

Then run:
```bash
cd backend
node scripts/import-products.js
```

---

### Part B: Deploy Frontend to Vercel

#### 1. Update Frontend Configuration

**Update `frontend/src/apollo/client.ts`:**
```typescript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:1337/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

**Create `frontend/.env.production`:**
```env
VITE_API_URL=https://your-app.railway.app/graphql
```

**Update image URLs in components:**

In all components that reference images, update:
```typescript
// OLD
if (product.image?.url) return `http://localhost:1337${product.image.url}`;

// NEW
const apiUrl = import.meta.env.VITE_API_URL?.replace('/graphql', '') || 'http://localhost:1337';
if (product.image?.url) return `${apiUrl}${product.image.url}`;
```

#### 2. Create Vercel Account & Deploy

1. **Sign up for Vercel**
   - Go to https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your `slayerforge` repository
   - Vercel will auto-detect Vite

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-app.railway.app/graphql
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your site will be live at `https://your-app.vercel.app`

6. **Update Backend CORS**
   
   In Railway dashboard, add to environment variables:
   ```env
   CLIENT_URL=https://your-app.vercel.app
   ```
   
   Update `backend/config/middlewares.ts`:
   ```typescript
   export default [
     'strapi::logger',
     'strapi::errors',
     {
       name: 'strapi::security',
       config: {
         contentSecurityPolicy: {
           useDefaults: true,
           directives: {
             'connect-src': ["'self'", 'https:'],
             'img-src': ["'self'", 'data:', 'blob:', 'https:'],
             'media-src': ["'self'", 'data:', 'blob:', 'https:'],
             upgradeInsecureRequests: null,
           },
         },
       },
     },
     {
       name: 'strapi::cors',
       config: {
         enabled: true,
         origin: [
           'http://localhost:5173',
           process.env.CLIENT_URL,
         ].filter(Boolean),
       },
     },
     'strapi::poweredBy',
     'strapi::query',
     'strapi::body',
     'strapi::session',
     'strapi::favicon',
     'strapi::public',
   ];
   ```

---

## Option 2: Netlify + Render

### Render (Backend)
- Free tier: 750 hours/month
- PostgreSQL included
- Auto-deploy from Git

**Setup:**
1. Sign up at https://render.com/
2. Create "Web Service" from GitHub
3. Select backend folder
4. Set build command: `npm install && npm run build`
5. Set start command: `npm run start`
6. Add PostgreSQL database
7. Configure environment variables (same as Railway)

### Netlify (Frontend)
- Unlimited bandwidth (100GB/month soft limit)
- Automatic builds
- Custom domains

**Setup:**
1. Sign up at https://netlify.com/
2. Import from GitHub
3. Set base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable: `VITE_API_URL`

---

## Option 3: GitHub Pages + Railway

### GitHub Pages (Frontend - Static Only)
- Free unlimited bandwidth
- Custom domains
- No server-side code

**Limitations:**
- Static only (no server-side rendering)
- Requires base path configuration for repo-based deployment

**Setup:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Update `frontend/vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/slayerforge/',
     // ... rest of config
   });
   ```
3. Add deploy script to `frontend/package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
4. Run: `npm run deploy`
5. Enable GitHub Pages in repo settings

---

## 📝 Pre-Deployment Checklist

### Backend
- [ ] Update database configuration for PostgreSQL
- [ ] Generate secure random keys for APP_KEYS, JWT_SECRET, etc.
- [ ] Update CORS configuration with frontend URL
- [ ] Configure PUBLIC_URL environment variable
- [ ] Test database connection
- [ ] Enable public permissions for Products API
- [ ] Upload product images to Strapi admin

### Frontend
- [ ] Update API URL to use environment variable
- [ ] Update all image URL references
- [ ] Create `.env.production` file
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Remove any localhost hardcoded URLs

### General
- [ ] Push all changes to GitHub
- [ ] Create `.gitignore` entries for sensitive files
- [ ] Document environment variables needed
- [ ] Test end-to-end functionality

---

## 🔐 Environment Variables Setup

### Generate Secure Keys

Run these commands to generate secure random keys:

```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Run this 5 times to generate:
# - APP_KEYS (2 keys, comma-separated)
# - API_TOKEN_SALT
# - ADMIN_JWT_SECRET
# - TRANSFER_TOKEN_SALT
# - JWT_SECRET
```

### Backend Environment Variables Template

Create this as `backend/.env.production.template`:
```env
# Server
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://your-backend-url.com

# Database (automatically provided by Railway/Render)
DATABASE_CLIENT=postgres
DATABASE_URL=<provided-by-hosting>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Security Keys (generate unique values)
APP_KEYS=<key1>,<key2>
API_TOKEN_SALT=<random-salt>
ADMIN_JWT_SECRET=<random-secret>
TRANSFER_TOKEN_SALT=<random-salt>
JWT_SECRET=<random-secret>

# CORS
CLIENT_URL=https://your-frontend-url.com
```

### Frontend Environment Variables

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/graphql
```

---

## 🗄️ Database Migration (SQLite → PostgreSQL)

Since Railway/Render use PostgreSQL, you'll need to migrate your data:

### Option 1: Import Script (Recommended)

Use the existing `import-products.js` script after deploying:
```bash
# Update backend/.env temporarily
STRAPI_URL=https://your-backend-url.com

# Run import
cd backend
node scripts/import-products.js
```

### Option 2: Manual Export/Import

1. **Export from local Strapi**
   - Login to local Strapi admin
   - Go to Settings → Transfer Tokens
   - Create export token
   - Use Strapi CLI to export:
     ```bash
     npm run strapi export -- --file backup.tar.gz
     ```

2. **Import to production**
   - Upload to production Strapi admin
   - Use import feature

### Option 3: Database Tools

For advanced users, use database migration tools:
- pgloader (SQLite → PostgreSQL)
- Database GUI tools (DBeaver, pgAdmin)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem:** Frontend can't connect to backend

**Solution:**
- Verify CORS configuration in `backend/config/middlewares.ts`
- Add frontend URL to allowed origins
- Restart backend server

#### 2. Image URLs Not Loading
**Problem:** Images show broken links

**Solution:**
```typescript
// Use environment variable for API URL
const apiUrl = import.meta.env.VITE_API_URL?.replace('/graphql', '') || 'http://localhost:1337';
const imageUrl = `${apiUrl}${product.image.url}`;
```

#### 3. GraphQL Schema Errors
**Problem:** GraphQL queries fail after deployment

**Solution:**
- Check GraphQL playground at `https://your-backend-url.com/graphql`
- Verify all content types are published
- Check API permissions in Strapi admin

#### 4. Build Failures
**Problem:** Vercel/Netlify build fails

**Solution:**
- Check build logs for errors
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`
- Check Node version compatibility

#### 5. Database Connection Issues
**Problem:** Railway/Render can't connect to database

**Solution:**
- Verify `DATABASE_URL` is set correctly
- Enable SSL: `DATABASE_SSL=true`
- Set `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
- Check database service is running

#### 6. Environment Variables Not Working
**Problem:** Variables not loading in production

**Solution:**
- Vercel: Must prefix with `VITE_`
- Railway: Restart service after adding variables
- Check spelling and capitalization
- Don't commit `.env` files to Git

---

## 📊 Deployment Comparison

| Feature | Vercel | Netlify | Railway | Render | GitHub Pages |
|---------|--------|---------|---------|--------|--------------|
| Frontend Hosting | ✅ Best | ✅ Great | ❌ | ❌ | ✅ Good |
| Backend Hosting | ❌ | ❌ | ✅ Best | ✅ Good | ❌ |
| Database | ❌ | ❌ | ✅ PostgreSQL | ✅ PostgreSQL | ❌ |
| Free SSL | ✅ | ✅ | ✅ | ✅ | ✅ |
| Custom Domain | ✅ | ✅ | ✅ | ✅ | ✅ |
| Build Minutes | Unlimited | 300/mo | N/A | 750 hrs/mo | N/A |
| Bandwidth | 100GB | 100GB | Unlimited | 100GB | Unlimited |
| Auto Deploy | ✅ | ✅ | ✅ | ✅ | Manual |
| Ease of Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

## 🚀 Quick Start Commands

### Deploy to Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy to Railway (Backend)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
cd backend
railway init

# Deploy
railway up
```

---

## 📚 Additional Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)
- [Strapi Deployment](https://docs.strapi.io/dev-docs/deployment)

### Monitoring & Analytics
- **Frontend**: Vercel Analytics (free)
- **Backend**: Railway metrics dashboard
- **Uptime**: UptimeRobot (free tier)
- **Errors**: Sentry (free tier)

### Custom Domains
1. **Vercel**: Settings → Domains → Add Domain
2. **Railway**: Settings → Domains → Add Custom Domain
3. **DNS Setup**: Point CNAME to hosting provider

---

## 💡 Pro Tips

1. **Use Git Branches**
   - `main` → Production
   - `develop` → Staging
   - Feature branches for development

2. **Environment-Specific Configs**
   - `.env.development` (local)
   - `.env.production` (live)
   - Never commit `.env` files!

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Enable analytics (Vercel Analytics)
   - Monitor uptime (UptimeRobot)

4. **Backups**
   - Export Strapi content regularly
   - Use Railway's database backups
   - Keep backup of products.json

5. **Performance**
   - Enable Vercel's Edge Network
   - Use image optimization
   - Implement caching headers
   - Consider CDN for media files

---

## 🎉 Next Steps After Deployment

1. **Test Everything**
   - [ ] Browse all pages
   - [ ] Add products to cart
   - [ ] Test checkout flow
   - [ ] Verify images load
   - [ ] Test on mobile

2. **Set Up Custom Domain** (Optional)
   - Purchase domain (Namecheap, GoDaddy)
   - Configure DNS
   - Add to Vercel/Railway

3. **Add Monitoring**
   - Set up UptimeRobot
   - Configure Sentry for errors
   - Enable Vercel Analytics

4. **Optimize Performance**
   - Run Lighthouse audit
   - Optimize images
   - Add meta tags for SEO

5. **Share Your App** 🎊
   - Share URL with team
   - Add to portfolio
   - Submit to showcases

---

## ✅ Deployment Complete!

Your SlayerForge app is now live! 🎉

**Frontend**: `https://your-app.vercel.app`  
**Backend Admin**: `https://your-backend.railway.app/admin`  
**API**: `https://your-backend.railway.app/graphql`

---

**Need Help?**
- Railway Community: https://discord.gg/railway
- Vercel Community: https://github.com/vercel/vercel/discussions
- Strapi Discord: https://discord.strapi.io

**Document Version:** 1.0  
**Last Updated:** October 17, 2025  
**Estimated Setup Time:** 30-45 minutes
