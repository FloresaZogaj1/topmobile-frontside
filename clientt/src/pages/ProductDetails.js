import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Tab, Tabs, Paper } from "@mui/material";
import demoProducts from "../data/products";
import iphoneProducts from "../data/productsiphone";
import samsungProducts from "../data/samsungproducts";
import accessoriesproducts from "../data/accesoriesproducts";
import { useCart } from "../CartContext"; // <- Importo CartContext

const allProducts = [
  ...demoProducts,
  ...iphoneProducts,
  ...samsungProducts,
  ...accessoriesproducts,
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // <- Merr funksionin e shtimit në cart

  const product = allProducts.find(p => p.id === id);

  const [tab, setTab] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) return <div>Produkti nuk u gjet.</div>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4 }}>
      {/* Kthehu mbrapa */}
      <Button onClick={() => navigate(-1)} sx={{ mb: 3, color: "#ff8000" }}>
        &larr; Kthehu te produktet
      </Button>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Galeri Foto */}
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src={product.images[imgIdx]}
            alt={product.name}
            sx={{
              width: "100%",
              maxWidth: 350,
              height: 320,
              objectFit: "contain",
              borderRadius: 2,
              mb: 2,
              boxShadow: "0 2px 24px #0001"
            }}
          />
          {/* Thumbnails */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {product.images.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={product.name + " " + (idx + 1)}
                sx={{
                  width: 64,
                  height: 48,
                  objectFit: "contain",
                  borderRadius: 1,
                  border: imgIdx === idx ? "2px solid #ff8000" : "1px solid #eee",
                  cursor: "pointer"
                }}
                onClick={() => setImgIdx(idx)}
              />
            ))}
          </Box>
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>{product.name}</Typography>
          <Typography color="warning.main" sx={{ fontSize: 25, fontWeight: 700 }}>
            €{product.price}
          </Typography>
          {product.oldPrice && (
            <Typography sx={{ textDecoration: "line-through", color: "#bbb", mb: 1 }}>
              €{product.oldPrice}
            </Typography>
          )}

          {/* Shto ne shporte */}
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{ my: 2 }}
            onClick={() => addToCart(product)} // <- Kjo është ajo që të mungonte!
          >
            Shto në Shportë 🛒
          </Button>

          {/* Tabs për Përshkrim & Specifikime */}
          <Paper sx={{ mt: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Përshkrimi" />
              <Tab label="Specifikime" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              {tab === 0 && <Typography>{product.description}</Typography>}
              {tab === 1 && (
                <Box component="ul" sx={{ pl: 3 }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {val}
                    </li>
                  ))}
                  {Object.keys(product.specs).length === 0 && (
                    <Typography color="#888">Ky produkt nuk ka specifika të detajuara.</Typography>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
