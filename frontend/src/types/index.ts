export interface Product {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description: string | Array<{ type: string; children: Array<{ type: string; text: string }> }>;
    price: number;
    category: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    weaponType?: string;
    breathingStyle?: string;
    specifications?: string;
    featured: boolean;
    inStock: boolean;
    stockCount: number;
    imageUrl?: string;
    imageAlt?: string;
    image?: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
          width: number;
          height: number;
        };
      };
    };
    gallery?: {
      data: Array<{
        attributes: {
          url: string;
          alternativeText: string;
          width: number;
          height: number;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductsResponse {
  products: {
    data: Product[];
    meta: {
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
      };
    };
  };
}

export interface ProductResponse {
  product: {
    data: Product;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface SearchFilters {
  category?: string;
  weaponType?: string;
  breathingStyle?: string;
  minPrice?: number;
  maxPrice?: number;
  rarity?: string[];
}