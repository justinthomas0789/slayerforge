import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types.ts';
import { Badge } from './ui/Badge';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { addToCart, state } = useCart();

  const handleCardClick = () => {
    navigate(`/products/${product.documentId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    if (onAddToCart) {
      onAddToCart();
    } else {
      const maxStock = product.stockCount || 100;
      
      // Check current quantity in cart
      const currentCartItem = state.items.find(item => item.product.documentId === product.documentId);
      const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;
      
      if (maxStock < 1) {
        alert('This item is out of stock!');
        return;
      }
      
      if (currentQuantity >= maxStock) {
        alert(`You already have the maximum available quantity (${maxStock}) in your cart!`);
        return;
      }
      
      addToCart(product, 1);
    }
  };

  // Get image URL - prefer imageUrl, fallback to Strapi image, then placeholder
  const getImageUrl = () => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    if (product.image?.url) {
      return `http://localhost:1337${product.image.url}`;
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  const getImageAlt = () => {
    return product.imageAlt || product.image?.alternativeText || product.name;
  };

  const getDescriptionText = () => {
    if (product.description) {
      return product.description;
    }
    return 'No description available';
  };

  const getRarityColor = (rarity: string = 'common') => {
    switch (rarity.toLowerCase()) {
      case 'mythic': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'legendary': return 'bg-yellow-500 text-yellow-900';
      case 'epic': return 'bg-purple-500 text-purple-900';
      case 'rare': return 'bg-blue-500 text-blue-900';
      case 'uncommon': return 'bg-green-500 text-green-900';
      case 'common': return 'bg-gray-500 text-gray-900';
      default: return 'bg-gray-500 text-gray-900';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageUrl()}
          alt={getImageAlt()}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="warning">Featured</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {product.rarityColor ? (
            <span 
              className="px-3 py-1 rounded text-sm font-bold text-white shadow-lg"
              style={{ backgroundColor: product.rarityColor }}
            >
              {(product.rarity || 'common').toUpperCase()}
            </span>
          ) : (
            <Badge className={getRarityColor(product.rarity)}>
              {(product.rarity || 'common').toUpperCase()}
            </Badge>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.breathingStyle && (
            <p className="text-sm text-indigo-600 font-medium">
              {product.breathingStyle.charAt(0).toUpperCase() + product.breathingStyle.slice(1)} Breathing
            </p>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {getDescriptionText()}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.inStock && (
            <span className="text-sm text-gray-500">
              {product.stockCount || 0} in stock
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          {product.weaponType && (
            <Badge variant="outline" className="text-xs">
              {product.weaponType}
            </Badge>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};