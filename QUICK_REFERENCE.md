# 🚀 Quick Reference Guide

## Commands Cheat Sheet

### Start Development
```bash
# Terminal 1 - Backend
cd backend
npm run develop

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Import Data
```bash
# Import 12 team members
cd backend
node import-team-graphql.js
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
npm run start
```

---

## URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:1337 |
| Admin Panel | http://localhost:1337/admin |
| GraphQL Playground | http://localhost:1337/graphql |

---

## Content Types

### Product Fields
- `name` (Text, Required)
- `description` (Rich Text)
- `price` (Number, Required)
- `category` (Text)
- `featured` (Boolean)
- `inStock` (Boolean)
- `image` (Media)

### Team Member Fields
- `name` (Text, Required)
- `role` (Text, Required)
- `breathingStyle` (Text)
- `bio` (Long Text)
- `order` (Number, Required)
- `photo` (Media)

---

## GraphQL Queries

### Get Products
```graphql
query {
  products {
    documentId
    name
    price
    category
    image { url }
  }
}
```

### Get Team Members
```graphql
query {
  teamMembers(sort: "order:asc") {
    documentId
    name
    role
    breathingStyle
    photo { url }
  }
}
```

---

## File Locations

### Frontend
- Pages: `frontend/src/App.tsx`
- Components: `frontend/src/components/`
- Cart State: `frontend/src/context/CartContext.tsx`
- GraphQL Client: `frontend/src/apollo/client.ts`
- Types: `frontend/src/types.ts`

### Backend
- Content Types: Strapi Admin → Content-Type Builder
- Media: `backend/public/uploads/`
- Config: `backend/config/`
- Import Script: `backend/import-team-graphql.js`

---

## Common Tasks

### Add Product
1. Content Manager → Product → Create
2. Fill fields, upload image
3. Save & Publish

### Add Team Member
1. Content Manager → Team member → Create
2. Fill fields, upload photo
3. Set order (1-12)
4. Save & Publish

### Set Permissions
1. Settings → Roles → Public
2. Enable: find, findOne
3. For: product, team-member
4. Save

### Update Hero Images
1. Upload to Media Library
2. Edit `frontend/src/App.tsx`
3. Update `bgImage` URLs in `heroSlides` array

---

## Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| Products not showing | Check: Published, Permissions, GraphQL query |
| Cart not working | Check: CartProvider wrapper, documentId field |
| Images not loading | Check: Uploaded, Published, URL path |
| Team members missing | Check: Content type exists, Permissions set |
| Filters not working | Check: Category field filled, ProductsPage query |

---

## Color Codes

### Brand Colors
- Pink: `#ec4899` (pink-600)
- Purple: `#a855f7` (purple-600)
- Red: `#ef4444` (red-600)
- Background: `#111827` (gray-900)

### Breathing Styles
- Flame → Pink
- Water → Purple
- Thunder → Blue
- Wind → Green
- Stone → Indigo
- Mist → Cyan
- Serpent → Yellow
- Love → Pink
- Insect → Orange
- Sound → Teal
- Moon → Red
- Sun → Violet

---

## Keyboard Shortcuts

### Development
- `Ctrl + C` - Stop server
- `npm run dev` - Start dev server
- `npm run build` - Production build

### Strapi Admin
- Create: Click "Create new entry"
- Edit: Click on entry name
- Delete: Entry options → Delete
- Publish: Save → Publish button

---

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `DOCUMENTATION.md` | Complete guide |
| `QUICK_REFERENCE.md` | This file |
| `TEAM_MEMBERS_API_GUIDE.md` | Team setup |
| `PRODUCT_FILTER_FIX.md` | Filter implementation |
| `HERO_SLIDER_ENHANCEMENT.md` | Hero slider details |

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:1337
```

### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=development
```

---

## NPM Scripts

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run develop` - Start with admin panel
- `npm run start` - Start production mode
- `npm run build` - Build admin panel
- `npm run strapi` - Strapi CLI

---

## Support Resources

- 📖 Full Docs: `DOCUMENTATION.md`
- 🎯 Strapi Docs: https://docs.strapi.io
- ⚛️ React Docs: https://react.dev
- 🎨 Tailwind Docs: https://tailwindcss.com
- 🔌 Apollo Docs: https://www.apollographql.com

---

**Quick Tip:** Keep this file bookmarked for fast reference during development! ⚔️
