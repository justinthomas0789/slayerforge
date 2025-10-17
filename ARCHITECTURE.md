# SlayerForge - Application Architecture Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Design Patterns & Principles](#design-patterns--principles)
4. [Component Architecture](#component-architecture)
5. [Data Flow Architecture](#data-flow-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Why This Architecture?](#why-this-architecture)
9. [Advantages](#advantages)
10. [Trade-offs & Considerations](#trade-offs--considerations)
11. [Prompt Description](#prompt-description)

---

## Architecture Overview

SlayerForge follows a **modern JAMstack architecture** with a **headless CMS backend** and a **component-based reactive frontend**. The application is built as a decoupled full-stack e-commerce platform with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   React 18 + TypeScript + Vite (Frontend)              │ │
│  │   - Component-based UI                                  │ │
│  │   - Apollo Client (GraphQL)                             │ │
│  │   - Context API for State Management                    │ │
│  │   - React Router for Navigation                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/GraphQL
┌─────────────────────────────────────────────────────────────┐
│                         API Layer                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   Strapi 5 CMS (Headless Backend)                      │ │
│  │   - GraphQL API                                         │ │
│  │   - REST API                                            │ │
│  │   - Content Type Builder                                │ │
│  │   - Media Library                                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ ORM
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   SQLite Database                                       │ │
│  │   - Products, Categories, Team Members                  │ │
│  │   - Media Files & Metadata                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Stack
- **React 18.3** - Component-based UI library with concurrent features
- **TypeScript 5.6** - Type safety and enhanced developer experience
- **Vite 6.0** - Next-generation frontend build tool (fast HMR)
- **Apollo Client 3.x** - GraphQL client with caching and state management
- **React Router 7.1** - Client-side routing and navigation
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend Stack
- **Strapi 5.7.0** - Headless CMS with GraphQL support
- **Node.js 22.12.0** - JavaScript runtime
- **SQLite** - Embedded relational database
- **GraphQL** - Query language for API

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

---

## Design Patterns & Principles

### 1. **Headless CMS Pattern**
**What:** Separation of content management (backend) from presentation (frontend).

**Why:**
- Content can be consumed by multiple clients (web, mobile, IoT)
- Frontend and backend can be developed, deployed, and scaled independently
- Technology flexibility - can swap frontend framework without touching backend

**Implementation:**
```
Strapi (Backend) ←→ GraphQL API ←→ React (Frontend)
```

### 2. **Component-Based Architecture**
**What:** UI broken down into reusable, composable components with single responsibilities.

**Why:**
- Reusability reduces code duplication
- Easier testing and maintenance
- Clear separation of concerns
- Better collaboration between developers

**Implementation:**
```
src/components/
├── Header.tsx              # Common navigation (DRY principle)
├── ProductCard.tsx         # Reusable product display
├── ProductDetail.tsx       # Detailed product view
├── ProductList.tsx         # Product grid with filtering
├── Cart.tsx               # Shopping cart management
├── Checkout.tsx           # Checkout flow
└── ui/
    └── Badge.tsx          # Reusable UI component
```

### 3. **Context API Pattern (State Management)**
**What:** React Context API for global state management without prop drilling.

**Why:**
- Built-in React solution (no external library)
- Lightweight for small to medium apps
- Type-safe with TypeScript
- Avoids prop drilling through multiple component levels

**Implementation:**
```typescript
// CartContext provides global cart state
<CartProvider>
  <App />
</CartProvider>

// Any component can access cart
const { state, addToCart, removeFromCart } = useCart();
```

### 4. **GraphQL with Apollo Client Pattern**
**What:** Declarative data fetching with client-side caching.

**Why:**
- Request exactly the data you need (no over-fetching)
- Single endpoint for all queries
- Automatic caching reduces network requests
- Type-safe with TypeScript
- Real-time subscriptions support (future enhancement)

**Implementation:**
```typescript
const GET_PRODUCTS = gql`
  query GetProducts {
    products(pagination: { limit: 100 }) {
      documentId
      name
      price
      stockCount
      # ... only fields we need
    }
  }
`;

const { data, loading, error } = useQuery(GET_PRODUCTS);
```

### 5. **Container/Presentational Pattern**
**What:** Separation of business logic (containers) from presentation (components).

**Why:**
- Components focus on UI rendering
- Logic is testable independently
- Better reusability of presentational components

**Implementation:**
```typescript
// ProductDetail.tsx (Container)
- Fetches data with GraphQL
- Manages state (quantity, favorites)
- Handles business logic (cart operations)

// StatBar component (Presentational)
- Pure component for displaying stats
- Receives data via props
- No business logic
```

### 6. **Custom Hooks Pattern**
**What:** Extracting component logic into reusable hooks.

**Why:**
- Logic reuse across components
- Cleaner component code
- Easier testing
- Follows React best practices

**Implementation:**
```typescript
// useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### 7. **Repository Pattern (Strapi)**
**What:** Abstraction layer between application and data access.

**Why:**
- Database operations are abstracted
- Easy to switch databases
- Consistent API for CRUD operations

**Implementation:**
```javascript
// Strapi handles all database operations
// Frontend only calls GraphQL API
```

### 8. **Schema-First Design**
**What:** Define data structure before implementation.

**Why:**
- Clear contract between frontend and backend
- Type safety across the stack
- Better documentation
- Easier validation

**Implementation:**
```json
// backend/src/api/product/content-types/product/schema.json
{
  "attributes": {
    "name": { "type": "string", "required": true },
    "price": { "type": "decimal", "required": true },
    "stockCount": { "type": "integer", "default": 0 },
    // ...
  }
}
```

### 9. **Atomic Design Principles**
**What:** Building components from smallest to largest (atoms → molecules → organisms → templates → pages).

**Why:**
- Systematic approach to component design
- Reusability at every level
- Consistent design system

**Implementation:**
```
Atoms: Badge, Button
Molecules: StatBar, ProductCard
Organisms: ProductList, Header
Templates: Product page layout
Pages: HomePage, ProductsPage
```

### 10. **Single Responsibility Principle (SOLID)**
**What:** Each component/function does one thing well.

**Why:**
- Easier to understand and maintain
- Reduces coupling
- Improves testability

**Examples:**
- `Header.tsx` - Only handles navigation
- `ProductCard.tsx` - Only displays product summary
- `Cart.tsx` - Only manages cart display and operations

---

## Component Architecture

### Component Hierarchy

```
App
├── CartProvider (Context)
│   ├── ApolloProvider (GraphQL Client)
│   │   └── Router
│   │       ├── HomePage
│   │       │   ├── Header
│   │       │   ├── Hero Section
│   │       │   ├── Featured Products (ProductList)
│   │       │   └── Category Showcase
│   │       │
│   │       ├── ProductsPage
│   │       │   ├── Header
│   │       │   ├── Category Filter
│   │       │   └── ProductList
│   │       │       └── ProductCard (multiple)
│   │       │
│   │       ├── ProductDetail
│   │       │   ├── Header
│   │       │   ├── Product Image Gallery
│   │       │   ├── Product Info
│   │       │   │   ├── Badges (rarity, AI-powered)
│   │       │   │   ├── StatBar (multiple)
│   │       │   │   └── Add to Cart Controls
│   │       │   └── Related Products
│   │       │
│   │       ├── Cart
│   │       │   ├── Header
│   │       │   ├── Cart Items List
│   │       │   └── Order Summary
│   │       │
│   │       ├── Checkout
│   │       │   ├── Header
│   │       │   ├── Checkout Form
│   │       │   └── Order Summary
│   │       │
│   │       └── About
│   │           ├── Header
│   │           └── Team Members Grid
```

### Component Communication

```
Parent Component
    ↓ Props
Child Component
    ↓ Events (callbacks)
Parent Component

Context Provider (Global State)
    ↓ useContext hook
Any Component in Tree
```

---

## Data Flow Architecture

### Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User Action (Click Add to Cart)                     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. Component Handler (handleAddToCart)                  │
│     - Validates stock                                    │
│     - Checks existing cart quantity                      │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. Context Action (addToCart)                           │
│     - Dispatches action to reducer                       │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. Reducer Updates State                                │
│     - Immutable state update                             │
│     - Returns new state object                           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  5. Context Provides New State                           │
│     - All subscribed components re-render                │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  6. UI Updates (Cart count badge, cart page)            │
└─────────────────────────────────────────────────────────┘
```

### GraphQL Data Flow

```
┌─────────────────────────────────────────────────────────┐
│  Component Mount / User Action                           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Apollo Client Check Cache                               │
│  - Cache hit? Return cached data                         │
│  - Cache miss? Make network request                      │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  GraphQL Query to Strapi                                 │
│  POST /graphql                                           │
│  { query: "{ products { name price } }" }               │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Strapi Resolves Query                                   │
│  - Validates query against schema                        │
│  - Fetches from database (SQLite)                        │
│  - Applies permissions & filters                         │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Response Returns to Apollo Client                       │
│  - Updates cache                                         │
│  - Triggers component re-render                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Component Renders with Data                             │
└─────────────────────────────────────────────────────────┘
```

---

## Backend Architecture

### Strapi Content Types Structure

```
┌─────────────────────────────────────────────────────────┐
│                      Product                             │
│  - documentId (ID)                                       │
│  - name (String)                                         │
│  - price (Decimal)                                       │
│  - description (RichText - Blocks format)                │
│  - category (Enum)                                       │
│  - rarity (Enum)                                         │
│  - rarityColor (String - Hex color)                      │
│  - weaponType (Enum)                                     │
│  - breathingStyle (Enum)                                 │
│  - stockCount (Integer)                                  │
│  - inStock (Boolean)                                     │
│  - featured (Boolean)                                    │
│  - Stats:                                                │
│    • sharpness (Integer 0-100)                          │
│    • durability (Integer 0-100)                         │
│    • speed (Integer 0-100)                              │
│    • power (Integer 0-100)                              │
│    • defense (Integer 0-100)                            │
│  - weight (Decimal)                                      │
│  - material (String)                                     │
│  - manufacturer (String)                                 │
│  - aiFeature (Text)                                      │
│  - image (Media)                                         │
│  - slug (UID)                                            │
│  - createdAt, updatedAt (Timestamps)                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    Team Member                           │
│  - documentId (ID)                                       │
│  - name (String)                                         │
│  - role (String)                                         │
│  - breathingStyle (String)                               │
│  - bio (Text)                                            │
│  - order (Integer - for sorting)                         │
│  - photo (Media)                                         │
└─────────────────────────────────────────────────────────┘
```

### Strapi Folder Structure

```
backend/
├── config/                 # Configuration files
│   ├── admin.ts           # Admin panel config
│   ├── api.ts             # API configuration
│   ├── database.ts        # Database connection
│   ├── middlewares.ts     # Middleware stack
│   └── server.ts          # Server configuration
│
├── src/
│   ├── api/               # API endpoints
│   │   ├── product/
│   │   │   ├── content-types/
│   │   │   │   └── product/
│   │   │   │       └── schema.json  # Product schema definition
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   │
│   │   └── team-member/
│   │       └── content-types/
│   │           └── team-member/
│   │               └── schema.json
│   │
│   ├── extensions/        # Strapi extensions
│   │   └── graphql/      # GraphQL customizations
│   │
│   └── index.ts          # Entry point
│
├── scripts/              # Utility scripts
│   ├── import-products.js        # Product import script
│   └── delete-all-products.js   # Cleanup script
│
├── public/               # Static files
│   └── uploads/         # Media uploads
│
├── products.json        # Product data source
└── package.json
```

### API Endpoints

**GraphQL (Primary):**
```
POST http://localhost:1337/graphql

Queries:
- products(filters, pagination, sort)
- product(documentId)
- teamMembers(filters, sort)

Mutations:
- createProduct
- updateProduct
- deleteProduct
```

**REST (Alternative):**
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Frontend Architecture

### Folder Structure

```
frontend/
├── src/
│   ├── apollo/
│   │   └── client.ts          # Apollo Client configuration
│   │
│   ├── components/
│   │   ├── Header.tsx         # Common navigation component
│   │   ├── ProductCard.tsx    # Product summary display
│   │   ├── ProductDetail.tsx  # Full product page
│   │   ├── ProductList.tsx    # Product grid with filtering
│   │   ├── Cart.tsx           # Shopping cart
│   │   ├── Checkout.tsx       # Checkout flow
│   │   ├── About.tsx          # About page
│   │   └── ui/
│   │       └── Badge.tsx      # Reusable UI component
│   │
│   ├── context/
│   │   └── CartContext.tsx    # Global cart state management
│   │
│   ├── types.ts               # TypeScript type definitions
│   ├── App.tsx                # Root component with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles (Tailwind)
│
├── public/                    # Static assets
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
└── package.json
```

### State Management Structure

```typescript
// Cart State Shape
interface CartState {
  items: CartItem[];
  total: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Actions
type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

// Context Value
interface CartContextValue {
  state: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
```

### Routing Structure

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/products/:documentId" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/about" element={<About />} />
</Routes>
```

---

## Why This Architecture?

### 1. **Scalability**
- **Backend**: Strapi can scale horizontally, supports multiple databases
- **Frontend**: Component-based architecture allows incremental growth
- **API**: GraphQL reduces over-fetching, improving performance at scale
- **Deployment**: Frontend and backend can be deployed separately

### 2. **Developer Experience**
- **Hot Module Replacement**: Vite provides instant feedback during development
- **Type Safety**: TypeScript catches errors at compile time
- **Auto-generated Types**: Strapi GraphQL schema → TypeScript types
- **Modern Tooling**: ESLint, Prettier, VSCode integration

### 3. **Maintainability**
- **Separation of Concerns**: Clear boundaries between layers
- **Reusable Components**: DRY principle reduces code duplication
- **Single Source of Truth**: State management prevents inconsistencies
- **Schema-First**: Changes to schema propagate through the stack

### 4. **Flexibility**
- **Headless CMS**: Can add mobile app, IoT devices using same backend
- **Framework Agnostic**: Could swap React for Vue, Angular, Svelte
- **Database Agnostic**: Strapi supports PostgreSQL, MySQL, MongoDB
- **Deployment Agnostic**: Can deploy to Vercel, Netlify, AWS, etc.

### 5. **Performance**
- **Vite Build**: Fast builds and optimized production bundles
- **Apollo Caching**: Reduces unnecessary network requests
- **Code Splitting**: React.lazy for route-based code splitting
- **Image Optimization**: Strapi handles image transformations

### 6. **Security**
- **Strapi Permissions**: Role-based access control (RBAC)
- **CORS Configuration**: Controlled API access
- **Input Validation**: Schema validation prevents malicious data
- **Prepared Statements**: ORM prevents SQL injection

---

## Advantages

### Technical Advantages

1. **Type Safety Across Stack**
   - TypeScript in frontend
   - Strapi schema validation
   - GraphQL schema enforcement
   - Compile-time error detection

2. **Efficient Data Fetching**
   - Request only needed fields
   - Single request for complex data
   - Automatic caching
   - Optimistic UI updates

3. **Rapid Development**
   - Strapi admin panel for content management
   - Hot reloading (HMR)
   - Component reusability
   - Auto-generated API

4. **Modern Developer Experience**
   - JSX/TSX for templating
   - Component devtools
   - GraphQL Playground
   - Vite dev server

5. **Production-Ready**
   - Optimized builds
   - Tree shaking
   - Code splitting
   - Asset optimization

### Business Advantages

1. **Reduced Time-to-Market**
   - Pre-built admin interface
   - Reusable components
   - No boilerplate needed

2. **Lower Maintenance Costs**
   - Less code to maintain
   - Clear architecture
   - Type safety reduces bugs

3. **Content Team Empowerment**
   - Non-technical users can manage products
   - Visual content editor
   - Media library management

4. **Future-Proof**
   - Can add mobile apps
   - Can integrate with third-party services
   - API-first approach

5. **SEO Ready**
   - Can add SSR/SSG with Next.js
   - Semantic HTML
   - Meta tags support

---

## Trade-offs & Considerations

### What We Gained
✅ Rapid development with Strapi admin  
✅ Type safety with TypeScript  
✅ Modern, responsive UI with React  
✅ Flexible API with GraphQL  
✅ Component reusability  
✅ Scalable architecture  

### What We Traded
⚠️ **Learning Curve**: Team needs to know React, TypeScript, GraphQL, Strapi  
⚠️ **Server Required**: Not a fully static site (needs Node.js server)  
⚠️ **Bundle Size**: React + Apollo adds ~150KB to bundle  
⚠️ **Initial Setup**: More complex than WordPress or Shopify  
⚠️ **Database**: SQLite is simple but not ideal for high-traffic production  

### When This Architecture Works Best
✅ E-commerce platforms with custom requirements  
✅ Content-heavy applications  
✅ Multi-channel content delivery (web + mobile)  
✅ Projects requiring admin panel  
✅ Teams comfortable with modern JavaScript  

### When to Consider Alternatives
❌ Simple blogs → Use WordPress or static site generators  
❌ No-code requirement → Use Shopify or Webflow  
❌ Extremely high traffic → Consider Next.js + Vercel + PostgreSQL  
❌ Real-time features → Add WebSocket support or use Firebase  

---

## Prompt Description

### 🎯 **Architecture Prompt (For AI/Documentation)**

```
"Build a modern full-stack e-commerce application using:

BACKEND:
- Headless CMS: Strapi 5 with GraphQL API
- Database: SQLite for development (production-ready for PostgreSQL/MySQL)
- Content Types: Products with advanced features (stats, rarity, AI features)
- Media Management: Built-in media library for product images

FRONTEND:
- Framework: React 18 with TypeScript for type safety
- Build Tool: Vite for fast development and optimized builds
- Data Fetching: Apollo Client for GraphQL with intelligent caching
- Routing: React Router for client-side navigation
- State Management: React Context API for global cart state
- Styling: Tailwind CSS for utility-first responsive design
- Icons: Lucide React for modern icons

ARCHITECTURE PATTERNS:
1. Component-Based Architecture - Reusable, composable UI components
2. Headless CMS Pattern - Decoupled backend and frontend
3. Unidirectional Data Flow - React's one-way data binding
4. Container/Presentational Pattern - Separation of logic and UI
5. Context API Pattern - Global state without prop drilling
6. Custom Hooks Pattern - Reusable logic extraction
7. Schema-First Design - TypeScript types from GraphQL schema

KEY FEATURES:
- Product catalog with categories, filtering, and search
- Advanced product attributes (stats, rarity tiers, breathing styles)
- Shopping cart with stock validation
- Responsive design with dark theme
- Admin panel for content management (Strapi)
- Image upload and management
- Real-time cart updates across components

DESIGN PRINCIPLES:
- DRY (Don't Repeat Yourself) - Common Header component
- Single Responsibility - Each component has one job
- Type Safety - TypeScript across the stack
- Performance - Vite's HMR, Apollo caching, code splitting
- Accessibility - Semantic HTML, ARIA labels
- Maintainability - Clear folder structure, documentation

This architecture provides scalability, developer experience, type safety,
flexibility, and performance while maintaining code quality and maintainability."
```

### 📝 **Short Description**

> **"JAMstack e-commerce platform with Strapi headless CMS backend (GraphQL API) and React TypeScript frontend, featuring component-based architecture, Apollo Client for data fetching, Context API for state management, and Tailwind CSS for styling."**

### 🏗️ **Architecture Style**

> **"Modern Headless CMS Architecture with Component-Based Frontend"**

---

## Conclusion

SlayerForge's architecture represents a **modern, scalable, and maintainable** approach to building e-commerce applications. By leveraging:

- **Headless CMS (Strapi)** for flexible content management
- **GraphQL** for efficient data fetching
- **React + TypeScript** for type-safe component development
- **Apollo Client** for intelligent caching
- **Context API** for predictable state management

We've created a system that balances:
- ⚡ Performance (fast builds, optimized bundles, caching)
- 🛠️ Developer Experience (type safety, hot reload, modern tooling)
- 📈 Scalability (decoupled architecture, can add mobile apps)
- 🔧 Maintainability (clear structure, reusable components, documentation)

This architecture is **future-proof**, allowing the application to grow from a proof-of-concept to a production-ready e-commerce platform while maintaining code quality and developer productivity.

---

**Document Version:** 1.0  
**Last Updated:** October 16, 2025  
**Author:** SlayerForge Development Team  
**Architecture Style:** JAMstack with Headless CMS  
