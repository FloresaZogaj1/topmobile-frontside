import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Typography } from "@mui/material";
import "./Home.css";
import Testimonials from "../components/Testimonials";
import { useCart } from "../CartContext";
import demoProducts from "../data/products";

const categories = [
  { label: "Të gjitha", value: "all" },
  { label: "Telefona", value: "phone" },
  { label: "Case", value: "case" },
  { label: "Gift Card", value: "giftcard" },
];

// Komponenti për produktin, me hover button
function ProductCard({ product, onAdd }) {
  return (
    <Card
      className="product-card"
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        border: "none",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        p: 0,
        minHeight: 340,
        justifyContent: "space-between",
        transition: "none",
        mb: 2,
        position: "relative",
        overflow: "visible"
      }}
    >
      <Box className="image-zone" sx={{
        width: "100%",
        height: 180,
        background: "#fff",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 14px #0001",
        position: "relative"
      }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "#fff",
            transition: "transform .12s",
          }}
        />
        {/* Butoni Shiko Produktin, shfaqet vetëm në hover */}
        <Link
          to={`/products/${product.id}`}
          className="product-hover-btn"
        >
          Shiko Produktin
        </Link>
      </Box>
      <CardContent sx={{ px: 2, py: 1.5, flex: 1 }}>
        <Typography fontWeight={600} fontSize={15} color="#222" sx={{ mb: .5 }}>
          {product.name}
        </Typography>
        <Typography color="#888" fontSize={13} sx={{ mb: 1, minHeight: 25 }}>
          {product.description}
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
          <Typography component="span" fontWeight={700} color="#ff8000" fontSize={20}>
            €{product.price}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ px: 2, pb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
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
          onClick={() => onAdd(product)}
        >
          Shto në Shportë 🛒
        </Button>
      </Box>
    </Card>
  );
}

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("all");

  useEffect(() => {
    setProducts(demoProducts);
    setLoading(false);
  }, []);

  const filteredProducts =
    selectedCat === "all"
      ? products
      : products.filter((p) =>
          (p.category?.toLowerCase() || "").includes(selectedCat)
        );

  return (
    <div className="home-container">
      <h2 id="produktet" style={{ marginBottom: 24, color: "#023047", fontWeight: 700 }}>
        {selectedCat === "all"
          ? "Produkte të reja"
          : categories.find(c => c.value === selectedCat)?.label}
      </h2>
      <div className="category-list" style={{ marginBottom: 32 }}>
        {categories.map((c) => (
          <button
            key={c.value}
            style={{
              marginRight: 14,
              padding: "8px 18px",
              borderRadius: 7,
              border: "1px solid #ddd",
              background: selectedCat === c.value ? "#ff8000" : "#fff",
              color: selectedCat === c.value ? "#fff" : "#222",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
            onClick={() => setSelectedCat(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div
        className="products-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 32,
        }}
      >
        {(loading ? Array.from({ length: 8 }) : filteredProducts).map((product, idx) =>
          loading ? (
            <Box key={idx} sx={{ minHeight: 340, background: "#f5f5f5", borderRadius: 1.5 }} />
          ) : (
            <ProductCard key={product.id + "_" + idx} product={product} onAdd={addToCart} />
          )
        )}
      </div>
      <Testimonials />

      {(!loading && filteredProducts.length === 0) && (
        <div className="no-products">S’ka produkte.</div>
      )}
    </div>
  );
};

export default Home;
