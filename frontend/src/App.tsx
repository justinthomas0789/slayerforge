import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import { apolloClient } from './apollo/client';
import { CartProvider, useCart } from './context/CartContext';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { About } from './components/About';
import { Swords, ShoppingCart, Star, Zap, Shield, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ProductsResponse } from './types';

// Enhanced HomePage with animations
function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { state } = useCart();
  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Forge Your Destiny",
      subtitle: "Master the art of demon slaying with legendary Nichirin blades",
      bgGradient: "from-red-600/70 via-pink-600/70 to-purple-600/70",
      bgImage: "http://localhost:1337/uploads/demon_slayer_5120x2880_17629_c95156e247.jpg" // Samurai sword theme
    },
    {
      title: "Join the Corps",
      subtitle: "Authentic uniforms and gear worn by the greatest slayers",
      bgGradient: "from-blue-600/70 via-indigo-600/70 to-purple-600/70",
      bgImage: "http://localhost:1337/uploads/tanjiro_kamado_5120x2880_18381_ad36ad4134.jpg" // Japanese warrior theme
    },
    {
      title: "Breathe and Conquer",
      subtitle: "Learn ancient techniques from exclusive training manuals",
      bgGradient: "from-green-600/70 via-teal-600/70 to-blue-600/70",
      bgImage: "http://localhost:1337/uploads/demon_slayer_5120x2880_22988_453e130844.jpg" // Japanese temple/zen theme
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation Bar */}
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

      {/* Hero Section with Slideshow */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative h-[70vh] flex items-center justify-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].bgImage})`,
            }}
          />
          
          {/* Animated Gradient Overlay with Transparency */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} transition-all duration-1000 backdrop-blur-[2px]`}
          />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center mb-8">
                <Swords className="h-20 w-20 text-white mr-6 animate-pulse" />
                <h1 className="text-7xl font-bold text-white drop-shadow-2xl">
                  SlayerForge
                </h1>
                <Swords className="h-20 w-20 text-white ml-6 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-semibold text-white mb-4 transition-all duration-500">
                {heroSlides[currentSlide].title}
              </h2>
              
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/products"
                  className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center"
                >
                  <span>Explore Arsenal</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <span>About Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 bg-gray-900/50 backdrop-blur-sm transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose SlayerForge?
            </h2>
            <p className="text-xl text-gray-300">
              The trusted source for authentic demon slayer equipment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Swords, title: 'Authentic Gear', desc: 'Genuine Nichirin blades and equipment', color: 'text-red-400' },
              { icon: Shield, title: 'Corps Certified', desc: 'Official Demon Slayer Corps approved', color: 'text-blue-400' },
              { icon: Zap, title: 'Fast Delivery', desc: 'Express shipping to all regions', color: 'text-yellow-400' },
              { icon: Star, title: 'Premium Quality', desc: 'Legendary-grade materials only', color: 'text-purple-400' }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl border border-white/10 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className={`py-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              ⚔️ Featured Arsenal
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Legendary weapons and gear chosen by the Hashira
            </p>
            <Link
              to="/products"
              className="inline-flex items-center text-pink-400 hover:text-pink-300 font-semibold text-lg group"
            >
              <span>View All Products</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          <ProductList featured={true} limit={8} />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-pink-600 via-red-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of demon slayers who trust SlayerForge for their equipment needs.
            Your destiny awaits.
          </p>
          <Link
            to="/products"
            className="group bg-white text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center"
          >
            <span>Start Shopping</span>
            <Swords className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const { state } = useCart();
  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data } = useQuery<ProductsResponse>(gql`
    query GetProducts {
      products {
        documentId
        category
      }
    }
  `);

  // Calculate category counts
  const products = data?.products || [];
  const categoryCounts = products.reduce((acc: Record<string, number>, product: { category?: string }) => {
    const category = product.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categories = [
    { name: 'All Items', value: undefined, count: products.length },
    ...Object.keys(categoryCounts).sort((a, b) => a.localeCompare(b)).map(cat => ({
      name: cat,
      value: cat,
      count: categoryCounts[cat]
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation Bar (same as homepage) */}
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
                className="text-pink-400 font-medium border-b-2 border-pink-400"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                to="/" 
                className="text-white hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                Home
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-bold text-white mb-4">
              🗡️ Complete Arsenal
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Browse our complete collection of demon slayer gear, from legendary Nichirin blades 
              to authentic Corps uniforms and mystical protection charms.
            </p>
          </div>
        </div>
      </div>
      
      {/* Product Categories Filter */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.value)}
                className={`group px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                  selectedCategory === category.value
                    ? 'bg-pink-600 text-white border-pink-400'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-pink-400'
                }`}
              >
                <span className="font-semibold">{category.name}</span>
                <span className={`ml-2 text-sm ${
                  selectedCategory === category.value ? 'text-pink-200' : 'text-pink-400'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <ProductList category={selectedCategory} limit={100} />
      </div>

      {/* Back to Top */}
      <div className="text-center pb-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          ↑ Back to Top
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <ApolloProvider client={apolloClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:documentId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </ApolloProvider>
      </CartProvider>
    </Router>
  );
}

export default App
