import React, { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useCart } from "../CartContext";

// Importo fotot ekzistuese dhe placeholder-in
import sonyPs50 from "../assets/Sony-PSN-Giftcard-removebg-preview (1).png";
import sonyPs100 from "../assets/Sony-PSN-Giftcard-removebg-preview (1).png";
import appleCard25 from "../assets/bd222544351dcf84ac89c6f8ae62b264-removebg-preview.png";
import appleCard50 from "../assets/bd222544351dcf84ac89c6f8ae62b264-removebg-preview.png";
import appleCard100 from "../assets/bd222544351dcf84ac89c6f8ae62b264-removebg-preview.png";
import playStore10 from "../assets/51mwochEL-L._UF1000_1000_QL80_DpWeblab_-removebg-preview.png";
import playStore25 from "../assets/51mwochEL-L._UF1000_1000_QL80_DpWeblab_-removebg-preview.png";
import playStore50 from "../assets/51mwochEL-L._UF1000_1000_QL80_DpWeblab_-removebg-preview.png";
import giftPlaceholder from "../assets/ChatGPT_Image_Jun_23__2025__02_58_35_PM-removebg-preview.png";
import  giftPlaceholder1 from "../assets/ChatGPT_Image_Jun_23__2025__02_59_37_PM-removebg-preview.png";
import giftPlaceholder2 from "../assets/ChatGPT_Image_Jun_23__2025__03_19_10_PM-removebg-preview.png";
 import giftPlaceholder3 from "../assets/ChatGPT_Image_Jun_23__2025__03_21_13_PM-removebg-preview.png";
 import giftPlaceholder4 from "../assets/ChatGPT_Image_Jun_23__2025__03_24_19_PM-removebg-preview.png";
 import giftPlaceholder5 from "../assets/ChatGPT_Image_Jun_23__2025__03_26_42_PM-removebg-preview.png";
 import giftPlaceholder6 from "../assets/ChatGPT_Image_Jun_23__2025__03_29_34_PM-removebg-preview.png";
import gfs from "../assets/ChatGPT_Image_Jun_23__2025__03_31_56_PM-removebg-preview.png"


const allGiftCards = [
  {
    id: 6,
    name: "Sony PS Network Card 50€",
    desc: "Kartë dhurate për blerje në PlayStation Store.",
    price: 50,
    image: sonyPs50,
  },
  {
    id: 7,
    name: "Sony PS Network Card 100€",
    desc: "Kartë dhurate për blerje në PlayStation Store.",
    price: 100,
    image: sonyPs100,
  },
  // Apple Gift Cards
  {
    id: 8,
    name: "Apple Gift Card 25€",
    desc: "Kartë dhurate për blerje në App Store dhe iTunes.",
    price: 25,
    image: appleCard25,
  },
  {
    id: 9,
    name: "Apple Gift Card 50€",
    desc: "Kartë dhurate për blerje në App Store dhe iTunes.",
    price: 50,
    image: appleCard50,
  },
  {
    id: 10,
    name: "Apple Gift Card 100€",
    desc: "Kartë dhurate për blerje në App Store dhe iTunes.",
    price: 100,
    image: appleCard100,
  },
  // Play Store Gift Cards
  {
    id: 11,
    name: "Play Store Card 10€",
    desc: "Kartë dhurate për blerje në Google Play Store.",
    price: 10,
    image: playStore10,
  },
  {
    id: 12,
    name: "Play Store Card 25€",
    desc: "Kartë dhurate për blerje në Google Play Store.",
    price: 25,
    image: playStore25,
  },
  {
    id: 13,
    name: "Play Store Card 50€",
    desc: "Kartë dhurate për blerje në Google Play Store.",
    price: 50,
    image: playStore50,
  },
  // Top Mobile Gift Cards (me placeholder)
  {
    id: 20,
    name: "Top Mobile Gift Card 5€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 5,
    image: giftPlaceholder,
  },
  {
    id: 21,
    name: "Top Mobile Gift Card 10€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 10,
    image: giftPlaceholder2,
  },
  {
    id: 22,
    name: "Top Mobile Gift Card 20€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 20,
    image: giftPlaceholder1,
  },
  {
    id: 23,
    name: "Top Mobile Gift Card 30€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 30,
    image: giftPlaceholder3,
  },
  {
    id: 24,
    name: "Top Mobile Gift Card 50€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 50,
    image: giftPlaceholder4,
  },
  {
    id: 25,
    name: "Top Mobile Gift Card 70€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 70,
    image: giftPlaceholder5,
  },
  {
    id: 26,
    name: "Top Mobile Gift Card 100€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 100,
    image: giftPlaceholder6,
  },
  {
    id: 27,
    name: "Top Mobile Gift Card 200€",
    desc: "Kartë dhurate nga Top Mobile për çdo rast.",
    price: 150,
    image: gfs,
  },
];

// Dropdown unik nga emrat e kartave
const uniqueNames = Array.from(new Set(allGiftCards.map(p => p.name)));
const categories = [
  { value: "all", label: "Të gjitha" },
  ...uniqueNames.map(n => ({ value: n, label: n }))
];

const ProductsGiftCard = () => {
  const { addToCart } = useCart(); // Mund ta heqësh nëse nuk përdor më
  const [name, setName] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  // Filtrim për Gift Cards
  const filtered = allGiftCards.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()));
    const matchesName = name === "all" || p.name === name;
    const price = Number(p.price);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesSearch && matchesName && matchesMin && matchesMax;
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", py: 5, px: { xs: 1, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} color="#023047" mb={3}>
        Gift Card – Zgjedhje të preferuara
      </Typography>
      {/* Filtrat */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Kërko kartë..."
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
          S’ka karta.
        </Typography>
      )}
    </Box>
  );
};

export default ProductsGiftCard;
