// src/pages/Home.js

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Typography } from "@mui/material";
import "./Home.css";
import Testimonials from "../components/Testimonials";
import { useCart } from "../CartContext";
import foto1 from "../assets/freepik__upload__70538-removebg-preview.png"; // Foto lokale
import fotto2 from "../assets/DSC06547_alt-removebg-preview.png"
import foto3 from "../assets/ChatGPT_Image_Jun_16__2025__02_13_41_PM-removebg-preview.png"
import foto from "../assets/ChatGPT_Image_Jun_16__2025__02_19_16_PM-removebg-preview.png"
import fotos from "../assets/freepik_br_2e5b1fb8-c95c-47e1-b93d-5f9180aa0737.png"
import fotet from "../assets/ChatGPT Image Jun 16, 2025, 02_36_14 PM-Photoroom.png"
const categories = [
  { label: "Të gjitha", value: "all" },
  { label: "Telefona", value: "phone" },
  { label: "Case", value: "case" },
  { label: "Gift Card", value: "giftcard" },
];

const demoProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    description: "Smartphone Apple, 256GB, 5G",
    category: "phone",
    price: 1099,
    oldPrice: 1199,
    image: foto1, // PNG lokale me background transparent
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "6.8” QHD+, 12GB RAM, 200MP kamera, S-Pen.",
    category: "phone",
    price: 1150,
    oldPrice: 1270,
    image: fotto2,
  },
  {
    id: 3,
    name: "Samsung Galaxy A55 5G",
    description: "6.6” Super AMOLED, 128GB/256GB, 50MP kamera, 5000mAh.",
    category: "phone",
    price: 390,
    oldPrice: 420,
    image: "https://img-resizer.cyberport.de/cp/images/684x684/240402125736400501900002E"
  },
  {
    id: 4,
    name: "Gift Card 100€",
    description: "Kartë dhurate për çdo rast.",
    category: "giftcard",
    price: 100,
    image: foto3,
  },
  {
    id: 5,
    name: "iPhone 15",
    description: "Apple iPhone 15, 128GB, Midnight Black",
    category: "phone",
    price: 1029,
    oldPrice: 1099,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"
  },
  {
    id: 6,
    name: "Samsung Galaxy Z Flip 5",
    description: "Telefon i palosshëm, 6.7” AMOLED, 8GB RAM, 3700mAh.",
    category: "phone",
    price: 780,
    oldPrice: 890,
    image: "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2024/03/samsung_flip_5.jpg"
  },
  {
    id: 7,
    name: "Clear Case for iPhone 15",
    description: "Mbrojtëse transparente për iPhone 15.",
    category: "case",
    price: 15,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MPT93?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1693511639266"
  },
  {
    id: 8,
    name: "Premium Case iPhone 14 Pro Max",
    description: "Case silikoni premium, anti-shock.",
    category: "case",
    price: 19,
    image: "https://www.elago.com/cdn/shop/products/S14SC67PRO-LBL_Amazon_62203cc8-edbe-4a74-af5d-9ccdf290cd96.jpg?v=1716938875"
  },
  {
    id: 9,
    name: "Leather Samsung Case",
    description: "Mbrojtëse lëkure premium për Samsung S24.",
    category: "case",
    price: 28,
    image: "https://m.media-amazon.com/images/I/718LKReM5iL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 10,
    name: "Gift Card 50€",
    description: "Kartë dhurate për çdo rast.",
    category: "giftcard",
    price: 50,
    image: foto,
  },
  {
    id: 11,
    name: "Gift Card 200€",
    description: "Dhuratë perfekte për familjarë.",
    category: "giftcard",
    price: 200,
    image: fotos,
  },
  // Vazhdon nga demoProducts tënd
{
  id: 12,
  name: "iPhone 15 Pro",
  description: "6.1” Super Retina XDR, 128GB, Kamera 48MP, Titanium.",
  category: "phone",
  price: 1199,
  oldPrice: 1299,
  image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
},
{
  id: 13,
  name: "Samsung Galaxy S23 FE",
  description: "6.4” FHD+, 8GB RAM, 128GB, 50MP kamera.",
  category: "phone",
  price: 600,
  oldPrice: 680,
  image: "https://adminapi.applegadgetsbd.com/storage/media/large/Cream-4265.jpg"
},
{
  id: 14,
  name: "Apple Watch Series 9",
  description: "GPS 45mm, Midnight Aluminium Case with Sport Band.",
  category: "phone",
  price: 459,
  oldPrice: 499,
  image: "https://snapcraze.co.za/wp-content/uploads/2023/11/series-9-45mm-black.jpeg"
},
{
  id: 15,
  name: "AirPods Pro (2nd Gen)",
  description: "Apple AirPods Pro me ANC, MagSafe Case.",
  category: "case",
  price: 239,
  oldPrice: 279,
  image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660803972361"
},
{
  id: 16,
  name: "Samsung Galaxy Buds2 Pro",
  description: "Wireless, ANC, 5-18h battery life, Bluetooth 5.3.",
  category: "case",
  price: 165,
  oldPrice: 199,
  image: "https://www.recellexchange.com/cdn/shop/files/3_214d8a6a-d399-4125-8d18-5a38e6ff8281.png?v=1689105780"
},
{
  id: 17,
  name: "iPhone 13",
  description: "128GB, 6.1” Super Retina XDR, 12MP kamera.",
  category: "phone",
  price: 829,
  oldPrice: 929,
  image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg"
},
{
  id: 18,
  name: "Samsung Galaxy M34 5G",
  description: "6.5” Super AMOLED, 8GB RAM, 6000mAh bateri.",
  category: "phone",
  price: 240,
  oldPrice: 299,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-kY1S5Lsht5gALPUicmv2CQfK5BFdSHliw&s"
},
{
  id: 19,
  name: "Gift Card 75€",
  description: "Dhuratë ideale për çdo rast.",
  category: "giftcard",
  price: 75,
  image: fotet,
},
{
  id: 20,
  name: "iPhone 15 Plus",
  description: "6.7” Super Retina XDR, 128GB, Dynamic Island.",
  category: "phone",
  price: 1099,
  oldPrice: 1199,
  image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg"
},
{
  id: 21,
  name: "Samsung Galaxy S22",
  description: "6.1” FHD+, 8GB RAM, Snapdragon 8 Gen 1.",
  category: "phone",
  price: 580,
  oldPrice: 650,
  image: "https://cdn.mos.cms.futurecdn.net/SdRAmQjQhsRwiKY9BHX3YU.jpg"
},
{
  id: 22,
  name: "OtterBox Defender for iPhone 14",
  description: "Mbrojtëse heavy-duty për iPhone 14, black.",
  category: "case",
  price: 29,
  oldPrice: 35,
  image: "https://www.caserace.net/cdn/shop/products/14PlusGrayBlue_2_-1.jpg?v=1669972725"
}

];

function ProductCard({ product, onAdd }) {
  return (
    <Card
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
      }}
    >
      {/* FOTO – format profesional */}
      <Box
        sx={{
          width: "100%",
          height: 180,
          background: "#fff",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 14px #0001"
        }}
      >
        <img
          src={product.image}
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
          onClick={() => onAdd(product)}>
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
      {/* HERO */}
      {/* ... pjesa e hero, kategori, testimonials, WHY, GIFT CARDS ... */}
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
      {/* WHY, GIFT CARDS, TESTIMONIALS dhe pjesa tjetër mbeten siç i ke */}
      <Testimonials />

      {(!loading && filteredProducts.length === 0) && (
        <div className="no-products">S’ka produkte.</div>
      )}

    </div>
  );
};

export default Home;
