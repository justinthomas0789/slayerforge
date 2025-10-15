import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import type { Product } from '../types.ts';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/Badge';

const GET_PRODUCT = gql`
  query GetProduct($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      name
      price
      category
      featured
      inStock
      createdAt
      description
      rarity
      weaponType
      breathingStyle
      stockCount
      image {
        url
        alternativeText
      }
    }
  }
`;

interface ProductResponse {
  product: Product;
}

export const ProductDetail: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  const { loading, error, data } = useQuery<ProductResponse>(GET_PRODUCT, {
    variables: { documentId },
    skip: !documentId,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getRarityColor = (rarity: string = 'common') => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'bg-yellow-500 text-yellow-900';
      case 'epic': return 'bg-purple-500 text-purple-900';
      case 'rare': return 'bg-blue-500 text-blue-900';
      case 'uncommon': return 'bg-green-500 text-green-900';
      case 'common': return 'bg-gray-500 text-gray-900';
      default: return 'bg-gray-500 text-gray-900';
    }
  };

  const getImageUrl = (product: Product) => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    if (product.image?.url) {
      return `http://localhost:1337${product.image.url}`;
    }
    return 'https://via.placeholder.com/600x600?text=No+Image';
  };

  const handleAddToCart = () => {
    if (data?.product) {
      addToCart(data.product, quantity);
      // Optionally show a success message or navigate to cart
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            ⚠️ Product Not Found
          </h3>
          <p className="text-red-600 mb-4">
            {error?.message || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const product = data.product;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 text-red-600 hover:text-red-700 font-medium flex items-center"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={getImageUrl(product)}
            alt={product.image?.alternativeText || product.name}
            className="w-full rounded-lg shadow-lg"
          />
          {product.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="warning" className="text-lg">⭐ Featured</Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <Badge variant="destructive" className="text-2xl">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            {product.breathingStyle && (
              <p className="text-xl text-indigo-600 font-medium">
                {product.breathingStyle.charAt(0).toUpperCase() + product.breathingStyle.slice(1)} Breathing
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>
            {product.rarity && (
              <Badge className={getRarityColor(product.rarity)}>
                {product.rarity.toUpperCase()}
              </Badge>
            )}
            {product.weaponType && (
              <Badge variant="outline" className="text-sm">
                {product.weaponType}
              </Badge>
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-red-600">
                {formatPrice(product.price)}
              </span>
              {product.inStock && product.stockCount && (
                <span className="text-sm text-gray-500">
                  {product.stockCount} in stock
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={!product.inStock}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300 py-2"
                  min="1"
                  max={product.stockCount || 100}
                  disabled={!product.inStock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount || 100, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {product.inStock && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>In Stock - Ready to Ship</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
