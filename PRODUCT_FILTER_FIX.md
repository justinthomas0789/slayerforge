# Product Filter & Count Fix

## Issues Fixed

### 1. **Category Filters Not Working**
**Problem:** Category buttons were hardcoded and didn't filter products when clicked.

**Solution:**
- Added `useState` to track selected category
- Added `useQuery` to fetch all products and calculate category counts dynamically
- Added `onClick` handlers to category buttons
- Pass `category` prop to `ProductList` component
- Added visual indication (pink background) for active category

### 2. **Wrong Product Counts**
**Problem:** Category counts were hardcoded strings like '20+', '8', '6', etc.

**Solution:**
- Dynamically calculate counts from actual product data
- Use `reduce()` to count products per category
- Display real-time counts for each category
- "All Items" shows total product count

## Changes Made

### App.tsx - ProductsPage Component

```typescript
// Added imports
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import type { ProductsResponse } from './types';

// Added state and query
const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
const { data } = useQuery<ProductsResponse>(gql`
  query GetProducts {
    products {
      documentId
      category
    }
  }
`);

// Calculate real category counts
const products = data?.products || [];
const categoryCounts = products.reduce((acc: Record<string, number>, product) => {
  const category = product.category || 'Uncategorized';
  acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});

// Build dynamic categories array
const categories = [
  { name: 'All Items', value: undefined, count: products.length },
  ...Object.keys(categoryCounts).sort((a, b) => a.localeCompare(b)).map(cat => ({
    name: cat,
    value: cat,
    count: categoryCounts[cat]
  }))
];
```

### Category Buttons
- Added `onClick={() => setSelectedCategory(category.value)}`
- Added active state styling with pink background
- Real counts displayed from actual data

### ProductList Component
- Updated to accept `category` prop
- Increased limit to 100 to show all filtered products
- `<ProductList category={selectedCategory} limit={100} />`

## How It Works Now

1. **On page load:** Query fetches all products and their categories
2. **Count calculation:** Automatically counts products in each category
3. **Dynamic categories:** Categories are built from actual product data (sorted alphabetically)
4. **Click to filter:** Clicking a category button filters the product list
5. **Visual feedback:** Active category has pink background
6. **Real-time counts:** Shows accurate product counts per category

## User Experience

- ✅ Click "All Items" - Shows all products with total count
- ✅ Click "Swords" - Shows only sword products with accurate count
- ✅ Click "Armor" - Shows only armor products with accurate count
- ✅ Active category highlighted in pink
- ✅ Smooth transitions and hover effects
- ✅ Responsive layout

## Testing

Visit: **http://localhost:5173/products**

1. Check category counts match actual products
2. Click each category button
3. Verify products filter correctly
4. Confirm active button styling changes
5. Test "All Items" shows everything

## Benefits

- 🎯 **Dynamic:** Automatically updates when products change in Strapi
- 📊 **Accurate:** Shows real product counts, not hardcoded values
- 🔄 **Scalable:** New categories appear automatically
- 💅 **UX:** Clear visual feedback for selected category
- ⚡ **Performance:** Single query for all category data
