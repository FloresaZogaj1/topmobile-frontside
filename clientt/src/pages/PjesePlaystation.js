// /pages/PjesePlaystation.jsx
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import "./ProductsIphone.css";     // tema dark + utilitët
import "./PjeseTelefonaSpecific.css"; // Styling specifik 3x3 grid

import SEO from "../seo/SEO";


import pjes1 from "../assets/88768-OIFDA2-436-removebg-preview.png";
import pjes2 from "../assets/49191-removebg-preview.png";
import pjes3 from "../assets/circuit-board-close-up-with-different-components-removebg-preview.png";
import pjes4 from "../assets/top-view-virtual-reality-headset-white-headphones-removebg-preview.png";
import pjes5 from "../assets/7082609-removebg-preview.png";
import pjes6 from "../assets/high-angle-controller-with-vr-glasses-removebg-preview.png";

const psParts = [
  {
    title: "Gamepad DualShock/DualSense",
    image: pjes1,
    desc: "Kontrollorë origjinalë dhe të certifikuar për PS4 & PS5.",
  },
  {
    title: "Ventilator për PS4/PS5",
    image: pjes2,
    desc: "Zëvendësim për ftohësin e brendshëm për ruajtje performance.",
  },
  {
    title: "Porta HDMI",
    image: pjes3,
    desc: "Riparim ose ndërrim i portës HDMI me pajisje profesionale.",
  },
  {
    title: "Kabllo dhe aksesorë",
    image: pjes4,
    desc: "Kabllo karikimi, kabllo HDMI, USB-C dhe më shumë.",
  },
  {
    title: "SSD 1TB për PS",
    image: pjes5,
    desc: "SSD me shpejtësi të lartë leximi dhe shkkrimi për ruajtje të qëndrueshme.",
  },
  {
    title: "Modul WiFi për PS",
    image: pjes6,
    desc: "Modul WiFi me lidhje të qëndrueshme dhe shpejtësi të lartë për lojë pa ndërprerje.",
  },
];

const PjesePlaystation = () => {
  // JSON-LD: Breadcrumbs (Home > Shërbimet > Pjesë për PlayStation)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Shërbimet", item: "https://topmobile.store/sherbimet" },
      { "@type": "ListItem", position: 3, name: "Pjesë për PlayStation", item: "https://topmobile.store/sherbimet/playstation" },
    ],
  };

  // JSON-LD: Service + OfferCatalog
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pjesë për PlayStation",
    serviceType: "Pjesë zëvendësuese dhe instalim për PlayStation",
    areaServed: "Kosovo",
    provider: {
      "@type": "Organization",
      name: "Top Mobile",
      url: "https://topmobile.store/",
      telephone: "+38345407222",
      address: { "@type": "PostalAddress", addressLocality: "Prishtinë", addressCountry: "XK" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Katalogu i pjesëve për PlayStation",
      itemListElement: psParts.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.title,
          description: p.desc,
          image: p.image,
          category: "GameConsolePart",
          brand: "Top Mobile",
        },
      })),
    },
  };

  return (
    <Box className="iphone-page phone-parts-page" sx={{ bgcolor: "var(--bg)", minHeight: "100vh", py: { xs: 5, md: 8 } }}>
      {/* SEO */}
      <SEO
        title="Pjesë për PlayStation"
        description="Pjesë dhe instalim profesional për PlayStation: gamepad, ventilatorë, porta HDMI, kabllo & aksesorë, SSD, module WiFi."
        url="https://topmobile.store/sherbimet/playstation"
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>

      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          fontWeight={900}
          className="iphone-title"
          sx={{ color: "var(--text)", textAlign: "center", mb: 4, fontSize: { xs: 24, md: 34 } }}
        >
          Pjesë për PlayStation
        </Typography>

        <div className="products-grid">
          {psParts.map((item, i) => (
            <div key={i} className="modern-product-card">
              {/* Service Badge */}
              <div className="product-new-badge">SHËRBIM</div>
              
              {/* Product Image */}
              <div className="modern-product-image">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://topmobile.store/og-image.jpg")}
                />
              </div>
              
              {/* Product Info */}
              <div className="modern-product-info">
                <div className="product-category-label">PlayStation</div>
                
                <Typography className="modern-product-title" variant="h6">
                  {item.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "var(--text-secondary)", 
                    mb: 2,
                    lineHeight: 1.5,
                    fontSize: "14px"
                  }}
                >
                  {item.desc}
                </Typography>
                
                <div className="modern-product-buttons">
                  <button 
                    className="btn-buy-now"
                    onClick={() => window.open('tel:+38345407222', '_self')}
                  >
                    <span>🎮</span>
                    Kontakto për çmim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Info Section */}
        <Box sx={{ mt: 6, p: 4, background: "var(--bg-card)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--border-subtle)" }}>
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{ color: "var(--text-primary)", mb: 2, textAlign: "center" }}
          >
            🎮 Shërbim Profesional PlayStation
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>⚡ Riparim i shpejtë</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Riparime PlayStation brenda 48 orëve
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>✅ Garanci 6 muaj</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Të gjitha pjesët dhe riparime me garanci të plotë
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>🎯 Pjesë origjinale</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Vetëm pjesë të certifikuara dhe të cilësisë së lartë
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PjesePlaystation;
