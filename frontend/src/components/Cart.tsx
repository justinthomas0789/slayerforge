import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/Badge';
import { Header } from './Header';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeFromCart, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getImageUrl = (item: typeof state.items[0]) => {
    const product = item.product;
    if (product.imageUrl) {
      return product.imageUrl;
    }
    if (product.image?.url) {
      return `http://localhost:1337${product.image.url}`;
    }
    return 'https://via.placeholder.com/100x100?text=No+Image';
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some legendary items to your cart and start your journey!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">🛒 Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.product.documentId}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              {/* Product Image */}
              <img
                src={getImageUrl(item)}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {item.product.name}
                </h3>
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.product.category}
                  </Badge>
                  {item.product.rarity && (
                    <Badge variant="outline" className="text-xs">
                      {item.product.rarity}
                    </Badge>
                  )}
                </div>
                <p className="text-xl font-bold text-red-600">
                  {formatPrice(item.product.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.product.documentId)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  ✕ Remove
                </button>

                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => updateQuantity(item.product.documentId, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.documentId, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  Subtotal: {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(state.total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
