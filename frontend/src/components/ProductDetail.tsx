import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/Badge';
import { Header } from './Header';
import { Swords, ShoppingCart, Shield, Star, Heart, Share2, Truck, ArrowLeft, Check, Zap } from 'lucide-react';

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
      sharpness
      durability
      speed
      power
      defense
      weight
      material
      manufacturer
      aiFeature
      rarityColor
      image {
        url
        alternativeText
      }
    }
  }
`;

const GET_RELATED_PRODUCTS = gql`
  query GetRelatedProducts($category: String!) {
    products(filters: { category: { eq: $category } }, pagination: { limit: 4 }) {
      documentId
      name
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
`;

interface ProductResponse {
  product: Product;
}

interface RelatedProductsResponse {
  products: Product[];
}

const StatBar: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${color}`}>{icon}</span>
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${color.replace('text-', 'bg-')}`} style={{ width: `${value}%` }}>
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetail: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { loading, error, data } = useQuery<ProductResponse>(GET_PRODUCT, {
    variables: { documentId },
    skip: !documentId,
  });

  const { data: relatedData } = useQuery<RelatedProductsResponse>(GET_RELATED_PRODUCTS, {
    variables: { category: data?.product?.category },
    skip: !data?.product?.category,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };

  const getRarityColor = (rarity: string = 'common', customColor?: string) => {
    if (customColor) {
      return `text-white shadow-lg`;
    }
    const colors: Record<string, string> = {
      mythic: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50',
      legendary: 'bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/50',
      epic: 'bg-purple-500 text-purple-900 shadow-lg shadow-purple-500/50',
      rare: 'bg-blue-500 text-blue-900 shadow-lg shadow-blue-500/50',
      uncommon: 'bg-green-500 text-green-900 shadow-lg shadow-green-500/50',
      common: 'bg-gray-500 text-gray-900'
    };
    return colors[rarity.toLowerCase()] || colors.common;
  };

  const getImageUrl = (product: Product) => {
    if (product.imageUrl) return product.imageUrl;
    if (product.image?.url) return `http://localhost:1337${product.image.url}`;
    return 'https://via.placeholder.com/600x600?text=No+Image';
  };

  const getDescriptionText = (description: any): string => {
    if (typeof description === 'string') return description;
    if (Array.isArray(description)) {
      return description
        .map((block: any) => {
          if (block.children) {
            return block.children
              .map((child: any) => child.text || '')
              .join('');
          }
          return '';
        })
        .join('\n');
    }
    return '';
  };

  const handleAddToCart = () => {
    if (data?.product) {
      const maxStock = data.product.stockCount || 100;
      const validQuantity = Math.min(quantity, maxStock);
      
      if (quantity > maxStock) {
        alert(`Only ${maxStock} item(s) available in stock!`);
        setQuantity(maxStock);
        return;
      }
      
      addToCart(data.product, validQuantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share && data?.product) {
      navigator.share({ title: data.product.name, text: `Check out ${data.product.name} on SlayerForge!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-xl text-white font-semibold">Loading epic gear...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 backdrop-blur-md border-2 border-red-500 rounded-2xl p-8 max-w-md">
          <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            ⚠️ Equipment Not Found
          </h3>
          <p className="text-red-300 mb-6">
            {error?.message || 'The equipment you are looking for does not exist in our arsenal.'}
          </p>
          <button onClick={() => navigate('/products')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Back to Arsenal
          </button>
        </div>
      </div>
    );
  }

  const product = data.product;
  const relatedProducts = relatedData?.products?.filter(p => p.documentId !== product.documentId) || [];
  const hasStats = product.sharpness || product.durability || product.speed || product.power || product.defense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link to="/" className="text-pink-400 hover:text-pink-300">Home</Link>
          <span className="text-gray-500">/</span>
          <Link to="/products" className="text-pink-400 hover:text-pink-300">Products</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-400">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <img src={getImageUrl(product)} alt={product.image?.alternativeText || product.name} className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-yellow-900 text-lg px-4 py-2 flex items-center gap-2">
                    <Star className="h-5 w-5" fill="currentColor" />
                    Featured
                  </Badge>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <Badge className="bg-red-500 text-white text-2xl px-8 py-4">Out of Stock</Badge>
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button onClick={() => setIsFavorite(!isFavorite)} className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                  <Heart className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button onClick={handleShare} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className="bg-pink-600 text-white text-sm px-4 py-1">{product.category}</Badge>
                {product.rarity && (
                  product.rarityColor ? (
                    <span 
                      className="text-white text-sm px-4 py-1 font-bold rounded shadow-lg inline-block"
                      style={{ backgroundColor: product.rarityColor }}
                    >
                      {product.rarity.toUpperCase()}
                    </span>
                  ) : (
                    <Badge className={`${getRarityColor(product.rarity, product.rarityColor)} text-sm px-4 py-1 font-bold`}>
                      {product.rarity.toUpperCase()}
                    </Badge>
                  )
                )}
                {product.weaponType && <Badge className="bg-purple-600 text-white text-sm px-4 py-1">{product.weaponType}</Badge>}
                {product.aiFeature && (
                  <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm px-4 py-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    AI-Powered
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl font-bold text-white mb-3 leading-tight">{product.name}</h1>
              {product.breathingStyle && (
                <p className="text-2xl text-pink-400 font-semibold flex items-center gap-2">
                  <Swords className="h-6 w-6" />
                  {product.breathingStyle.charAt(0).toUpperCase() + product.breathingStyle.slice(1)} Breathing
                </p>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Price</p>
                  <span className="text-5xl font-bold text-pink-400">{formatPrice(product.price)}</span>
                </div>
                {product.inStock && product.stockCount && (
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-1">Availability</p>
                    <span className="text-xl font-semibold text-green-400">{product.stockCount} in stock</span>
                  </div>
                )}
              </div>
              {product.inStock && (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 rounded-lg px-4 py-3">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">In Stock - Ready to Ship</span>
                </div>
              )}
            </div>

            {product.aiFeature && (
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-cyan-400" />
                  AI Feature
                </h3>
                <p className="text-cyan-100 leading-relaxed">{product.aiFeature}</p>
              </div>
            )}

            {hasStats && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-pink-400" />
                  Equipment Statistics
                </h3>
                <div className="space-y-4">
                  {product.sharpness !== undefined && product.sharpness > 0 && <StatBar label="Sharpness" value={product.sharpness} icon={<Swords className="h-4 w-4" />} color="text-red-500" />}
                  {product.durability !== undefined && product.durability > 0 && <StatBar label="Durability" value={product.durability} icon={<Shield className="h-4 w-4" />} color="text-blue-500" />}
                  {product.speed !== undefined && product.speed > 0 && <StatBar label="Speed" value={product.speed} icon={<span className="text-sm">⚡</span>} color="text-yellow-500" />}
                  {product.power !== undefined && product.power > 0 && <StatBar label="Power" value={product.power} icon={<span className="text-sm">💪</span>} color="text-orange-500" />}
                  {product.defense !== undefined && product.defense > 0 && <StatBar label="Defense" value={product.defense} icon={<span className="text-sm">🛡️</span>} color="text-green-500" />}
                </div>
              </div>
            )}

            {(product.weight || product.material || product.manufacturer) && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.weight && (<div><p className="text-gray-400 text-sm">Weight</p><p className="text-white font-semibold">{product.weight}</p></div>)}
                  {product.material && (<div><p className="text-gray-400 text-sm">Material</p><p className="text-white font-semibold">{product.material}</p></div>)}
                  {product.manufacturer && (<div className="col-span-2"><p className="text-gray-400 text-sm">Manufacturer</p><p className="text-white font-semibold">{product.manufacturer}</p></div>)}
                </div>
              </div>
            )}

            {product.description && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed">{getDescriptionText(product.description)}</p>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-6">
                <span className="text-white font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-white/20 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold transition-colors" disabled={!product.inStock}>−</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 1;
                      const maxStock = product.stockCount || 100;
                      setQuantity(Math.min(Math.max(1, value), maxStock));
                    }} 
                    className="w-20 text-center bg-transparent text-white font-bold py-3 focus:outline-none" 
                    min="1" 
                    max={product.stockCount || 100} 
                    disabled={!product.inStock} 
                  />
                  <button onClick={() => setQuantity(Math.min(product.stockCount || 100, quantity + 1))} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold transition-colors" disabled={!product.inStock}>+</button>
                </div>
              </div>
              <button onClick={handleAddToCart} disabled={!product.inStock} className={`w-full font-bold py-6 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 ${addedToCart ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700'} text-white disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none shadow-lg`}>
                {addedToCart ? (<><Check className="h-6 w-6" />Added to Cart!</>) : (<><ShoppingCart className="h-6 w-6" />{product.inStock ? 'Add to Cart' : 'Out of Stock'}</>)}
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Truck className="h-8 w-8 text-pink-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">Fast & Secure Delivery</h4>
                  <p className="text-gray-300 text-sm">Free shipping on orders over ₹5,000. Express delivery available to all regions of the Demon Slayer Corps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.documentId} to={`/products/${relatedProduct.documentId}`} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square overflow-hidden">
                    <img src={getImageUrl(relatedProduct)} alt={relatedProduct.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2 group-hover:text-pink-400 transition-colors">{relatedProduct.name}</h3>
                    <p className="text-pink-400 font-bold text-lg">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
};