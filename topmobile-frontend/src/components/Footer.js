import React from "react";
import { Box, Container, Grid, Typography, IconButton, Stack, Divider } from "@mui/material";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from "react-icons/si";

const Footer = () => (
  <Box sx={{ bgcolor: "#fff", borderTop: "1.5px solid #eee", mt: 7, pb: 1 }}>
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <Grid container spacing={4} justifyContent="space-between">
        {/* Logo & Kontakt */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h5" fontWeight="bold" color="#ff8000" sx={{ letterSpacing: 1, mb: 1 }}>
            Top Mobile
          </Typography>
          <Typography fontSize={15} mb={1}>Ulpiane, Prishtinë</Typography>
          <Typography fontSize={15} mb={1}>Tel: <a href="tel:+38344123456" style={{color:'#ff8000'}}>045 407 222 | 044 723 123</a></Typography>
          <Typography fontSize={15}>Email: <a href="mailto:topmobileshopservice@gmail.com" style={{color:'#ff8000'}}>topmobileshopservice@gmail.com</a></Typography>
        </Grid>
        {/* Menu */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography fontWeight={600} mb={1} color="#50577a">Meny</Typography>
          <Stack spacing={1}>
            <a href="/products" style={{ color: "#50577a", textDecoration: "none" }}>Produktet</a>
            <a href="/cart" style={{ color: "#50577a", textDecoration: "none" }}>Shporta</a>
            <a href="/contact" style={{ color: "#50577a", textDecoration: "none" }}>Na Kontakto</a>
            <a href="/about" style={{ color: "#50577a", textDecoration: "none" }}>Rreth Nesh</a>
          </Stack>
        </Grid>
        {/* Social & Pagesat */}
        <Grid item xs={12} sm={4} md={4}>
          <Typography fontWeight={600} mb={1} color="#50577a">Na ndiqni</Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#4267B2" }}><FaFacebook /></IconButton>
            <IconButton href="https://www.instagram.com/topmobile.rks/" target="_blank" sx={{ color: "#C13584" }}><FaInstagram /></IconButton>
            <IconButton href="https://tiktok.com" target="_blank" sx={{ color: "#000" }}><FaTiktok /></IconButton>
            <IconButton href="https://wa.me/38344723123" target="_blank" sx={{ color: "#25D366" }}><FaWhatsapp /></IconButton>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <Typography fontWeight={600} mb={1} color="#50577a">Pagesat</Typography>
          <Stack direction="row" spacing={2}>
            <SiVisa size={30} color="#0053A0" />
            <SiMastercard size={30} color="#EB001B" />
            <SiApplepay size={30} color="#333" />
            <SiGooglepay size={30} color="#1a73e8" />
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography textAlign="center" fontSize={15} color="#888">
        © {new Date().getFullYear()} Top Mobile. Të gjitha të drejtat e rezervuara.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
