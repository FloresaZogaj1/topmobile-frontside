import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useCart } from '../CartContext'; // ndrysho path sipas strukturës tënde

const psParts = [
  {
    title: 'Gamepad DualShock/DualSense',
    image: 'https://img.freepik.com/free-photo/activity-control-cable-relaxation-station_1172-483.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Kontrollorë origjinalë dhe të certifikuar për PS4 & PS5.',
    price: 49
  },
  {
    title: 'Ventilator për PS4/PS5',
    image: 'https://img.freepik.com/free-vector/realistic-ventilation-template_1284-45259.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Zëvendësim për ftohësin e brendshëm për ruajtje performance.',
    price: 22
  },
  {
    title: 'Porta HDMI',
    image: 'https://img.freepik.com/free-photo/usb-charging-gadgets-blurred-background-room-close-up-concept-technology-everyday-life_169016-15480.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Riparim ose ndërrim i portës HDMI me pajisje profesionale.',
    price: 14
  },
  {
    title: 'Kabllo dhe aksesorë',
    image: 'https://img.freepik.com/free-vector/broken-usb-cables-wires-illustration_74855-18228.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Kabllo karikimi, kabllo HDMI, USB-C dhe më shumë.',
    price: 9
  },
  {
    title: 'SSD 1TB për PS',
    image: 'https://img.freepik.com/free-vector/gradient-hard-drive-illustration_23-2149377019.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'SSD me shpejtësi të lartë leximi dhe shkkrimi për ruajtje të qëndrueshme.',
    price: 69
  },
  {
    title: 'Modul WiFi për PS',
    image: 'https://img.freepik.com/free-photo/high-angle-wi-fi-router-with-vacuum-cleaner_23-2148779238.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Modul WiFi me lidhje të qëndrueshme dhe shpejtësi të lartë për lojë pa ndërprerje.',
    price: 18
  }
];

const PjesePlaystation = () => {
  const { addToCart } = useCart();

  return (
    <Box sx={{ bgcolor: '#f9fafd', minHeight: '100vh', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          sx={{
            color: '#023047',
            letterSpacing: 0.5,
            mb: 4,
            fontSize: { xs: 24, md: 34 }
          }}
        >
          Pjesë për PlayStation
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {psParts.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 3px 18px #0230470b',
                  bgcolor: '#fff',
                  maxWidth: 330,
                  minHeight: 330,
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  p: 0,
                  transition: 'box-shadow .13s, transform .13s',
                  '&:hover': {
                    boxShadow: '0 10px 30px #ff800018',
                    transform: 'translateY(-3px) scale(1.01)'
                  }
                }}
                elevation={0}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: 130,
                    objectFit: 'cover',
                    borderRadius: '14px 14px 0 0'
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    px: 2,
                    py: 1.5
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ color: '#023047', mb: 0.5, fontSize: 16 }}
                    noWrap
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#50577a',
                      mb: 1,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: 14,
                      minHeight: 38
                    }}
                  >
                    {item.desc}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: '#ff8000',
                      fontWeight: 700,
                      fontSize: 16,
                      mt: 1
                    }}
                  >
                    {item.price}€
                  </Typography>
                </CardContent>
                <Box sx={{ width: '100%', px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#023047',
                      color: '#fff',
                      fontWeight: 700,
                      borderRadius: 2,
                      fontSize: 14,
                      py: 1,
                      textTransform: 'none',
                      transition: '.13s',
                      '&:hover': { bgcolor: '#ff8000', color: '#fff' }
                    }}
                    onClick={() => addToCart(item)}
                  >
                    Shto në Shportë
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PjesePlaystation;
