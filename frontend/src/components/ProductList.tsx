import React from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import { ProductCard } from './ProductCard';
import type { Product, ProductsResponse } from '../types.ts';

const GET_PRODUCTS = gql`
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
`;

interface ProductListProps {
  featured?: boolean;
  limit?: number;
  category?: string;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  featured = false, 
  limit = 20,
  category
}) => {
  const { loading, error, data } = useQuery<ProductsResponse>(GET_PRODUCTS);

  if (loading) {
    return (
      <div className="space-y-6">
        {featured && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              ⚔️ Featured Products
            </h2>
            <p className="text-gray-300">
              Legendary weapons and gear chosen by the Hashira
            </p>
          </div>
        )}
        
        <div className="text-center py-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              🔄 Loading Products...
            </h3>
            <p className="text-blue-600">
              Fetching demon slayer gear from the forge...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {featured && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              ⚔️ Featured Products
            </h2>
            <p className="text-gray-300">
              Legendary weapons and gear chosen by the Hashira
            </p>
          </div>
        )}
        
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              ⚠️ Connection Error
            </h3>
            <p className="text-red-600 mb-4">
              Could not connect to the product database
            </p>
            <p className="text-sm text-gray-600">
              Error: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const products = data?.products || [];
  
  // Filter by category if specified
  let filteredProducts = category 
    ? products.filter((product: Product) => product.category?.toLowerCase() === category.toLowerCase())
    : products;

  // Filter featured products if requested
  if (featured) {
    filteredProducts = filteredProducts.filter((product: Product) => product.featured);
  }

  // Apply limit
  const displayProducts = filteredProducts.slice(0, limit);

  return (
    <div className="space-y-6">
      {featured && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            ⚔️ Featured Products
          </h2>
          <p className="text-gray-300">
            Legendary weapons and gear chosen by the Hashira
          </p>
        </div>
      )}
      
      {displayProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              📦 No Products Found
            </h3>
            <p className="text-yellow-600">
              {category ? `No products found in category: ${category}` : 'No products available at the moment'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product: Product) => (
            <ProductCard 
              key={product.documentId}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};