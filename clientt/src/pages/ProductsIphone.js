import React, { useState } from "react";
import { Box, Typography, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import iphoneProducts from "../data/productsiphone";
import SEO from "../seo/SEO";
import "./ProductsIphone.css";

const DEFAULT_IMAGE = "/default-product.jpg";

function ProductCard({ p, onAdd }) {
  const productHref = `/products/${p.slug || p.id}`;
  const imgSrc = (p.images && p.images[0]) || DEFAULT_IMAGE;

  return (
    <div className="modern-product-card">
      {/* Badge I RI */}
      <div className="product-new-badge">I RI</div>
      
      {/* Heart Icon */}
      <div className="product-heart">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      {/* Product Image */}
      <div className="modern-product-image">
        <Link to={productHref}>
          <img
            src={imgSrc}
            alt={p.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="modern-product-info">
        <div className="product-category-label">IPHONE</div>
        <Link to={productHref} className="modern-product-title">
          {p.name}
        </Link>
        <div className="modern-product-price">€{p.price}</div>
        
        {/* Action Buttons */}
        <div className="modern-product-buttons">
          <button
            className="btn-buy-now"
            onClick={() => onAdd(p)}
            aria-label={`Bli ${p.name}`}
          >
            ⚡ Bli tani
          </button>
          <Link to={productHref} className="btn-details-gray">
            Detajet
          </Link>
        </div>
      </div>
    </div>
  );
}

const ProductsIphone = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filtered = iphoneProducts.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q));
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Produktet", item: "https://topmobile.store/products" },
      { "@type": "ListItem", position: 3, name: "iPhone", item: "https://topmobile.store/products/iphone" }
    ]
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://topmobile.store/products/${p.slug || p.id}`,
      name: p.name
    }))
  };

  return (
    <Box className="iphone-page" sx={{ maxWidth: 1300, mx: "auto", py: 5, px: { xs: 1, md: 4 } }}>
      <SEO
        title="iPhone – Modelet më të kërkuara"
        description="Shfleto modelet iPhone në Top Mobile – gjendje e shkëlqyer, çmime të mira dhe garanci. Dërgesa e shpejtë në gjithë Kosovën."
        url="https://topmobile.store/products/iphone"
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>

      <Typography component="h1" variant="h4" fontWeight={900} className="iphone-title" sx={{ mb: 3 }}>
        iPhone – Modelet më të kërkuara
      </Typography>

      {/* Filtrat */}
      <Box className="filters-bar" sx={{ mb: 4 }}>
        <Box
          component="input"
          type="text"
          placeholder="Kërko produkt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Kërko iPhone"
        />
        <Box
          component="input"
          type="number"
          placeholder="Çmimi minimal"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="Çmimi minimal"
        />
        <Box
          component="input"
          type="number"
          placeholder="Çmimi maksimal"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Çmimi maksimal"
        />
      </Box>

      {/* GRID */}
      <Box className="products-grid">
        {filtered.map((p, idx) => (
          <Box key={p.id + "_" + idx} sx={{ height: "100%" }}>
            <ProductCard p={p} onAdd={addToCart} />
          </Box>
        ))}
      </Box>

      {filtered.length === 0 && (
        <Typography className="empty-state" sx={{ textAlign: "center", width: "100%", py: 10, fontSize: 20, fontWeight: 600 }}>
          S’ka produkte.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsIphone;
