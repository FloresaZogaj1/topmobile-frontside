import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../CartContext";

/* —— DEMO si në screenshot —— */
const demoProducts = [
  {
    id: 1,
    name: "iPhone",
    desc: "Apple iPhone, Purple.",
    price: 695,
    image:
      "https://images.unsplash.com/photo-1695653435269-28a77c8a18b1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    desc: "Apple iPhone 15 Pro.",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1695653430946-2c3f4c0e3779?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "iPhone 15 Plus",
    desc: "Apple iPhone 15 Plus.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1695653433202-2b0d9d0a0a11?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "iPhone 14 Pro Max",
    desc: "Apple iPhone 14 Pro Max.",
    price: 645,
    image:
      "https://images.unsplash.com/photo-1695653428423-3f3f3e7d0d6a?q=80&w=1200&auto=format&fit=crop"
  }
];

/* —— Paleta “saktësisht si në foto” —— */
const COLORS = {
  pageBg: "#0c0c0e",
  cardBg: "#0f0f12",
  imageBg: "#0a0a0d",
  splitBar: "#0c0c0f",
  border: "#1a1a20",
  textMain: "#ffffff",
  textMuted: "#a1a8b3",
  price: "#ffffff",
  euro: "#ffffff",
  btnBg: "#ff7a00",
  btnHoverBg: "#ff9a3a",
  btnText: "#0b0b0f"
};

function formatPrice(n) {
  const val = Number(n ?? 0);
  // “€ 695” me hapësirë si në foto
  return `€ ${val.toLocaleString("de-DE")}`;
}

function ProductCard({ product, addToCart }) {
  const smallTitle =
    (product?.shortLabel ||
      product?.category ||
      product?.name ||
      "IPHONE")
      .toString()
      .trim()
      .toUpperCase();

  return (
    <Card
      sx={{
        bgcolor: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 2.5,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        display: "flex",
        flexDirection: "column",
        transition: "transform .16s ease, box-shadow .2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 16px 44px rgba(0,0,0,.45)"
        },
        minHeight: 420
      }}
    >
      {/* Zona e imazhit */}
      <Box
        sx={{
          p: 3,
          bgcolor: COLORS.imageBg,
          background:
            "radial-gradient(60% 50% at 50% 65%, rgba(255,122,0,0.10) 0%, rgba(10,10,13,0) 60%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 210
        }}
      >
        <img
          src={product.image || "https://via.placeholder.com/400x240?text=Product"}
          alt={product.name}
          style={{
            maxHeight: 180,
            width: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 12px 28px rgba(0,0,0,.45))"
          }}
        />
      </Box>

      {/* Shiriti i poshtëm (si në foto) */}
      <CardContent
        sx={{
          bgcolor: COLORS.splitBar,
          borderTop: `1px solid ${COLORS.border}`,
          px: 2.25,
          pt: 1.75,
          pb: 2
        }}
      >
        {/* Titulli i vogël UPPERCASE: “IPHONE” */}
        <Typography
          sx={{
            color: COLORS.textMain,
            fontSize: 12,
            letterSpacing: 1.2,
            fontWeight: 800,
            textTransform: "uppercase",
            mb: 1
          }}
        >
          {smallTitle}
        </Typography>

        {/* Çmimi i madh: “€ 695” */}
        <Typography
          sx={{
            color: COLORS.price,
            fontWeight: 900,
            fontSize: 28,
            lineHeight: 1.1,
            mb: 1.5
          }}
        >
          {formatPrice(product.price)}
        </Typography>

        {/* Butoni portokalli “SHTO NË SHPORTË” */}
        <Button
          onClick={() => addToCart(product)}
          fullWidth
          sx={{
            mt: 0.5,
            bgcolor: COLORS.btnBg,
            color: COLORS.btnText,
            fontWeight: 900,
            fontSize: 14.5,
            letterSpacing: 0.4,
            borderRadius: 999,
            textTransform: "uppercase",
            py: 1.1,
            boxShadow: "0 8px 18px rgba(255,122,0,.25)",
            "&:hover": {
              bgcolor: COLORS.btnHoverBg,
              boxShadow: "0 10px 24px rgba(255,154,58,.30)"
            }
          }}
        >
          SHTO NË SHPORTË
        </Button>
      </CardContent>
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
    const url = `${process.env.REACT_APP_API_URL || ""}/api/products`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(demoProducts);
        }
      })
      .catch(() => setProducts(demoProducts));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const inText =
      p.name?.toLowerCase().includes(q) ||
      p.desc?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q);
    const price = Number(p.price);
    const okMin = minPrice === "" || price >= Number(minPrice);
    const okMax = maxPrice === "" || price <= Number(maxPrice);
    return inText && okMin && okMax;
  });

  return (
    <Box sx={{ bgcolor: COLORS.pageBg, minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
        <Typography
          variant="h4"
          sx={{ color: COLORS.textMain, mb: 3, fontWeight: 800 }}
        >
          Të gjitha produktet
        </Typography>

        {/* Filtër/search në stil të errët */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 4, flexWrap: "wrap" }}>
          <Box
            component="input"
            type="text"
            placeholder="Kërko produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              p: 1.1,
              borderRadius: 2,
              border: `1px solid ${COLORS.border}`,
              bgcolor: "#0f141a",
              color: COLORS.textMain,
              minWidth: 240,
              fontSize: 16,
              outline: "none"
            }}
          />
          <Box
            component="input"
            type="number"
            placeholder="Çmimi minimal"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            sx={{
              p: 1.1,
              borderRadius: 2,
              border: `1px solid ${COLORS.border}`,
              bgcolor: "#0f141a",
              color: COLORS.textMain,
              minWidth: 160,
              fontSize: 16,
              outline: "none"
            }}
          />
          <Box
            component="input"
            type="number"
            placeholder="Çmimi maksimal"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{
              p: 1.1,
              borderRadius: 2,
              border: `1px solid ${COLORS.border}`,
              bgcolor: "#0f141a",
              color: COLORS.textMain,
              minWidth: 160,
              fontSize: 16,
              outline: "none"
            }}
          />
        </Box>

        {/* Gridi si në foto */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2.5,
            "@media (max-width: 1200px)": { gridTemplateColumns: "repeat(3, 1fr)" },
            "@media (max-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
            "@media (max-width: 600px)": { gridTemplateColumns: "1fr" }
          }}
        >
          {filtered.map((p) => (
            <Box key={p.id} sx={{ height: "100%" }}>
              <ProductCard product={p} addToCart={addToCart} />
            </Box>
          ))}
        </Box>

        {filtered.length === 0 && (
          <Typography
            sx={{
              color: COLORS.textMuted,
              textAlign: "center",
              width: "100%",
              py: 10,
              fontSize: 20,
              fontWeight: 600
            }}
          >
            S’ka produkte.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Products;
