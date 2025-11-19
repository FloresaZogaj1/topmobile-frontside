// /pages/AsistencaMobile.jsx
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import "./ProductsIphone.css"; // ⬅️ tema dark: var(--bg), --text, --muted, --accent, .iphone-page, .iphone-title
import "./PjeseTelefonaSpecific.css"; // Styling specifik 3x3 grid
import a from "../assets/43165-removebg-preview (2).png";
import b from "../assets/close-up-man-working-with-mobile-laptop-removebg-preview.png";
import c from "../assets/member-log-membership-username-password-concept__2_-removebg-preview.png";
import d from "../assets/close-up-woman-giving-credit-card-details-phone-removebg-preview.png";
import e from "../assets/faqs-customer-service-icon-concept-removebg-preview.png";
import f from "../assets/technology-technical-assistance-repair-conceopt-removebg-preview.png"
const assistanceParts = [
  {
    title: "Transferim të dhënash",
   image:a,
    desc: "Transferim profesional i kontakteve, fotove dhe të dhënave nga telefoni i vjetër në të ri.",
  },
  {
    title: "Konfigurim iCloud/Google",
    image:[b],
    desc: "Konfigurim dhe sinkronizim i plotë i iCloud, Google Account, backup dhe rikthim.",
  },
  {
    title: "Rivendosje passwordi & account",
    image:[c],    desc: "Rivendosje e sigurt e fjalëkalimit ose akses në llogari të bllokuar.",
  },

  {
    title: "Aktivizim SIM dhe shërbime",
    image:[d],
    desc: "Aktivizim SIM, skanim QR për eSIM, konfigurim rrjeti.",
  },
  {
    title: "Pastrimi memorie & optimizim",
    image:[e],
    desc: "Fshirje file-ve të panevojshme, optimizim i shpejtësisë dhe hapësirës.",
  },
  {
    title: "Asistencë për aplikacione",
    image:
[f]   , desc: "Instalim, konfigurim ose përditësim i aplikacioneve në çdo pajisje.",
  },
];

const AsistencaMobile = () => {
  return (
    <Box className="iphone-page phone-parts-page" sx={{ bgcolor: "var(--bg)", minHeight: "100vh", py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={900}
          className="iphone-title"
          sx={{ color: "var(--text)", textAlign: "center", mb: 4, fontSize: { xs: 24, md: 34 } }}
        >
          Asistenca Mobile
        </Typography>

        <div className="products-grid">
          {assistanceParts.map((item, i) => (
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
                <div className="product-category-label">Asistencë & Mbështetje</div>
                
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
                    <span>📱</span>
                    Kontakto për ndihmë
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
            📱 Asistencë Mobile Profesionale
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>⚡ Mbështetje e shpejtë</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Zgjidhje të menjëhershme për problemet tuaja
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>🔒 Siguri e plotë</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Të dhënat tuaja janë të sigurta gjatë transferimit
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>👨‍💻 Ekspertë të trajnuar</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Stafi i trajnuar për të gjitha llojet e pajisjeve
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AsistencaMobile;
