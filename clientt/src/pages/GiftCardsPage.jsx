// /pages/GiftCardsPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductsGiftCard from "./ProductsGiftCard";
import SEO from "../seo/SEO";
import "./GiftCardsPage.css";

const GiftCardsPage = () => {
  // scroll i butë pa ndryshuar strukturën (opsional, por i dobishëm në mobile)
  const handleScroll = (e) => {
    e.preventDefault();
    const el = document.getElementById("gift-products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box className="giftcards-page" sx={{ bgcolor: "#000", color: "#fff" }}>
      {/* SEO */}
      <SEO
        title="Gift Cards – Top Mobile"
        description="Kartat dhuratë të para në treg për teknologjinë. Bli PSN, Apple, Google Play dhe Top Mobile Gift Cards."
        url="https://topmobile.store/gift-cards"
        image="https://topmobile.store/og-giftcards.jpg"
      />

      {/* HERO SECTION */}
      <Box
        className="giftcards-hero"
        sx={{
          textAlign: "center",
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          sx={{
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: "clamp(26px, 8vw, 36px)", md: 48 },
            lineHeight: 1.05,
            letterSpacing: ".02em",
            textTransform: "uppercase",
          }}
        >
          GIFT CARDS
        </Typography>

        <Typography
          sx={{
            mb: { xs: 3, md: 4 },
            fontSize: { xs: "clamp(14px, 4vw, 16px)", md: 18 },
            maxWidth: 700,
            mx: "auto",
            color: "#b9b3a0",
          }}
        >
          Sjellim të parët kartat dhuratë për produktet më të njohura të teknologjisë.
        </Typography>

        <Link to="#gift-products" onClick={handleScroll}>
          <Button
            variant="contained"
            className="btn-accent"
            sx={{
              fontSize: { xs: "clamp(14px, 4vw, 16px)", md: 18 },
              px: { xs: 3.2, md: 4 },
              py: { xs: 1.1, md: 1.5 },
              width: { xs: "100%", sm: "auto" },
              borderRadius: 999,
              fontWeight: 900,
            }}
          >
            BLEJ TANI
          </Button>
        </Link>
      </Box>

      {/* PRODUCTS SECTION */}
      <Box
        id="gift-products"
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3 },
          maxWidth: 1280,
          mx: "auto",
          width: "100%",
        }}
      >
        <ProductsGiftCard />
      </Box>
    </Box>
  );
};

export default GiftCardsPage;
