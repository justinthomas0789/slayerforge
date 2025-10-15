# 📚 SlayerForge - Complete Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Architecture](#project-architecture)
3. [Features Documentation](#features-documentation)
4. [Setup Guide](#setup-guide)
5. [Content Management](#content-management)
6. [API Reference](#api-reference)
7. [Customization Guide](#customization-guide)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Start Backend (Terminal 1)
```bash
cd backend
npm run develop
```
✅ Backend: http://localhost:1337
✅ Admin: http://localhost:1337/admin
✅ GraphQL: http://localhost:1337/graphql

### 2. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
✅ Frontend: http://localhost:5173

### 3. First Time Setup
1. Create Strapi admin account at http://localhost:1337/admin
2. Set permissions: Settings → Roles → Public → Enable `find` & `findOne` for Product and Team-member
3. Import team members: `cd backend && node import-team-graphql.js`
4. Add products in Content Manager

---

## 🏗️ Project Architecture

### Technology Stack

**Frontend:**
- React 18 + TypeScript + Vite
- Apollo Client (GraphQL)
- React Router v6
- Tailwind CSS
- Context API (State Management)
- Lucide React (Icons)

**Backend:**
- Strapi 5 CMS
- GraphQL API
- SQLite Database (dev)
- Media Upload System

### Folder Structure
```
slayerforge/
├── frontend/
│   ├── src/
│   │   ├── apollo/client.ts          # GraphQL client config
│   │   ├── components/
│   │   │   ├── About.tsx             # Team showcase page
│   │   │   ├── Cart.tsx              # Shopping cart
│   │   │   ├── Checkout.tsx          # Checkout form
│   │   │   ├── ProductCard.tsx       # Product card UI
│   │   │   ├── ProductDetail.tsx     # Product detail page
│   │   │   └── ProductList.tsx       # Product grid
│   │   ├── context/CartContext.tsx   # Cart state management
│   │   ├── App.tsx                   # Routes & pages
│   │   ├── types.ts                  # TypeScript types
│   │   └── main.tsx                  # Entry point
│   └── package.json
│
├── backend/
│   ├── src/api/                      # API endpoints
│   ├── config/                       # Strapi config
│   ├── database/                     # SQLite DB
│   ├── public/uploads/               # Media files
│   ├── import-team-graphql.js        # Team import script
│   └── package.json
│
└── Documentation/
    ├── README.md                     # Main readme
    ├── DOCUMENTATION.md              # This file
    ├── TEAM_MEMBERS_API_GUIDE.md     # Team setup guide
    ├── PRODUCT_FILTER_FIX.md         # Filter implementation
    └── HERO_SLIDER_ENHANCEMENT.md    # Hero slider docs
```

---

## ✨ Features Documentation

### 1. Homepage

#### Animated Hero Slider
- **3 slides** with smooth transitions (4-second intervals)
- **Background images** with transparent gradient overlays (70% opacity)
- **Sparkle animations** (20 floating particles)
- **Manual controls** (dot indicators at bottom)
- **Responsive text** with drop shadows for readability

**Code Location:** `frontend/src/App.tsx` - `HomePage` component

**Customization:**
```typescript
const heroSlides = [
  {
    title: "Your Title",
    subtitle: "Your Subtitle",
    bgGradient: "from-red-600/70 via-pink-600/70 to-purple-600/70",
    bgImage: "http://localhost:1337/uploads/your-image.jpg"
  }
];
```

#### Features Section
- 4 feature cards with icons
- Hover animations (scale & lift)
- Staggered fade-in animations

#### Featured Products
- Shows 8 featured products
- Filters products where `featured = true`
- Grid layout (4 columns on desktop)

### 2. Products Page

#### Dynamic Category Filters
- **Auto-generated** from product categories in Strapi
- **Real-time counts** calculated from actual products
- **Active state** (pink background when selected)
- **Alphabetically sorted** categories

**How it works:**
1. Fetches all products via GraphQL
2. Counts products per category using `reduce()`
3. Builds category buttons dynamically
4. Filters ProductList based on selection

#### Product Grid
- Responsive: 4/3/2/1 columns (desktop/tablet/mobile/phone)
- Product cards with:
  - Image (800x800px recommended)
  - Name & price (INR format)
  - Category badge
  - Stock status
  - Add to Cart button
  - View Details link

### 3. Product Detail Page

**Features:**
- Full product information
- Large product image
- Quantity selector (1-10)
- Add to Cart with quantity
- Stock availability check
- Price in INR (₹ symbol)
- Back to Products navigation

**URL Pattern:** `/products/:documentId`

### 4. Shopping Cart

**State Management:** Context API (`CartContext.tsx`)

**Features:**
- Add items with quantity
- Update quantity (+/- buttons)
- Remove items
- Automatic price calculations
- Live cart count badge in navigation
- Empty cart state
- Continue Shopping / Checkout buttons

**Cart Persistence:** In-memory (resets on page refresh)

### 5. Checkout Page

**Form Fields:**
- Full Name (required)
- Email (required, email validation)
- Phone Number (required)
- Address (required, textarea)
- City (required)
- State (required)
- Pincode (required, 6 digits)

**Payment:** Cash on Delivery (COD) only

**Order Summary:**
- Item count
- Total amount (INR)
- Order details display

### 6. About Us Page

**Sections:**
1. **Hero Section** - Animated entrance
2. **Our Story** - Company background
3. **Our Values** - 3 value cards with icons
4. **Team Members** - Dynamic grid of 12 members
5. **Statistics** - 4 stat cards
6. **Call-to-Action** - Join team button

**Team Member Display:**
- Fetches from Strapi via GraphQL
- Sorted by `order` field
- Shows: photo, name, role, breathing style
- Color-coded breathing style badges
- Responsive grid: 4/3/2 columns
- Loading & error states

**Breathing Style Colors:**
```typescript
Flame    → Pink (#ec4899)
Water    → Purple (#a855f7)
Thunder  → Blue (#3b82f6)
Wind     → Green (#10b981)
Stone    → Indigo (#6366f1)
Mist     → Cyan (#06b6d4)
Serpent  → Yellow (#eab308)
Love     → Pink (#ec4899)
Insect   → Orange (#f97316)
Sound    → Teal (#14b8a6)
Moon     → Red (#ef4444)
Sun      → Violet (#8b5cf6)
Beast    → Gray (#6b7280)
```

### 7. Navigation

**Sticky Header** with:
- Logo (animated sword icons)
- Products link
- About link
- Home link
- Cart icon with live badge (shows total item count)
- Hover effects on all links

---

## 📝 Setup Guide

### Initial Setup (First Time)

#### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 2. Create Strapi Admin Account
1. Start backend: `npm run develop`
2. Visit http://localhost:1337/admin
3. Create your admin credentials

#### 3. Create Content Types

**Product Content Type** (should already exist):
- name (Text)
- description (Rich Text)
- price (Number - Decimal)
- category (Text)
- featured (Boolean)
- inStock (Boolean)
- image (Media - Single Image)

**Team Member Content Type** (create manually):
1. Content-Type Builder → Create collection type
2. Name: `team-member`
3. Add fields:
   - `name` (Text, Required)
   - `role` (Text, Required)
   - `breathingStyle` (Text)
   - `bio` (Long Text)
   - `order` (Number - Integer, Required)
   - `photo` (Media - Single Image)
4. Save (server restarts automatically)

#### 4. Set Permissions
1. Settings → Roles → Public
2. Enable for **Product**:
   - ✓ find
   - ✓ findOne
3. Enable for **Team-member**:
   - ✓ find
   - ✓ findOne
4. Save

#### 5. Import Team Members
```bash
cd backend
node import-team-graphql.js
```

Creates 12 team members:
- Tanjiro Kamado (Water Breathing)
- Nezuko Kamado (Blood Demon Art)
- Zenitsu Agatsuma (Thunder Breathing)
- Inosuke Hashibira (Beast Breathing)
- Giyu Tomioka (Water Hashira)
- Kyojuro Rengoku (Flame Hashira)
- Shinobu Kocho (Insect Hashira)
- Tengen Uzui (Sound Hashira)
- Mitsuri Kanroji (Love Hashira)
- Muichiro Tokito (Mist Hashira)
- Gyomei Himejima (Stone Hashira)
- Sanemi Shinazugawa (Wind Hashira)

#### 6. Add Products
1. Content Manager → Product → Create new entry
2. Fill in details
3. Upload image
4. Mark as Featured (optional)
5. Set inStock to true
6. Save and **Publish**

---

## 🛠️ Content Management

### Adding Products

**Recommended Product Structure:**
```
Name: "Nichirin Sword - Flame Pattern"
Description: "A legendary blade forged..."
Price: 25999 (will display as ₹25,999.00)
Category: "Swords"
Featured: true (shows on homepage)
InStock: true
Image: 800x800px, < 500KB
```

**Categories:**
Create products with these categories for best results:
- Swords
- Armor
- Accessories
- Techniques
- Uniforms
- Training Equipment

### Managing Team Members

**To Update Team Member:**
1. Content Manager → Team member
2. Click member name
3. Update fields
4. Upload photo (600x600px recommended)
5. Save and Publish

**To Change Display Order:**
Edit the `order` field (1-12)

### Updating Hero Images

**Upload to Strapi:**
1. Media Library → Upload files
2. Upload 3 images (1920x1080px)
3. Note the file names

**Update in Code:**
Edit `frontend/src/App.tsx`:
```typescript
const heroSlides = [
  {
    title: "Forge Your Destiny",
    subtitle: "Master the art...",
    bgGradient: "from-red-600/70 via-pink-600/70 to-purple-600/70",
    bgImage: "http://localhost:1337/uploads/hero1.jpg"
  },
  // Repeat for slides 2 & 3
];
```

---

## 🔌 API Reference

### GraphQL Queries

#### Get All Products
```graphql
query GetProducts {
  products {
    documentId
    name
    price
    category
    featured
    inStock
    createdAt
    image {
      url
      alternativeText
    }
  }
}
```

#### Get Single Product
```graphql
query GetProduct($documentId: ID!) {
  product(documentId: $documentId) {
    documentId
    name
    description
    price
    category
    featured
    inStock
    image {
      url
      alternativeText
    }
  }
}
```

#### Get Team Members
```graphql
query GetTeamMembers {
  teamMembers(sort: "order:asc") {
    documentId
    name
    role
    breathingStyle
    bio
    order
    photo {
      url
      alternativeText
    }
  }
}
```

#### Get Products by Category
```graphql
query GetProductsByCategory($category: String!) {
  products(filters: { category: { eq: $category } }) {
    documentId
    name
    price
    image {
      url
    }
  }
}
```

### REST API

**Base URL:** http://localhost:1337/api

**Endpoints:**
- `GET /products` - All products
- `GET /products/:id` - Single product
- `GET /team-members` - All team members
- `GET /team-members/:id` - Single team member
- `POST /products` - Create (auth required)
- `PUT /products/:id` - Update (auth required)
- `DELETE /products/:id` - Delete (auth required)

---

## 🎨 Customization Guide

### Changing Colors

**Primary Colors** (in Tailwind classes):
- Replace `pink-600` with your color
- Replace `purple-600` with your secondary
- Replace `red-600` with your accent

**Example:**
```tsx
// Change button color
className="bg-pink-600 hover:bg-pink-700" 
// To:
className="bg-blue-600 hover:bg-blue-700"
```

### Modifying Hero Slider

**Change slide duration:**
```typescript
const interval = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % 3);
}, 4000); // Change 4000 to desired milliseconds
```

**Adjust gradient opacity:**
```typescript
bgGradient: "from-red-600/70" // Change /70 to /50, /80, etc.
```

### Customizing Product Cards

Edit `frontend/src/components/ProductCard.tsx`

**Add discount badge:**
```tsx
{product.discount && (
  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
    {product.discount}% OFF
  </span>
)}
```

### Adding New Pages

1. **Create component:**
```tsx
// frontend/src/components/Contact.tsx
export function Contact() {
  return <div>Contact Page</div>;
}
```

2. **Add route:**
```tsx
// frontend/src/App.tsx
import { Contact } from './components/Contact';

<Route path="/contact" element={<Contact />} />
```

3. **Add navigation link:**
```tsx
<Link to="/contact">Contact</Link>
```

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)

#### 1. Build
```bash
cd frontend
npm run build
```

#### 2. Update API URL
```typescript
// frontend/src/apollo/client.ts
const apolloClient = new ApolloClient({
  uri: 'https://your-backend.com/graphql', // Production URL
  cache: new InMemoryCache(),
});
```

#### 3. Deploy
**Vercel:**
```bash
npm i -g vercel
vercel deploy
```

**Netlify:**
- Drag `frontend/dist` folder to Netlify
- Or connect GitHub repo

### Backend (Railway/Heroku)

#### 1. Change Database to PostgreSQL
```bash
npm install pg
```

#### 2. Update config
```typescript
// backend/config/database.ts
export default {
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: { rejectUnauthorized: false },
    },
  },
};
```

#### 3. Set Environment Variables
```env
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your-password
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

#### 4. Deploy
**Railway:**
- Connect GitHub repo
- Set environment variables
- Deploy automatically

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:1337
VITE_GRAPHQL_URL=http://localhost:1337/graphql
```

**Backend (.env):**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-new-key
API_TOKEN_SALT=generate-new-salt
ADMIN_JWT_SECRET=generate-new-secret
TRANSFER_TOKEN_SALT=generate-new-salt
JWT_SECRET=generate-new-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "Cannot connect to Strapi"
**Causes:**
- Backend not running
- Wrong API URL
- Permissions not set

**Solutions:**
1. Check backend: `http://localhost:1337`
2. Verify `apollo/client.ts` has correct URI
3. Settings → Roles → Public → Enable permissions

#### ❌ Products Not Showing
**Solutions:**
1. Ensure products are **Published** (not just saved)
2. Check public permissions enabled
3. Verify product has all required fields
4. Check browser console for errors

#### ❌ Cart Not Working
**Solutions:**
1. Ensure CartProvider wraps Routes in App.tsx
2. Products must have `documentId` field
3. Check CartContext for errors
4. Verify product.price exists

#### ❌ Category Filters Not Working
**Solutions:**
1. Products must have `category` field filled
2. Check ProductsPage fetches categories
3. Verify GraphQL includes `category` in query

#### ❌ Team Members Not Loading
**Solutions:**
1. Create team-member content type
2. Set permissions: find, findOne
3. Ensure entries are Published
4. Run import script: `node import-team-graphql.js`

#### ❌ Images Not Displaying
**Solutions:**
1. Check image uploaded in Strapi
2. Verify URL starts with `/uploads/`
3. Check file exists: `backend/public/uploads/`
4. For production, configure cloud storage

#### ❌ Hero Slider Not Animating
**Solutions:**
1. Check `useEffect` interval is running
2. Verify `currentSlide` state updates
3. Ensure `heroSlides` array has multiple items
4. Check browser console for errors

---

## 📊 Performance Optimization

### Image Optimization
- Use WebP format
- Compress images (TinyPNG, ImageOptim)
- Recommended sizes:
  - Products: 800x800px
  - Hero: 1920x1080px
  - Team: 600x600px

### Code Splitting
```typescript
// Lazy load components
const ProductDetail = lazy(() => import('./components/ProductDetail'));
```

### Caching
Apollo Client caches GraphQL queries automatically. Configure:
```typescript
cache: new InMemoryCache({
  typePolicies: {
    Product: {
      keyFields: ['documentId'],
    },
  },
}),
```

---

## 📈 Analytics Integration

### Google Analytics
```typescript
// Add to main.tsx
import ReactGA from 'react-ga4';
ReactGA.initialize('G-XXXXXXXXXX');
```

### Track Page Views
```typescript
useEffect(() => {
  ReactGA.send({ hitType: "pageview", page: location.pathname });
}, [location]);
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables** for sensitive data
3. **Enable CORS** properly in production
4. **Set up authentication** for admin routes
5. **Use HTTPS** in production
6. **Sanitize user inputs** in checkout form
7. **Rate limit** API endpoints

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [React Documentation](https://react.dev)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📞 Support

**Documentation Files:**
- `README.md` - Project overview
- `DOCUMENTATION.md` - This file
- `TEAM_MEMBERS_API_GUIDE.md` - Team member setup
- `PRODUCT_FILTER_FIX.md` - Filter implementation details
- `HERO_SLIDER_ENHANCEMENT.md` - Hero slider details

**For Help:**
1. Check documentation files
2. Review Strapi logs: `backend/.tmp/`
3. Check browser console
4. Review GraphQL queries in playground

---

**Version:** 1.0.0  
**Last Updated:** October 15, 2025  
**Built with:** ⚔️ Demon Slayer Spirit
