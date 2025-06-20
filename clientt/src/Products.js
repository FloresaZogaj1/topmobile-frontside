import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../CartContext";

const demoProducts = [
  // ... vendos produktet tuaja këtu si fallback nëse s’ka asgjë nga API
];

const categories = [
  { value: "all", label: "Të gjitha" },
  { value: "phone", label: "Telefona" },
  { value: "case", label: "Case" },
  { value: "giftcard", label: "Gift Card" }
];

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
        alignItems: "stretch",
        p: 0,
        minHeight: 340,
        height: "100%",
        justifyContent: "space-between",
        transition: "box-shadow 0.14s, border 0.14s, transform 0.13s",
        "&:hover": {
          boxShadow: "0 8px 32px #ff800018",
          border: "1.3px solid #ff8000",
          transform: "translateY(-4px) scale(1.028)"
        },
        mb: 2,
        position: "relative"
      }}
    >
      {product.oldPrice && product.oldPrice > product.price && (
        <Typography
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "#ff8000",
            color: "#fff",
            px: 2,
            py: "2.5px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: 15,
            zIndex: 1,
          }}
        >
          -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
        </Typography>
      )}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 150,
          background: "#fafbfc",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <img
          src={product.image || "https://via.placeholder.com/300x150"}
          alt={product.name}
          style={{
            maxHeight: 110,
            maxWidth: "90%",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>
      <CardContent sx={{ px: 2, py: 1.5, flex: 1 }}>
        <Typography fontWeight={600} fontSize={15} color="#222" sx={{ mb: .5, minHeight: 36 }}>
          {product.name}
        </Typography>
        <Typography color="#888" fontSize={13} sx={{ mb: 1, minHeight: 25 }}>
          {product.desc || product.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {product.oldPrice && product.oldPrice > product.price && (
            <span style={{
              textDecoration: "line-through",
              color: "#bbb",
              fontSize: 15,
              marginRight: 7
            }}>
              €{product.oldPrice}
            </span>
          )}
          <Typography component="span" fontWeight={700} color="#023047" fontSize={20}>
            €{product.price}
          </Typography>
        </Box>
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
          onClick={() => addToCart(product)}
        >
          Shto në Shportë 🛒
        </Button>
      </Box>
    </Card>
  );
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(demoProducts);
        }
      })
      .catch(() => {
        setProducts(demoProducts);
      });
  }, []);

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.desc?.toLowerCase().includes(search.toLowerCase()) ||
       p.description?.toLowerCase().includes(search.toLowerCase()));
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
      <Typography variant="h4" mb={4} fontWeight={700} color="#023047">
        Të gjitha produktet
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
        {filtered.map(product => (
          <Box key={product.id} sx={{ height: "100%" }}>
            <ProductCard product={product} addToCart={addToCart} />
          </Box>
        ))}
      </Box>
      {filtered.length === 0 && (
        <Typography sx={{ color: "#023047", textAlign: "center", width: "100%", py: 10, fontSize: 20, fontWeight: 600 }}>
          S’ka produkte.
        </Typography>
      )}
    </Container>
  );
};

export default Products;
