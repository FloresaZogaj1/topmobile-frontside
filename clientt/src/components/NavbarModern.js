import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import logo from '../assets/PFP-01__5_-removebg-preview.png';
import '../styles/modern-navbar.css';

const productMenu = [
  { label: 'iPhone', path: '/products/iphone' },
  { label: 'Samsung', path: '/products/samsung' },
  { label: 'Fujifilm', path: '/products/fujifilm' },
  { label: 'Aksesorë', path: '/products/accessories' },
];

const servicesMenu = [
  { label: 'Mirëmbajtja', path: '/sherbimet/mirembajtja' },
  { label: 'Pjesë për telefona', path: '/sherbimet/telefona' },
  { label: 'Pjesë për PlayStation', path: '/sherbimet/playstation' },
  { label: 'Servisi', path: '/sherbimet/servisi' },
  { label: 'Asistencë Mobile', path: '/sherbimet/asistenca' },
];

export default function NavbarModern() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  // Mobile submenu state (collapsible sections)
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState({ products: false, services: false });

  const navigate = useNavigate();
  const { cart } = useCart();
  const { loggedIn, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartCount = Array.isArray(cart) ? cart.reduce((s, it) => s + (it.qty || 1), 0) : 0;

  const doSearch = (e) => {
    e?.preventDefault?.();
    const q = searchTerm.trim();
    if (q) navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <header className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Top Mobile" />
        </Link>

        <nav className="navbar-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Ballina</Link>
            </li>

            <li className="nav-item has-submenu">
              <div className="nav-link">Produktet <span className="caret">▾</span></div>
              <div className="nav-dropdown">
                {productMenu.map((p) => (
                  <Link key={p.path} className="dropdown-item" to={p.path}>{p.label}</Link>
                ))}
              </div>
            </li>

            <li className="nav-item has-submenu">
              <div className="nav-link">Shërbimet <span className="caret">▾</span></div>
              <div className="nav-dropdown">
                {servicesMenu.map((s) => (
                  <Link key={s.path} className="dropdown-item" to={s.path}>{s.label}</Link>
                ))}
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gift-cards">Gift Cards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Rreth Nesh</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <form className="navbar-search" onSubmit={doSearch}>
            <input
              className="search-input"
              type="search"
              placeholder="Kërko produkte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <Link to="/cart" className="action-btn" title="Shporta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6h15l-1.5 9h-12z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {loggedIn ? (
            <button className="login-btn" onClick={() => { logout(); navigate('/login'); }}>Dil</button>
          ) : (
            <Link to="/login" className="login-btn">Kyçu</Link>
          )}

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="menu">☰</button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div className="navbar-logo">
              <img src={logo} alt="Top Mobile" />
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>×</button>
          </div>

          <div className="mobile-search-container">
            <div className="mobile-search">
              <input
                className="mobile-search-input"
                type="text"
                placeholder="Kërko produkte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && doSearch(e)}
              />
            </div>
          </div>

          <nav className="mobile-menu-nav">
            <div className="mobile-nav-item"><Link to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Ballina</Link></div>
            <div className="mobile-nav-item">
              <div
                className="mobile-nav-link"
                role="button"
                tabIndex={0}
                aria-expanded={mobileSectionsOpen.products}
                onClick={() => setMobileSectionsOpen((o) => ({ ...o, products: !o.products }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMobileSectionsOpen((o) => ({ ...o, products: !o.products }));
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>Produktet</span>
                <span className="caret" aria-hidden style={{ transition: 'transform .2s', transform: mobileSectionsOpen.products ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              <div className="mobile-submenu" style={{ display: mobileSectionsOpen.products ? 'block' : 'none' }}>
                {productMenu.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="mobile-nav-link"
                    style={{ paddingLeft: 18, opacity: 0.95 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mobile-nav-item">
              <div
                className="mobile-nav-link"
                role="button"
                tabIndex={0}
                aria-expanded={mobileSectionsOpen.services}
                onClick={() => setMobileSectionsOpen((o) => ({ ...o, services: !o.services }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMobileSectionsOpen((o) => ({ ...o, services: !o.services }));
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>Shërbimet</span>
                <span className="caret" aria-hidden style={{ transition: 'transform .2s', transform: mobileSectionsOpen.services ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              <div className="mobile-submenu" style={{ display: mobileSectionsOpen.services ? 'block' : 'none' }}>
                {servicesMenu.map((s) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    className="mobile-nav-link"
                    style={{ paddingLeft: 18, opacity: 0.95 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            
 <div className="mobile-nav-item"><Link to="/gift-cards" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Gift Cards</Link></div>
<div className="mobile-nav-item"><Link to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Rreth Nesh</Link></div>
            <div className="mobile-nav-item"><Link to="/kontakt" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Kontakt</Link></div>
           
          </nav>
        </div>
      </div>
    </header>
  );
}