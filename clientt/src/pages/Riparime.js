// /pages/Riparime.jsx
import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import "./ProductsIphone.css";
import "./PjeseTelefonaSpecific.css";
import SEO from "../seo/SEO";

const repairs = [
  { title: "Ndërrim ekrani", icon: "📱", desc: "Zëvendësim ekranesh origjinale për shumicën e modeleve." },
  { title: "Ndërrim baterie", icon: "🔋", desc: "Bateri të reja me garanci 6 muaj." },
  { title: "Porte karikimi", icon: "🔌", desc: "Riparim/ndërrim i portës së karikimit." },
  { title: "Sensorë & kamera", icon: "📷", desc: "Riparim kamerash, sensorë afërsie dhe FaceID/TouchID (kur është e mundur)." },
  { title: "Audio & mikrofon", icon: "🎤", desc: "Zë i qartë, rikthim i altoparlantit dhe mikrofonit." },
  { title: "Board-level", icon: "🧰", desc: "Diagnozë për IC power/charging, rripje, reballing (vetëm modele të përzgjedhura)." },
];

export default function Riparime() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Shërbimet", item: "https://topmobile.store/sherbimet" },
      { "@type": "ListItem", position: 3, name: "Riparime", item: "https://topmobile.store/sherbimet/riparime" },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Riparime telefonash",
    serviceType: "Shërbime riparimi për smartphone dhe pajisje të tjera",
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
        title="Riparime"
        description="Riparim profesional i telefonave: ekrane, bateri, porte karikimi, kamera, audio, diagnozë board-level."
        url="https://topmobile.store/sherbimet/riparime"
        image="https://topmobile.store/og-image.jpg"
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>

      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" fontWeight={900} className="iphone-title" sx={{ color: "var(--text)", textAlign: "center", mb: 4, fontSize: { xs: 24, md: 34 } }}>
          Riparime
        </Typography>

        <div className="products-grid">
          {repairs.map((s, i) => (
            <div key={i} className="modern-product-card">
              <div className="product-new-badge">SHËRBIM</div>
              <div className="modern-product-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
                <span aria-hidden>{s.icon}</span>
              </div>
              <div className="modern-product-info">
                <div className="product-category-label">Riparime</div>
                <Typography className="modern-product-title" variant="h6">{s.title}</Typography>
                <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 2, lineHeight: 1.5, fontSize: "14px" }}>{s.desc}</Typography>
                <div className="modern-product-buttons">
                  <button className="btn-buy-now" onClick={() => window.open('tel:+38345407222', '_self')}>
                    <span>🔧</span>
                    Kontakto për çmim
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
