// /pages/ProductsAccessories.jsx
import React, { useState } from "react";
import { Box, Typography, Button, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import accessoriesproducts from "../data/accesoriesproducts";

import SEO from "../seo/SEO";
import "./ProductsIphone.css"; // ripërdor stilet: product-card, products-grid, filters-bar, btn-accent, iphone-page

const DEFAULT_IMAGE = "/default-product.jpg";

function ProductCard({ p, onAdd }) {
  const productHref = `/products/${p.slug || p.id}`;
  const imgSrc = (p.images && p.images[0]) || DEFAULT_IMAGE;
  const cat = String(p.category || "accessories").toLowerCase();
  const localizedCat = cat.includes("access") ? "Aksesorë" : cat;
  const longTitle = p.name && p.name.length > 26;

  return (
    <div className={"modern-product-card" + (longTitle ? " has-long-title" : "")}>
      <div className="product-new-badge">I RI</div>
      <div className="product-heart">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
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
      <div className="modern-product-info">
        <div className="product-category-label">{localizedCat}</div>
        <Link to={productHref} className="modern-product-title">
          {p.name}
        </Link>
        <div className="modern-product-price">€{p.price}</div>
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

const ProductsAccessories = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filtered = accessoriesproducts.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q));
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  // JSON-LD: Breadcrumbs (Home > Produktet > Aksesorë)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Produktet", item: "https://topmobile.store/products" },
      { "@type": "ListItem", position: 3, name: "Aksesorë", item: "https://topmobile.store/products/accessories" },
    ],
  };

  // JSON-LD: ItemList (lista e aksesorëve)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://topmobile.store/products/${p.slug || p.id}`,
      name: p.name,
    })),
  };

  return (
    <Box
      className="iphone-page"
      sx={{
        maxWidth: 1300,
        mx: "auto",
        pt: { xs: 12, md: 5 }, // extra top padding on mobile (12*8=96px) to clear sticky navbar
        pb: 5,
        px: { xs: 1, md: 4 },
      }}
    >
      {/* SEO për kategorinë Aksesorë */}
      <SEO
        title="Aksesorë – Për Top Mobile"
        description="Aksesorë për telefona: mbrojtëse, karikues, kabllo dhe më shumë. Çmime të mira dhe dërgesë e shpejtë në gjithë Kosovën."
        url="https://topmobile.store/products/accessories"
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>

      <Typography component="h1" variant="h4" fontWeight={900} className="iphone-title" sx={{ mb: 3 }}>
        Aksesorë – Për Top Mobile
      </Typography>

      {/* Filtrat */}
      <Box className="filters-bar" sx={{ mb: 4 }}>
        <Box
          component="input"
          type="text"
          placeholder="Kërko aksesor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Kërko aksesor"
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
          S’ka aksesorë.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsAccessories;
