# 🚀 Quick Deployment Guide

## Free Hosting (Recommended)

### ⚡ Fast Track (15 minutes)

**Backend:** Railway (Free)  
**Frontend:** Vercel (Free)  
**Total Cost:** $0/month

---

## 🎯 Step-by-Step

### 1️⃣ Deploy Backend (Railway)

1. **Sign up:** https://railway.app (use GitHub)

2. **Create Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `slayerforge` repo
   - ⚠️ **IMPORTANT:** After creating the project, go to Settings → Service → Root Directory and set it to `backend`

3. **Add Database:**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway auto-configures connection

4. **Set Environment Variables:**
   ```bash
   # Run this to generate keys:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   
   Add these to Railway:
   ```
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   DATABASE_CLIENT=postgres
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   APP_KEYS=<key1>,<key2>
   API_TOKEN_SALT=<salt>
   ADMIN_JWT_SECRET=<secret>
   TRANSFER_TOKEN_SALT=<salt>
   JWT_SECRET=<secret>
   ```

5. **Deploy** → Wait 3-5 minutes

6. **Get your Railway URL:** (e.g., `https://your-app.railway.app`)

---

### 2️⃣ Deploy Frontend (Vercel)

1. **Sign up:** https://vercel.com (use GitHub)

2. **Import Project:**
   - Click "New Project"
   - Import `slayerforge` repo
   - Root Directory: `frontend`
   - Framework: Vite (auto-detected)

3. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.railway.app/graphql
   ```

4. **Deploy** → Wait 2-3 minutes

5. **Get your Vercel URL:** (e.g., `https://your-app.vercel.app`)

---

### 3️⃣ Update Backend CORS

In Railway dashboard, add:
```
CLIENT_URL=https://your-app.vercel.app
```

Redeploy backend (Railway auto-deploys on env var change)

---

### 4️⃣ Import Products

1. Visit your Railway app: `https://your-backend.railway.app/admin`
2. Create admin account
3. Update local `backend/.env`:
   ```
   STRAPI_URL=https://your-backend.railway.app
   ```
4. Run import:
   ```bash
   cd backend
   node scripts/import-products.js
   ```

---

## ✅ Done!

Your app is now live! 🎉

- **Frontend:** https://your-app.vercel.app
- **Backend Admin:** https://your-backend.railway.app/admin
- **API:** https://your-backend.railway.app/graphql

---

## 🔧 Troubleshooting

### CORS Error
- Add frontend URL to `CLIENT_URL` in Railway
- Restart backend service

### Images Not Loading
- Check image URLs in Strapi admin
- Verify `VITE_API_URL` in Vercel

### Build Fails
- Check build logs in Vercel/Railway
- Verify all dependencies in `package.json`
- Test locally: `npm run build`

---

## 📚 Full Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Alternative hosting options
- Custom domains
- Database migration
- Advanced configuration
- Monitoring setup

---

## 💡 Helper Script

Run the deployment helper:
```powershell
.\deploy.ps1
```

This will:
- Generate secure keys
- Check git status
- Provide deployment checklist

---

## 🆘 Need Help?

- **Full Guide:** Read `DEPLOYMENT_GUIDE.md`
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Strapi Deployment:** https://docs.strapi.io/dev-docs/deployment

---

**Estimated Time:** 15-20 minutes  
**Cost:** $0/month (free tier)  
**Difficulty:** ⭐⭐⭐ (Easy)
