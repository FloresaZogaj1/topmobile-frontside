import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useCart } from "../CartContext";
import foto11 from "../assets/a0c2a517-ca1d-4129-9f3f-e69f131cd94a_size3840_cropCenter-removebg-preview.png";
import foto8 from "../assets/iphone-13-png--0b6bc714e9404b74a0c8-removebg-preview.png";
import foto12 from "../assets/Remove-bg.ai_1725099301061-800x800-removebg-preview.png";
import foto20 from "../assets/apple-iphone-11-pro-max-512gb-green-removebg-preview.png";

// iPhone produktet
const iphoneProducts = [
  { id: 1, name: "iPhone 15 Pro Max", desc: "6.7\" Super Retina XDR, 256GB, Kamera 48MP", price: 1240, image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_SY741_.jpg" },
  { id: 2, name: "iPhone 15 Pro", desc: "6.1\" Super Retina XDR, 128GB, Kamera 48MP", price: 1199, image: "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_SY741_.jpg" },
  { id: 3, name: "iPhone 15 Plus", desc: "6.7\" Super Retina XDR, 128GB, Kamera 48MP.", price: 1099, image: "https://www.reviews.org/app/uploads/2025/03/Pixel_9a_model-removebg-preview-300x300.webp" },
  { id: 4, name: "iPhone 14 Pro Max", desc: "6.7\" ProMotion, 256GB, Kamera 48MP.", price: 1099, image: "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_blue_pdp_image_position-1a_avail__en-in-removebg-preview.png" },
  { id: 5, name: "iPhone 14", desc: "6.1\" Liquid Retina, 128GB, Kamera 12MP.", price: 799, image: "https://www.pngplay.com/wp-content/uploads/15/iPhone-14-PNG-Free-File-Download.png" },
  { id: 6, name: "iPhone 13 Pro", desc: "6.1\" Super Retina XDR, 128GB, Kamera 12MP .", price: 899, image: "https://thephonepreneur.com/wp-content/uploads/2025/03/Apple_iPhone-13-Pro_iPhone-13-Pro-max-removebg-preview.png" },
  { id: 7, name: "iPhone SE (2022)", desc: "4.7\" Retina HD, Home Button me Touch ID.", price: 429, image: "https://best-magazin.com/image/cache/catalog/Apple/Iphone/Iphone%20SE%202022/Remove-bg.ai_1725130989745-800x800.png" },
  { id: 8, name: "iPhone 13", desc: "6.1\" Super Retina XDR, 128GB, Kamera 12MP.", price: 749, image: foto8 },
  { id: 9, name: "iPhone 13 Mini", desc: "5.4\" Super Retina XDR, 128GB,Kamera 12MP.", price: 699, image: foto11 },
  { id: 10, name: "iPhone 12 Pro Max", desc: "6.7\" Super Retina XDR, 256GB,Kamera 12MP.", price: 849, image: "https://sopiguard.com/cdn/shop/products/ip12pro3mbrgun.jpg?v=1603171476" },
  { id: 11, name: "iPhone 12", desc: "6.1\" Super Retina XDR, 128GB,Kamera 12MP.", price: 629, image: foto12 },
  { id: 12, name: "iPhone 11", desc: "6.1\" Liquid Retina, 128GB, Kamera 12MP.", price: 499, image: foto20 },
];

const ProductsIphone = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filtered = iphoneProducts.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()));
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  function ProductCard({ p }) {
    return (
      <Card
        sx={{
          borderRadius: 1.5,
          boxShadow: "none",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
          p: 0,
          minHeight: 320,
          height: "100%",
        }}
      >
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
            src={p.image}
            alt={p.name}
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
          <Typography fontWeight={600} fontSize={15} color="#222" sx={{ mb: .5 }}>
            {p.name}
          </Typography>
          <Typography color="#888" fontSize={13} sx={{ mb: 1, minHeight: 25 }}>
            {p.desc}
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
            onClick={() => addToCart(p)}
          >
            Shto në Shportë 🛒
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", py: 5, px: { xs: 1, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} color="#023047" mb={3}>
        iPhone – Modelet më të kërkuara
      </Typography>
      {/* Filtrat */}
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

      {/* GRID CUSTOM – si te Samsung/GiftCard */}
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
            <ProductCard p={p} />
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

export default ProductsIphone;
