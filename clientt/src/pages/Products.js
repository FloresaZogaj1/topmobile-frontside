// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import SEO from "../seo/SEO";

const DEFAULT_IMAGE = "/default-product.jpg";
const API_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname.endsWith("topmobile.store")
    ? "https://api.topmobile.store"
    : "http://localhost:4000");

/* —— CRITICAL CSS (compact + line-clamp + layout stable) —— */
const CRITICAL_CSS = `
#tm-products{
  /* Use global design system variables instead of local ones */
  max-width: 1240px; 
  margin: 40px auto; 
  padding: 0 16px 48px;
  background: var(--bg-primary);
}
#tm-products .heading{
  margin: 0 0 22px; 
  color: var(--text-primary); 
  font-weight: var(--weight-black);
  font-size: clamp(22px, 4.8vw, 28px); 
  letter-spacing: .2px;
}

/* GRID */
#tm-products .list{
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
  gap: 24px !important;
}

/* CARD */
#tm-products .card{
  position: relative;
  background: var(--bg-card) !important;
  border: 1px solid var(--border-light) !important;
  border-radius: var(--radius-2xl) !important;
  box-shadow: var(--shadow-lg) !important;
  display: flex !important; 
  flex-direction: column !important;
  min-height: 420px !important; 
  overflow: hidden !important;
  transition: transform .18s ease, box-shadow .2s ease, border-color .2s ease;
}
#tm-products .card:hover{ 
  transform: translateY(-4px); 
  box-shadow: var(--shadow-2xl); 
  border-color: var(--primary); 
}

/* BADGE */
#tm-products .badge{
  position: absolute; 
  top: 14px; 
  left: 14px; 
  z-index: 2;
  background: var(--primary); 
  color: white;
  padding: 4px 10px; 
  border-radius: var(--radius-lg); 
  font-weight: var(--weight-black); 
  font-size: var(--text-xs);
  box-shadow: var(--shadow-primary);
}

/* IMAGE */
#tm-products .image-link{ display:block; text-decoration:none; }
#tm-products .image-link.is-disabled{ pointer-events:none; cursor:not-allowed; opacity:.92; }
#tm-products .image-wrap{
  padding:18px 22px; aspect-ratio:16/12;
  display:flex; align-items:center; justify-content:center;
  background:
    radial-gradient(70% 60% at 50% 60%, rgba(255,122,0,.10) 0%, rgba(10,10,13,0) 60%),
    #0a0a0d;
  border-top-left-radius:18px; border-top-right-radius:18px;
  border-bottom:1px solid var(--stroke);
}
#tm-products .image-wrap img{
  width:100%; max-height:170px; height:auto; object-fit:contain;
  display:block; border-radius:10px;
  filter:drop-shadow(0 10px 24px rgba(0,0,0,.35));
}

/* INFO – kolonë e qëndrueshme */
#tm-products .info{
  box-sizing:border-box !important;
  padding:14px 16px 8px 16px !important; /* pak hapësirë poshtë që të mos prekë butonin */
  text-align:left;
  display:flex !important;
  flex-direction:column !important;
  row-gap:0 !important;
}
#tm-products .title-link{ text-decoration:none; }
#tm-products .title-link.is-disabled{ pointer-events:none; cursor:not-allowed; opacity:.92; }

/* Titulli – saktësisht 2 rreshta */
#tm-products .title{
  margin: var(--space-xs) 0 var(--space-xs);
  font-size: var(--text-lg); 
  font-weight: var(--weight-black); 
  color: var(--text-primary);
  line-height: 1.25;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height: calc(1.25em * 2);
  max-height: calc(1.25em * 2);
  overflow-wrap: anywhere; 
  word-break: break-word; 
  hyphens: auto;
}

/* Përshkrimi – saktësisht 2 rreshta */
#tm-products .desc{
  font-size: var(--text-sm); 
  color: var(--text-secondary); 
  margin: 0 0 var(--space-sm);
  line-height: 1.35;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height:calc(1.35em * 2);
  max-height:calc(1.35em * 2);
  overflow-wrap:anywhere; word-break:break-word; hyphens:auto;
}

/* Çmimi – gjithmonë në fund të .info */
#tm-products .price-row{
  margin: var(--space-xs) 0 var(--space-sm) !important;
  padding-top: var(--space-xs) !important;
  margin-top: auto !important; /* e shtyn poshtë */
}
#tm-products .old-price{ 
  color: var(--text-tertiary); 
  font-size: var(--text-sm); 
  text-decoration: line-through; 
  margin-right: var(--space-sm); 
}
#tm-products .price{ 
  color: var(--primary); 
  font-weight: var(--weight-black); 
  font-size: var(--text-xl); 
  letter-spacing: 0.2px; 
}

/* CTA – COMPACT (36px) */
#tm-products .add{
  all: unset;
  box-sizing: border-box !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: var(--space-xs) !important;

  height: 36px !important;
  padding: 0 var(--space-sm) !important;
  width: calc(100% - 32px) !important;
  margin: var(--space-sm) var(--space-md) var(--space-sm) var(--space-md) !important;

  background: var(--primary) !important;
  color: white !important;
  border-radius: var(--radius-pill) !important;

  font-weight: var(--weight-bold) !important;
  font-size: var(--text-xs) !important;
  letter-spacing: 0.2px !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
  white-space: nowrap !important;

  cursor: pointer !important;
  border: none !important;
  position: static !important;
  box-shadow: var(--shadow-button) !important;
  transition: var(--transition-base) !important;
}
#tm-products .add:hover{ 
  background: var(--primary-hover) !important; 
  transform: translateY(-1px) !important;
  box-shadow: var(--shadow-button-hover) !important;
}
#tm-products .add:active{ transform: translateY(0.5px); }
#tm-products .cart{ font-size: var(--text-sm) !important; transform: translateY(0.5px); }

@media (max-width: 420px){
  #tm-products .image-wrap{ aspect-ratio: 16/13; }
  #tm-products .image-wrap img{ max-height: 160px; }
}
`;

