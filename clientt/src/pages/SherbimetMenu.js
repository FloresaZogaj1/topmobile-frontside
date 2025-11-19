import React from "react";
import { Box, Typography, Grid, Card, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ConstructionIcon from '@mui/icons-material/Construction';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HandymanIcon from '@mui/icons-material/Handyman';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const sherbimet = [
  {
    title: "Mirëmbajtja me kontratë",
    description: "Paketa të personalizuara për mirëmbajtjen e pajisjeve tuaja.",
    icon: <ConstructionIcon fontSize="large" sx={{ color: '#ff8000' }} />,
    link: "/sherbimet/mirembajtja"
  },
  {
    title: "Pjesë për Telefona",
    description: "Zëvendësim dhe shitje pjesësh origjinale: ekrane, bateri, etj.",
    icon: <PhoneIphoneIcon fontSize="large" sx={{ color: '#ff8000' }} />,
    link: "/sherbimet/telefona"
  },
  {
    title: "Pjesë për PlayStation",
    description: "Aksesorë për PS4/PS5: gamepad, kabllo, porta HDMI, etj.",
    icon: <SportsEsportsIcon fontSize="large" sx={{ color: '#ff8000' }} />,
    link: "/sherbimet/playstation"
  },
  {
    title: "Servisi",
    description: "Riparim për çështje teknike të të gjitha markave të telefonave.",
    icon: <HandymanIcon fontSize="large" sx={{ color: '#ff8000' }} />,
    link: "/sherbimet/servisi"
  },
  {
    title: "Asistencë Mobile",
    description: "Ndihmë për backup, konfigurime, këshilla dhe bartje të dhënash.",
    icon: <SupportAgentIcon fontSize="large" sx={{ color: '#ff8000' }} />,
    link: "/sherbimet/asistenca"
  }
];

const SherbimetMenu = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", py: 8, px: 2 }}>
      <Typography variant="h4" align="center" fontWeight={700} color="#ff8000" mb={6}>
        Shërbimet që ofrojmë
      </Typography>
      <Grid container spacing={4} justifyContent="center" maxWidth="lg" sx={{ mx: "auto" }}>
        {sherbimet.map((sherbimi, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                textAlign: "center",
                p: 4,
                backgroundColor: "#fff",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                transition: "transform .3s ease",
                "&:hover": {
                  transform: "translateY(-5px)"
                }
              }}
            >
              <Box sx={{
                width: 72,
                height: 72,
                mx: "auto",
                mb: 3,
                borderRadius: "50%",
                backgroundColor: "#ffe8d3", // pastel orange background
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {sherbimi.icon}
              </Box>
              <Typography variant="h6" color="#ff8000" fontWeight={700} mb={1}>
                {sherbimi.title}
              </Typography>
              <Typography variant="body2" color="#555" mb={3}>
                {sherbimi.description}
              </Typography>
              <Button
                component={Link}
                to={sherbimi.link}
                variant="contained"
                sx={{
                  backgroundColor: "#023047",
                  "&:hover": { backgroundColor: "#012c3a" },
                  textTransform: "none",
                  borderRadius: 3,
                  px: 4
                }}
              >
                Më shumë
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SherbimetMenu;
