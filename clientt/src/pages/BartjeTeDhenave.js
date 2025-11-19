// /pages/BartjeTeDhenave.jsx
import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import "./ProductsIphone.css"; // theme
import "./PjeseTelefonaSpecific.css"; // grid styling
import SEO from "../seo/SEO";

const services = [
  {
    title: "Transferim i kontakteve",
    desc: "Kalojmë kontaktet tuaja në pajisjen e re me saktësi 100%.",
    icon: "👤",
  },
  {
    title: "Transferim i fotove dhe videove",
    desc: "Backup + migrim i bibliotekës suaj me strukturë dhe cilësi të plotë.",
    icon: "📷",
  },
  {
    title: "Migrim i aplikacioneve",
    desc: "Ndihmë në ri-instalimin dhe rikthimin e të dhënave të aplikacioneve.",
    icon: "📲",
  },
  {
    title: "Backup në cloud",
    desc: "Konfigurim iCloud/Google Drive/OneDrive sipas nevojës suaj.",
    icon: "☁️",
  },
  {
    title: "Transferim WhatsApp",
    desc: "Rikthim i bisedave dhe mediave (Android ↔ iPhone).",
    icon: "🟢",
  },
  {
    title: "Siguri dhe privatësi",
    desc: "Migrim i sigurt, pa humbje të dhënash dhe me privatësi maksimale.",
    icon: "🔐",
  },
];

export default function BartjeTeDhenave() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Shërbimet", item: "https://topmobile.store/sherbimet" },
      { "@type": "ListItem", position: 3, name: "Bartje e të Dhënave", item: "https://topmobile.store/sherbimet/bartje" },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bartje e të Dhënave",
    serviceType: "Backup, migrim dhe transferim i të dhënave mes pajisjeve",
    areaServed: "Kosovo",
    provider: {
      "@type": "Organization",
      name: "Top Mobile",
      url: "https://topmobile.store/",
      telephone: "+38345407222",
      address: { "@type": "PostalAddress", addressLocality: "Prishtinë", addressCountry: "XK" },
    },
  };

  return (
    <Box className="iphone-page phone-parts-page" sx={{ bgcolor: "var(--bg)", minHeight: "100vh", py: { xs: 5, md: 8 } }}>
      <SEO
        title="Bartje e të Dhënave"
        description="Transferim profesional i kontakteve, fotove, videove, aplikacioneve dhe WhatsApp me siguri maksimale."
        url="https://topmobile.store/sherbimet/bartje"
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>

      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" fontWeight={900} className="iphone-title" sx={{ color: "var(--text)", textAlign: "center", mb: 4, fontSize: { xs: 24, md: 34 } }}>
          Bartje e të Dhënave
        </Typography>

        <div className="products-grid">
          {services.map((s, i) => (
            <div key={i} className="modern-product-card">
              <div className="product-new-badge">SHËRBIM</div>
              <div className="modern-product-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
                <span aria-hidden>{s.icon}</span>
              </div>
              <div className="modern-product-info">
                <div className="product-category-label">Migrim & Backup</div>
                <Typography className="modern-product-title" variant="h6">{s.title}</Typography>
                <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 2, lineHeight: 1.5, fontSize: "14px" }}>{s.desc}</Typography>
                <div className="modern-product-buttons">
                  <button className="btn-buy-now" onClick={() => window.open('https://wa.me/38345407222', '_blank')}>
                    <span>🟢</span>
                    Shkruaj në WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
}
