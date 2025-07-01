import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import { useCart } from "../CartContext";

const API_URL = process.env.REACT_APP_API_URL;
const token   = localStorage.getItem("token");

function ProductCard({ product, addToCart }) {
  return (
    <Card
      sx={{
        borderRadius: 1.5,
        boxShadow: "none",
        border: "none",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transition: "transform 0.13s, box-shadow 0.14s",
        "&:hover": {
          transform: "translateY(-4px) scale(1.02)",
          boxShadow: "0 8px 32px #ff800018",
          border: "1px solid #ff8000",
        },
        minHeight: 340,
        mb: 2,
      }}
    >
      {/* Discount badge */}
      {product.oldPrice > product.price && (
        <Typography
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "#ff8000",
            color: "#fff",
            px: 2,
            py: "2px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: 14,
            zIndex: 1,
          }}
        >
          -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
        </Typography>
      )}

      {/* Image */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#fafbfc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 150,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <img
          src={product.image || "https://via.placeholder.com/300x150"}
          alt={product.name}
          style={{ maxHeight: 110, maxWidth: "90%", objectFit: "contain" }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ pt: 1, flex: 1 }}>
        <Typography fontWeight={600} fontSize={15} color="#222" sx={{ mb: 0.5, minHeight: 36 }}>
          {product.name}
        </Typography>
        <Typography color="#888" fontSize={13} sx={{ mb: 1, minHeight: 25 }}>
          {product.description || product.desc}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {product.oldPrice > product.price && (
            <Typography
              component="span"
              sx={{ textDecoration: "line-through", color: "#bbb", mr: 1 }}
            >
              €{product.oldPrice}
            </Typography>
          )}
          <Typography component="span" fontWeight={700} fontSize={20} color="#023047">
            €{product.price}
          </Typography>
        </Box>
      </CardContent>

      {/* Add to cart */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#023047",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#e66e00" },
          }}
          onClick={() => addToCart(product)}
        >
          Shto në Shportë 🛒
        </Button>
      </Box>
    </Card>
  );
}

export default function Products() {
  const [products, setProducts] = useState(null); // null = loading
  const [search, setSearch]       = useState("");
  const [minPrice, setMinPrice]   = useState("");
  const [maxPrice, setMaxPrice]   = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`, {
          headers: {
            // nëse endpoint kërkon token admin:
            // Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Fetch error ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("fetchProducts error:", err);
        setProducts([]); 
      }
    })();
  }, []);

  // kur products===null => po jet loading
  if (products === null) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // filtrimi
  const filtered = products.filter(p => {
    const name = p.name?.toLowerCase() || "";
    const desc = (p.description || p.desc || "").toLowerCase();
    const q    = search.toLowerCase();
    const matchesSearch = name.includes(q) || desc.includes(q);
    const price = Number(p.price);
    const okMin  = minPrice === "" || price >= Number(minPrice);
    const okMax  = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && okMin && okMax;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
      <Typography variant="h4" mb={4} fontWeight={700} color="#023047">
        Të gjitha produktet
      </Typography>

      {/* Filter inputs */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Box
          component="input"
          placeholder="Kërko produkt..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200, p:1, border: "1px solid #ddd", borderRadius:1 }}
        />
        <Box
          component="input"
          type="number"
          placeholder="Çmimi minimal"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          sx={{ width: 120, p:1, border: "1px solid #ddd", borderRadius:1 }}
        />
        <Box
          component="input"
          type="number"
          placeholder="Çmimi maksimal"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          sx={{ width: 120, p:1, border: "1px solid #ddd", borderRadius:1 }}
        />
      </Box>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: "repeat(4,1fr)",
            "@media (max-width:1200px)": { gridTemplateColumns: "repeat(3,1fr)" },
            "@media (max-width:900px)": { gridTemplateColumns: "repeat(2,1fr)" },
            "@media (max-width:600px)": { gridTemplateColumns: "1fr" },
          }}
        >
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
          ))}
        </Box>
      ) : (
        <Typography
          sx={{ textAlign: "center", py: 10, color: "#023047", fontSize: 18, fontWeight: 600 }}
        >
          S’ka produkte.
        </Typography>
      )}
    </Container>
  );
}
