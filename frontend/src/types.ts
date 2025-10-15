// Product types for Strapi GraphQL API
export interface Product {
  documentId: string;
  name: string;
  price: number;
  category: string;
  featured?: boolean;
  inStock?: boolean;
  createdAt: string;
  // Additional fields that might be available
  description?: string;
  rarity?: string;
  weaponType?: string;
  breathingStyle?: string;
  stockCount?: number;
  imageUrl?: string;
  imageAlt?: string;
  // Image field from Strapi media
  image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface ProductsResponse {
  products: Product[];
}

// Legacy Strapi product structure for ProductCard compatibility
export interface LegacyProduct {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    price: number;
    category: string;
    rarity?: string;
    featured?: boolean;
    inStock?: boolean;
    stockCount?: number;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
    imageAlt?: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}