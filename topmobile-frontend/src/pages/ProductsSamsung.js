import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useCart } from "../CartContext";
// Importo fotot
import fot from "../assets/S22C-removebg-preview-Photoroom.png";
import pic from "../assets/samsung-galaxy-s21-smartphone-040nNK3-600-removebg-preview.png";
import pic1 from "../assets/CHL412677_A25_5G_Back_Clear_Case-1600x1200-removebg-preview.png";
import pic2 from "../assets/samsung_galaxy_z_fold_5_5g_256gb_icy_blue1-fococlipping-standard_1-removebg-preview.png";
import pic3 from "../assets/Samsung-Galaxy-A15-5G-removebg-preview.png";
import picc from "../assets/003-galaxy-a55-5g-awesomeiceblue-back_1200x-removebg-preview.png";
import pics from "../assets/ZFlip-5-removebg-preview.png";

// Samsung produktet
const samsungProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    desc: "Ekran 6.8” QHD+, 200MP kamera, S-Pen.",
    price: 1150,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mQbgG1jZjeC8RkA8zM8x-sRqTGLij1VtMA&s"
  },
  {
    id: 2,
    name: "Samsung Galaxy A55",
    desc: "Ekran 6.6”, 128GB, bateri 5000mAh.",
    price: 380,
    image: picc,
  },
  {
    id: 3,
    name: "Samsung Galaxy Z Flip 5",
    desc: "Telefon i palosshëm, dizajn unik.",
    price: 790,
    image: pics,
  },
  {
    id: 4,
    name: "Samsung Galaxy S23 FE",
    desc: "Ekran 6.4”, kamera të avancuara, 5G.",
    price: 600,
    image: "https://clevercel.mx/cdn/shop/files/Portadas_SamsungS23FE.webp?v=1748624528"
  },
  {
    id: 5,
    name: "Samsung Galaxy S23 Ultra",
    desc: "Ekran 6.8”, 12GB RAM, 200MP kamera.",
    price: 1050,
    image: "https://static.vecteezy.com/system/resources/previews/022/722/945/non_2x/samsung-galaxy-s23-ultra-transparent-image-free-png.png"
  },
  {
    id: 6,
    name: "Samsung Galaxy A35",
    desc: "Ekran 6.6”, 128GB, 5000mAh bateri.",
    price: 310,
    image: "https://images.samsung.com/is/image/samsung/p6pim/za/sm-a356elbmafa/gallery/za-galaxy-a35-5g-sm-a356-sm-a356elbmafa-540434219?$684_547_PNG$"
  },
  {
    id: 7,
    name: "Samsung Galaxy S22",
    desc: "Ekran 6.1”,  8GB RAM.",
    price: 580,
    image: fot,
  },
  {
    id: 8,
    name: "Samsung Galaxy M34",
    desc: "Ekran 6.5”, kamera të avancuara, 5G.",
    price: 220,
    image: "https://images.samsung.com/is/image/samsung/p6pim/hk_en/sm-m346bdbptgy/gallery/hk-en-galaxy-m34-5g-sm-m346-sm-m346bdbptgy-538449778?$624_624_PNG$"
  },
  {
    id: 9,
    name: "Samsung Galaxy S21 FE",
    desc: "Ekran 6.4”, 128GB, 8GB RAM, 5G.",
    price: 420,
    image: pic,
  },
  {
    id: 10,
    name: "Samsung Galaxy A25",
    desc: "Ekran 6.5”, 128GB, bateri 5000mAh.",
    price: 235,
    image: pic1,
  },
  {
    id: 11,
    name: "Samsung Galaxy Z Fold 5",
    desc: "Ekran i palosshëm, 7.6”, 12GB RAM.",
    price: 1340,
    image: pic2,
  },
  {
    id: 12,
    name: "Samsung Galaxy A15",
    desc: "Ekran 6.5”, 128GB, kamera të avancuara.",
    price: 180,
    image: pic3,
  }
];

const ProductsSamsung = () => {
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  // Filtrim për Samsung
  const filtered = samsungProducts.filter(p => {
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
          minHeight: 320,
          height: "100%",
          justifyContent: "space-between",
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
        Samsung – Modelet më të kërkuara
      </Typography>
      {/* Filtrat si tek Gift Card */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Kërko produkt..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 7,
            border: "1px solid #ddd",
            minWidth: 220,
            fontSize: 16
          }}
        />
        <input
          type="number"
          min="0"
          placeholder="Çmimi minimal"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 7,
            border: "1px solid #ddd",
            minWidth: 120,
            fontSize: 16
          }}
        />
        <input
          type="number"
          min="0"
          placeholder="Çmimi maksimal"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 7,
            border: "1px solid #ddd",
            minWidth: 120,
            fontSize: 16
          }}
        />
      </div>

      {/* KTU FILLO GRID CUSTOM */}
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
      {/* FUNDI I GRID */}
      {filtered.length === 0 && (
        <Typography sx={{ color: "#b2b2b2", textAlign: "center", width: "100%", py: 10, fontSize: 20, fontWeight: 600 }}>
          S’ka produkte.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsSamsung;
