// src/pages/Home.jsx - Dashboard Dark Theme Design
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard-theme.css";
import Testimonials from "../components/Testimonials";
import { useCart } from "../CartContext";
import allProducts from "../data/products.index";
import SEO from "../seo/SEO";
import { Search, ShoppingCart } from '@mui/icons-material';

// Dashboard Product Card Component
const DashboardCard = ({ product, onAddToCart, className, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`dashboard-card ${className} ${featured ? 'card-featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <h3 className="card-title">
          {product?.name || 'Product Name'}
        </h3>
        <p className="card-subtitle">
          {product?.description || product?.category || 'Product description'}
        </p>
        <div className="card-image">
          <img 
            src={product?.images?.[0] || '/PFP-01__3_-removebg-preview.png'} 
            alt={product?.name || 'Product'}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }}
          />
        </div>
        <button 
          className="card-button"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart style={{ marginRight: '8px', fontSize: '16px' }} />
          €{product?.price || 0}
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductList(allProducts || []);
    setLoading(false);
  }, []);

  const addAndCheckout = (p) => {
    addToCart({ ...p, qty: 1 });
    navigate("/checkout");
  };

  // Get featured products for the dashboard grid
  const featuredProducts = useMemo(() => {
    const products = productList || [];
    // Ensure we have at least 8 products for the grid
    const defaultProducts = [
      {
        id: 'default-1',
        name: 'iPhone 14 Pro Max',
        price: 1199,
        images: ['/IPH-14MAX-MAGSAFE-CLRCASE-6_square-removebg-preview.png'],
        description: 'Latest flagship smartphone'
      },
      {
        id: 'default-2',
        name: 'Samsung Galaxy S23',
        price: 999,
        images: ['/PFP-01 (3).jpg'],
        description: 'Powerful Android device'
      },
      {
        id: 'default-3',
        name: 'MacBook Air M2',
        price: 1299,
        images: ['/PFP-01__3_-removebg-preview.png'],
        description: 'Ultra-thin laptop'
      },
      {
        id: 'default-4',
        name: 'AirPods Pro',
        price: 249,
        images: ['/PFP-01__4_-removebg-preview.png'],
        description: 'Wireless earbuds'
      },
      {
        id: 'default-5',
        name: 'iPad Pro',
        price: 799,
        images: ['/IPH-14MAX-MAGSAFE-CLRCASE-6_square-removebg-preview.png'],
        description: 'Professional tablet'
      },
      {
        id: 'default-6',
        name: 'Apple Watch',
        price: 399,
        images: ['/PFP-01 (3).jpg'],
        description: 'Smart wearable'
      },
      {
        id: 'default-7',
        name: 'Gaming Setup',
        price: 2499,
        images: ['/PFP-01__3_-removebg-preview.png'],
        description: 'Complete gaming rig'
      },
      {
        id: 'default-8',
        name: 'Camera Kit',
        price: 1899,
        images: ['/PFP-01__4_-removebg-preview.png'],
        description: 'Professional camera'
      }
    ];
    
    return products.length >= 8 ? products.slice(0, 8) : defaultProducts;
  }, [productList]);

  const seoTitle = "Dashboard | Top Mobile";
  const seoDesc = "Discover the latest smartphones, accessories and more at Top Mobile. Fast shipping across Kosovo.";
  const seoUrl = "https://topmobile.store/";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        url={seoUrl}
        image="https://topmobile.store/og-image.jpg"
      />

      <div className="dashboard-container">
        {/* Dashboard Navbar */}
        <nav className="dashboard-navbar">
          <div className="dashboard-nav-container">
            <Link to="/" className="dashboard-logo">
              <img 
                src="/PFP-01__5_-removebg-preview.png" 
                alt="TopMobile"
                style={{ height: '32px' }}
              />
              <span>TopMobile</span>
            </Link>
            
            <ul className="dashboard-nav-links">
              <li><Link to="/" className="dashboard-nav-link active">Home</Link></li>
              <li><Link to="/products" className="dashboard-nav-link">Products</Link></li>
              <li><Link to="/sherbimet" className="dashboard-nav-link">Services</Link></li>
              <li><Link to="/kontakt" className="dashboard-nav-link">Contact</Link></li>
            </ul>

            <div className="dashboard-search">
              <Search className="dashboard-search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="dashboard-search-input"
              />
            </div>

            <div className="dashboard-actions">
              <Link to="/login" className="dashboard-btn">
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-grid">
            {/* Featured Product - Large Card (Top Left) */}
            <DashboardCard 
              product={featuredProducts[0]} 
              onAddToCart={addAndCheckout}
              className="card-featured"
              featured={true}
            />
            
            {/* Medium Cards (Right side of featured) */}
            <DashboardCard 
              product={featuredProducts[1]} 
              onAddToCart={addAndCheckout}
              className="card-medium"
            />
            
            <DashboardCard 
              product={featuredProducts[2]} 
              onAddToCart={addAndCheckout}
              className="card-medium"
            />
            
            {/* Small Cards (Top right) */}
            <DashboardCard 
              product={featuredProducts[3]} 
              onAddToCart={addAndCheckout}
              className="card-small"
            />
            
            <DashboardCard 
              product={featuredProducts[4]} 
              onAddToCart={addAndCheckout}
              className="card-small"
            />
            
            <DashboardCard 
              product={featuredProducts[5]} 
              onAddToCart={addAndCheckout}
              className="card-small"
            />
            
            {/* Large Cards (Bottom) */}
            <DashboardCard 
              product={featuredProducts[6]} 
              onAddToCart={addAndCheckout}
              className="card-large"
            />
            
            <DashboardCard 
              product={featuredProducts[7]} 
              onAddToCart={addAndCheckout}
              className="card-large"
            />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-dot" style={{top: '20%', left: '10%'}}></div>
          <div className="floating-dot" style={{top: '60%', right: '15%'}}></div>
          <div className="floating-dot" style={{bottom: '30%', left: '25%'}}></div>
        </div>
      </div>

      {/* Keep testimonials section if needed */}
      <div style={{ background: 'var(--dashboard-bg)', paddingTop: '40px' }}>
        <Testimonials />
      </div>
    </>
  );
};

export default Home;