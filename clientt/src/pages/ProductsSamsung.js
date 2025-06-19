// /pages/ProductsSamsung.js
import React, { useState } from "react";
import { Box, Typography, Button, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import samsungProducts from "../data/samsungproducts";

function ProductCard({ p, onAdd }) {
  return (
    <div className="product-card">
      <div className="image-zone" style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={p.images[0]}
          alt={p.name}
          style={{
            maxHeight: 110,
            maxWidth: "90%",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
        />
        <Link
          to={`/products/${p.id}`} // ***Këtu vetëm /products/${p.id}***
          className="product-hover-btn"
        >
          Shiko Produktin
        </Link>
      </div>
      <CardContent sx={{ px: 2, py: 1.5, flex: 1 }}>
        <Typography fontWeight={600} fontSize={15} color="#222" sx={{ mb: .5 }}>
          {p.name}
        </Typography>
        <Typography color="#888" fontSize={13} sx={{ mb: 1, minHeight: 25 }}>
          {p.description}
        </Typography>
        <Typography fontWeight={700} color="#ff8000" fontSize={20} sx={{ mb: 2 }}>
          €{p.price}
        </Typography>
      </CardContent>
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: 1.5,
            background: "#023047",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "none",
            textTransform: "none",
            fontSize: 16,
            py: 1,
            transition: "background 0.13s",
            "&:hover": {
              background: "#e66e00"
            }
          }}
          onClick={() => onAdd(p)}
        >
          Shto në Shportë 🛒
        </Button>
      </Box>
    </div>
  );
}

const ProductsSamsung = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filtered = samsungProducts.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", py: 5, px: { xs: 1, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} color="#023047" mb={3}>
        Samsung – Modelet më të kërkuara
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Box component="input"
          type="text"
          placeholder="Kërko produkt..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ padding: 1, borderRadius: 1, border: '1px solid #ddd', minWidth: 220, fontSize: 16 }}
        />
        <Box component="input"
          type="number"
          placeholder="Çmimi minimal"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          sx={{ padding: 1, borderRadius: 1, border: '1px solid #ddd', minWidth: 120, fontSize: 16 }}
        />
        <Box component="input"
          type="number"
          placeholder="Çmimi maksimal"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          sx={{ padding: 1, borderRadius: 1, border: '1px solid #ddd', minWidth: 120, fontSize: 16 }}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media (max-width: 900px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {filtered.map((p, idx) => (
          <Box key={p.id + "_" + idx} sx={{ height: "100%" }}>
            <ProductCard p={p} onAdd={addToCart} />
          </Box>
        ))}
      </Box>
      {filtered.length === 0 && (
        <Typography sx={{ color: '#b2b2b2', textAlign: 'center', width: '100%', py: 10, fontSize: 20, fontWeight: 600 }}>
          S’ka produkte.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsSamsung;