function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "€ —";
  return Number.isInteger(n) ? `€ ${n}` : `€ ${n.toFixed(2)}`;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ballina", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Produktet", item: "https://topmobile.store/products" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (products || []).map((p, i) => {
      const hasPage = Boolean(p?.slug && String(p.slug).trim().length > 0);
      return {
        "@type": "ListItem",
        position: i + 1,
        url: hasPage ? `https://topmobile.store/products/${p.slug}` : `https://topmobile.store/products`,
        name: p.name,
      };
    }),
  };

  if (loading) return <div style={{ color: "#9aa3b2", padding: 40 }}>Loading...</div>;
  if (!products.length) return <div style={{ color: "#9aa3b2", padding: 40 }}>S’ka produkte në sistem.</div>;

  return (
    <div id="tm-products">
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      <SEO />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>

      <h2 className="heading">Produktet</h2>

      <div className="list">
        {products.map((prod) => {
          const hasPage = Boolean(prod?.slug && String(prod.slug).trim().length > 0);
          const productUrl = hasPage ? `/products/${prod.slug}` : undefined;
          const imgSrc = prod.image || DEFAULT_IMAGE;

          const hasDiscount = prod.oldPrice && Number(prod.oldPrice) > Number(prod.price);
          const discountPct = hasDiscount
            ? Math.round((1 - Number(prod.price) / Number(prod.oldPrice)) * 100)
            : null;

          const ImageWrapper = ({ children }) =>
            hasPage ? (
              <Link to={productUrl} className="image-link" aria-label={`Shiko ${prod.name}`}>{children}</Link>
            ) : (
              <div className="image-link is-disabled" aria-disabled="true" title="Ky produkt s'ka faqe">{children}</div>
            );

          const TitleWrapper = ({ children }) =>
            hasPage ? (
              <Link to={productUrl} className="title-link">{children}</Link>
            ) : (
              <div className="title-link is-disabled" aria-disabled="true" title="Ky produkt s'ka faqe">{children}</div>
            );

          return (
            <article key={prod.id} className="card">
              {hasDiscount && <span className="badge">-{discountPct}%</span>}

              <ImageWrapper>
                <div className="image-wrap">
                  <img
                    src={imgSrc}
                    alt={`${prod.name} – Top Mobile`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>
              </ImageWrapper>

              <div className="info">
                <TitleWrapper>
                  <h3 className="title">{prod.name}</h3>
                </TitleWrapper>

                <p className="desc">{prod.description || "—"}</p>

                <div className="price-row">
                  {hasDiscount && <span className="old-price">{formatPrice(prod.oldPrice)}</span>}
                  <span className="price">{formatPrice(prod.price)}</span>
                </div>
              </div>

              <button
                type="button"
                className="add"
                onClick={() => addToCart(prod)}
                aria-label={`Shto ${prod.name} në shportë`}
              >
                SHTO NË SHPORTË
                <ShoppingCartIcon className="cart" />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
