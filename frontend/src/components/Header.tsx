import React from 'react';
import { Link } from 'react-router-dom';
import { Swords, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { state } = useCart();
  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <Swords className="h-8 w-8 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold text-white">SlayerForge</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-white hover:text-pink-400 transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-pink-400 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link to="/cart" className="relative p-2 text-white hover:text-pink-400 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
