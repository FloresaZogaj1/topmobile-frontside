import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../CartContext";


const demoProducts = [

  {
    id: 1,
    name: "iPhone 15 Pro Max",
    desc: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium.",
    price: 1240,
    oldPrice: 1399,
    image: "https://example.com/iphone15promax.jpg"
  },
];


function ProductCard({ product, addToCart }) {
  return (
    <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 32px #00132b12", // hije më neutrale, e butë
      border: "none",
      bgcolor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      p: 0,
      minHeight: 340,
      height: "100%",
      justifyContent: "space-between",
      transition: "box-shadow 0.18s, transform 0.15s",
      "&:hover": {
        boxShadow: "0 12px 40px #02304722",
        transform: "translateY(-4px) scale(1.025)"
      },
      mb: 2,
      position: "relative"
    }}
  >
    <Box
      sx={{
        p: 2.5,
        pb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 160,
        background: "#fafbfc",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/300x150"}
        alt={product.name}
        style={{
          maxHeight: 100,
          maxWidth: "100%",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
      />
    </Box>
    <CardContent sx={{ px: 2, py: 1, flex: 1 }}>
      <Typography fontWeight={800} fontSize={17} color="#1a202c" sx={{ mb: 0.7, minHeight: 36 }}>
        {product.name}
      </Typography>
      <Typography color="#505a70" fontSize={14} sx={{ mb: 1, minHeight: 23 }}>
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
        <Typography
          component="span"
          fontWeight={800}
          color="#FF8000"
          fontSize={20}
          sx={{ letterSpacing: 0.5 }}
        >
          €{product.price}
        </Typography>
      </Box>
    </CardContent>
    <Box sx={{ px: 2, pb: 2 }}>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: 2.5,
          background: "#012C39", // blu e thellë
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          boxShadow: "none",
          textTransform: "none",
          py: 1.15,
          transition: "background 0.16s",
          "&:hover": {
            background: "#ff8000",
            color: "#fff"
          }
        }}
        onClick={() => addToCart(product)}
      >
        Shto në Shportë <span style={{ marginLeft: 6, fontSize: 17 }}>🛒</span>
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
