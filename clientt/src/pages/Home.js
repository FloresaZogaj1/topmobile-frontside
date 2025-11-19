// src/pages/Home.jsx - Modern Design
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/modern-design-system.css";
import "../styles/modern-home.css";
import Testimonials from "../components/Testimonials";
import { useCart } from "../CartContext";
import allProducts from "../data/products.index";
import demoProducts from "../data/demoProducts";
import SEO from "../seo/SEO";
// Local hero images (imports must be before any other statements)
import heroPhoneImg17 from "../assets/iPhone_17_Pro_Max_Deep_Blue_PDP_Image_Position_1_Deep_Blue_Colour__MY-EN__1_-removebg-preview.webp";
// Use external placeholders when local hero assets are not available
const specialImg = "https://via.placeholder.com/800x600?text=Special+Offer";
const placeholderImg = "https://via.placeholder.com/600x600?text=Top+Mobile";
const heroPhoneImg = heroPhoneImg17;

// Helper për të krijuar URL të produktit
const productPath = (p) => {
  const slugOrId = String(p?.slug ?? p?.id ?? p?.name ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `/products/${slugOrId}`;
};

function ModernProductCard({ product, onAddToCart, isSpecial = false }) {
  if (isSpecial) {
    return (
      <div className="special-offer-card">
        <div className="special-offer-content">
          <div className="special-offer-badge">🔥 Ofertë Speciale</div>
          <h3 className="special-offer-title">{product?.name ?? "Produkt Special"}</h3>
          <p className="special-offer-description">
            Zbritje të mëdha në produktet më të reja. Mos humbni këtë mundësi!
          </p>
          <Link to={productPath(product)} className="hero-btn-primary">
            Shiko detajet
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="special-offer-visual">
          <img 
            src={product?.images?.[0] || product?.image || specialImg} 
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = specialImg; }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={productPath(product)} className="product-image-link">
          <img
            src={product?.images?.[0] || product?.image || placeholderImg}
            alt={product?.name || "Produkt"}
            className="product-image"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImg; }}
          />
        </Link>
        
        {product?.isNew && <div className="product-badge">I ri</div>}
        
        <button className="product-favorite" aria-label="Shto në të preferuara">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product?.category ?? "Smartphone"}</div>
        
        <Link to={productPath(product)} className="product-title">
          {product?.name ?? "Produkt"}
        </Link>

        <div className="product-price">
          <span className="product-current-price">€{product?.price ?? 0}</span>
          {product?.oldPrice && product.oldPrice > product.price && (
            <>
              <span className="product-old-price">€{product.oldPrice}</span>
              <span className="product-discount">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="product-btn-add"
            onClick={() => onAddToCart(product)}
            aria-label={`Bli tani ${product.name}`}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Bli tani
          </button>
          <Link to={productPath(product)} className="product-btn-details">
            Detajet
          </Link>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const valid = Array.isArray(allProducts) && allProducts.length > 0 ? allProducts : demoProducts;
    setProductList(valid);
    setLoading(false);
  }, []);

  // scroll helper removed (was unused)

  // hero click moved to inline handler

  const addAndCheckout = (p) => {
    addToCart({ ...p, qty: 1 });
    navigate("/checkout");
  };

  // Vetëm produktet e reja
  const onlyNew = (productList || []).filter(
    (p) =>
      p?.isNew === true ||
      (Array.isArray(p?.tags) &&
        p.tags.map(String).map((t) => t.toLowerCase()).includes("new")) ||
      String(p?.badge || "").toLowerCase() === "new"
  );
  const filteredProducts = onlyNew.length > 0 ? onlyNew : productList;

  const seoTitle = "Produkte të reja | Top Mobile";
  const seoDesc =
    "Zbuloni produktet më të reja në Top Mobile – smartphone, aksesorë dhe më shumë. Dërgesa e shpejtë në gjithë Kosovën.";
  const seoUrl = "https://topmobile.store/#new";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (filteredProducts || []).slice(0, 8).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://topmobile.store/products/${p.id}`,
      name: p.name,
    })),
  };

  // 3 produkte për “Eksploro Koleksionin” që bashkë me ‘Special’ bëhen 4
  const picksCount = 4;
  const hasImage = (p) => !!(p?.images?.[0] || p?.image);
  const picks = useMemo(() => {
    const list = Array.isArray(productList) ? productList : [];
    const fuji = list.filter(
      (p) => String(p?.category || "").toLowerCase() === "fujifilm" && hasImage(p)
    );
    const selected = fuji.slice(0, picksCount);
    if (selected.length < picksCount) {
      const rest = list.filter(
        (p) => String(p?.category || "").toLowerCase() !== "fujifilm" && hasImage(p)
      );
      selected.push(...rest.slice(0, picksCount - selected.length));
    }
    return selected;
  }, [productList]);

  const picksIds = new Set(
    picks.map((p) => String(p?.id ?? p?.slug ?? p?.name))
  );
  // Show only iPhone, Samsung, Accessories in the 'Produkte të reja' grid
  const allowedCats = [
    "iphone",
    "samsung",
    "accessories",
    "aksesor",
    "aksesorë",
    "aksesore",
    "phone", // many datasets use generic 'phone' for smartphones (iPhone/Samsung)
    "smartphone",
  ];
  // If "new" list equals the featured picks, fall back to the full list so the grid is not empty
  const baseForGrid = (() => {
    const fp = Array.isArray(filteredProducts) ? filteredProducts : [];
    const pl = Array.isArray(productList) ? productList : [];
    // if after excluding picks from filteredProducts we get none, use productList
    const fpMinusPicks = fp.filter((p) => !picksIds.has(String(p?.id ?? p?.slug ?? p?.name)));
    return fpMinusPicks.length > 0 ? fp : pl;
  })();

  const gridProductsAll = baseForGrid.filter(
    (p) => !picksIds.has(String(p?.id ?? p?.slug ?? p?.name)) && hasImage(p)
  );
  const gridFiltered = gridProductsAll.filter((p) => {
    const cat = String(p?.category || "").toLowerCase();
    return allowedCats.includes(cat) || cat === "accessory"; // dataset uses singular 'accessory'
  });
  const gridProducts = gridFiltered.length > 0 ? gridFiltered : gridProductsAll;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        url={seoUrl}
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">
        {JSON.stringify(itemListJsonLd)}
      </script>

      {/* DYNAMIC HERO SECTION - MOCKUP STYLE */}
      <section className="hero-modern">
        <div className="container">
          <div className="hero-grid">
            
            {/* LEFT SIDE - Product Cards */}
            <div className="hero-left">
              <div className="hero-card featured-product">
                <div className="card-header">
                  <span className="card-category">iPhone Device</span>
                  <div className="rating">
                    <span>★★★★★</span>
                    <span>5.0</span>
                  </div>
                </div>
                <h3 className="card-title">iPhone 17 Pro Max</h3>
                <p className="card-description">
                  Teknologji e avancuar, kamera profesionale dhe performancë e shkëlqyer
                </p>
                <div className="card-footer">
                  <div className="price">€1,299</div>
                </div>
                <div className="card-image">
                  <img src={heroPhoneImg17} alt="iPhone 17 Pro Max" />
                </div>
              </div>

              <div className="hero-card promotion">
                <div className="promo-badge">Ofertë</div>
                <h4>Zbritje deri në 30%</h4>
                <p>Në të gjitha aksesorët dhe mbrojtësit</p>
                <Link to="/products/accessories" className="promo-btn">Eksploro</Link>
              </div>
            </div>

            {/* CENTER - Main Product Display */}
            <div className="hero-center">
              <div className="main-product-card">
                <div className="product-badge">I ri</div>
                <div className="product-3d-container">
                  <div className="product-3d-scene">
                    <div className="floating-phone-3d">
                      <img src={heroPhoneImg} alt="Featured Product" className="main-product-img-3d" />
                      <div className="phone-glow"></div>
                      <div className="rotating-ring"></div>
                    </div>
                    <div className="floating-particles">
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                    </div>
                  </div>
                </div>
                <div className="curved-ribbon"></div>
              </div>
            </div>

            {/* RIGHT SIDE - Info Cards */}
            <div className="hero-right">
              <div className="info-card">
                <div className="info-icon">📱</div>
                <h4>Top Mobile</h4>
                <p>Smartphone më të mirë në Kosovë</p>
              </div>

              <div className="stats-card">
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Klientë të kënaqur</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Modele në stok</span>
                </div>
              </div>

              <div className="quick-actions">
                <button 
                  onClick={() => document.getElementById('produktet')?.scrollIntoView({ behavior: 'smooth' })}
                  className="quick-btn primary"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2a1 1 0 0 1 2 0v2h6V2a1 1 0 0 1 2 0v2h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1z"/>
                  </svg>
                  Shiko të gjitha
                </button>
                <Link to="/kontakt" className="quick-btn secondary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Kontakto
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Background decorative elements */}
        <div className="hero-bg-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-gradient"></div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">⭐ PRODUKTE TË ZGJEDHURA</div>
            <h2 className="section-title">Ofertat më të mira</h2>
            <p className="section-description">
              Zbuloni produktet më të reja dhe më të mira me çmime të shkëlqyera. 
              Garanci e plotë dhe dërgesa falas.
            </p>
          </div>

          <div className="products-grid" id="produktet">
            {/* Featured Products */}
            {picks.map((product, i) => (
              <ModernProductCard
                key={product.id || product.slug || i}
                product={product}
                onAddToCart={addAndCheckout}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS SECTION */}
      <section className="featured-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">📱 TË GJITHA PRODUKTET</div>
            <h2 className="section-title">Produkte të reja</h2>
            <p className="section-description">
              Koleksioni i plotë i smartphone-ve dhe aksesorëve tanë me çmime konkurruese.
            </p>
          </div>

          <div className="products-grid">
            {(loading ? Array.from({ length: 8 }) : gridProducts).map((product, idx) =>
              loading ? (
                <div key={idx} className="product-card" style={{ minHeight: '400px', background: 'var(--bg-secondary)' }}>
                  <div className="product-image-container" style={{ background: 'var(--bg-tertiary)' }}></div>
                  <div className="product-info">
                    <div style={{ height: '20px', background: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div style={{ height: '16px', background: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div style={{ height: '24px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ) : (
                <ModernProductCard
                  key={(product.id || product.slug || product.name) + "_" + idx}
                  product={product}
                  onAddToCart={addAndCheckout}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">🗂️ KATEGORITË</div>
            <h2 className="section-title">Shfleto sipas kategorive</h2>
            <p className="section-description">
              Gjeni saktësisht atë që kërkoni në kategoritë tona të organizuara.
            </p>
          </div>

          <div className="categories-grid">
            <Link to="/products/iphone" className="category-card">
              <div className="category-icon">📱</div>
              <h3 className="category-title">iPhone</h3>
              <p className="category-count">Të gjithë modelet</p>
            </Link>

            <Link to="/products/samsung" className="category-card">
              <div className="category-icon">📱</div>
              <h3 className="category-title">Samsung</h3>
              <p className="category-count">Galaxy Series</p>
            </Link>

            <Link to="/products/accessories" className="category-card">
              <div className="category-icon">🎧</div>
              <h3 className="category-title">Aksesorë</h3>
              <p className="category-count">Karrikues, mbështjellës, etj</p>
            </Link>

            <Link to="/category/fujifilm" className="category-card">
              <div className="category-icon">📸</div>
              <h3 className="category-title">Fujifilm</h3>
              <p className="category-count">Kamera Instax</p>
            </Link>

            <Link to="/sherbimet/asistenca" className="category-card">
              <div className="category-icon">🔧</div>
              <h3 className="category-title">Shërbimet</h3>
              <p className="category-count">Riparim & Mirëmbajtje</p>
            </Link>

            <Link to="/gift-cards" className="category-card">
              <div className="category-icon">🎁</div>
              <h3 className="category-title">Gift Cards</h3>
              <p className="category-count">Dhurata perfekte</p>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Home;
