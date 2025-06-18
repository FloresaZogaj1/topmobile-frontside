import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useCart } from "../CartContext";
// Importo imazhet lokale
import accesi1 from "../assets/magsafe-accessories-pp-header-removebg-preview.png";
import sec from "../assets/Gear_Samsung-Galaxy-Buds+-out-of-case-SOURCE-Samsung-removebg-preview.png";
import sec1 from "../assets/IMG_5705-removebg-preview.png";
import sec2 from "../assets/1100215719_rzfr37d.jpg.680x680_q85ss0_background-_fff-removebg-preview.png";

// Shembuj accessories (ndrysho ose shto më shumë sipas nevojës)
const accessories = [
  {
    id: 1,
    name: "AirPods Pro 2",
    desc: "Apple AirPods Pro (2nd Gen), ANC, MagSafe.",
    price: 239,
    image: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg"
  },
  {
    id: 2,
    name: "Baseus PowerBank 20.000mAh",
    desc: "Karikim i shpejtë, Type-C/USB, kapacitet i madh.",
    price: 49,
    image: "https://m.media-amazon.com/images/I/617tRSjs32L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 3,
    name: "Apple MagSafe Charger",
    desc: "Karikim wireless me MagSafe për iPhone dhe AirPods.",
    price: 45,
    image: accesi1,
  },
  {
    id: 4,
    name: "Samsung Galaxy Buds 2",
    desc: "Dëgjues wireless me ANC dhe bateri të gjatë.",
    price: 99,
    image: sec,
  },
  {
    id: 5,
    name: "Anker USB-C Hub",
    desc: "Hub 7 në 1 me porte USB, HDMI, SD, Type-C.",
    price: 65,
    image: sec1
  },
  {
    id: 6,
    name: "Spigen Rugged Armor Case",
    desc: "Mbështjellës i fortë dhe elegant për iPhone 15 Pro Max.",
    price: 29,
    image: sec2,
  },
];

const ProductsAccessories = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filtered = accessories.filter(p => {
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
          border: "none",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          p: 0,
          minHeight: 340,
          height: "100%",
          justifyContent: "space-between",
          transition: "none",
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
        Aksesorë – Për Top Mobile
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Box component="input"
          type="text"
          placeholder="Kërko aksesor..."
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
            <ProductCard p={p} />
          </Box>
        ))}
      </Box>
      {filtered.length === 0 && (
        <Typography sx={{ color: "#b2b2b2", textAlign: "center", width: "100%", py: 10, fontSize: 20, fontWeight: 600 }}>
          S’ka aksesorë.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsAccessories;
