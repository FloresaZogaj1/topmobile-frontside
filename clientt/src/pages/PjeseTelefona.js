// PjeseTelefona.jsx
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import "./ProductsIphone.css";     
import "./PjeseTelefonaSpecific.css"; // Styling specifik për këtë faqe
import SEO from "../seo/SEO";
import sherbimet1 from "../assets/f2ed6720-a942-4339-ae14-69b93919a4c0-removebg-preview.png";
import sherbimet2 from "../assets/top-view-storage-devices-assortment__1_-removebg-preview.png";
import sherbimet3 from "../assets/2616-removebg-preview.png";
import sherbimet4 from "../assets/photographer-s-hand-cuts-film-stipe-concrete-backdrop-removebg-preview.png"
import sherbimet5 from "../assets/2209.q803.026.F.m012.c7.mobile_phone_smartphone_charging_set-removebg-preview.png"
import sherbimet6 from "../assets/14082-removebg-preview.png";

const phoneParts = [
  {
    title: "Ekran iPhone X/11/12/13",
    image:sherbimet1,
    desc: "Ekrane origjinale për iPhone X deri iPhone 13. Kualitet i lartë, montim i shpejtë.",
  },
  {
    title: "Bateri për Samsung & iPhone",
    image: sherbimet2,
    desc: "Bateri të reja për të gjitha modelet kryesore, jetëgjatësi e garantuar.",
  },
  {
    title: "Kamera & Face ID Module",
    image: sherbimet3,
    desc: "Kamera dhe module Face ID për iPhone & Samsung. Instalimi profesional.",
  },
  {
    title: "Altoparlant & mikrofon",
    image: sherbimet4,
    desc: "Ndërrim i altoparlantit, mikrofonit dhe zgjidhje për çdo problem të zërit.",
  },
  {
    title: "Kabllo & Aksesorë",
    image: sherbimet5,
    desc: "Kabllo karikimi, data, powerbank, adapterë origjinalë për çdo model.",
  },
  {
    title: "Butona anësorë & home",
    image: sherbimet6,
    desc: "Riparim/ndërrim për butona volume, power, ose home.",
  },
];

const PjeseTelefona = () => {
  // JSON-LD: Breadcrumbs (Home > Shërbimet > Pjesë për Telefona)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Shërbimet", item: "https://topmobile.store/sherbimet" },
      { "@type": "ListItem", position: 3, name: "Pjesë për Telefona", item: "https://topmobile.store/sherbimet/telefona" },
    ],
  };

  // JSON-LD: Service + OfferCatalog me pjesët e listuara
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pjesë për Telefona",
    serviceType: "Pjesë zëvendësuese dhe instalim",
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
      name: "Katalogu i pjesëve",
      itemListElement: phoneParts.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.title,
          description: p.desc,
          image: p.image,
          category: "PhonePart",
          brand: "Top Mobile",
        },
      })),
    },
  };

  return (
    <Box className="iphone-page phone-parts-page" sx={{ bgcolor: "var(--bg)", minHeight: "100vh", py: { xs: 5, md: 8 } }}>
      {/* SEO */}
      <SEO
        title="Pjesë për Telefona"
        description="Pjesë origjinale dhe instalim profesional për iPhone & Samsung: ekrane, bateri, kamera, altoparlantë dhe më shumë. Shërbim i shpejtë në Prishtinë."
        url="https://topmobile.store/sherbimet/telefona"
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
          Pjesë për Telefona
        </Typography>

        <div className="products-grid">
          {phoneParts.map((item, i) => (
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
                <div className="product-category-label">Pjesë telefoni</div>
                
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
                    <span>📞</span>
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
            🔧 Shërbim Profesional i Riparimit
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>⚡ Riparim i shpejtë</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Shumica e riparimeve përfundojnë brenda 24 orëve
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>✅ Garanci 6 muaj</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Të gjitha pjesët dhe riparime vijnë me garanci
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "var(--primary)", mb: 1 }}>🎯 Pjesë origjinale</Typography>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Përdorim vetëm pjesë të cilësisë së lartë dhe origjinale
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PjeseTelefona;
