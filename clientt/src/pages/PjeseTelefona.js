import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useCart } from '../CartContext'; // ndrysho path sipas strukturës tënde

const phoneParts = [
  {
    title: 'Ekran iPhone X/11/12/13',
    image: 'https://img.freepik.com/free-vector/neon-home-screen-template-smartphone_23-2148736060.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Ekran origjinal dhe OLED për të gjitha modelet më të kërkuara.',
    price: 49
  },
  {
    title: 'Bateri për Samsung & iPhone',
    image: 'https://img.freepik.com/free-photo/football-fan-accessories_23-2147827577.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Bateri me jetëgjatësi për performancë të lartë.',
    price: 19
  },
  {
    title: 'Kamera & Face ID Module',
    image: 'https://img.freepik.com/free-vector/security-cam-cctv-video-camera-street-observe-surveillance-equipment-front-side-angle-view_107791-2997.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Zëvendësim për kamera kryesore, selfie dhe module Face ID.',
    price: 35
  },
  {
    title: 'Altoparlant & mikrofon',
    image: 'https://img.freepik.com/free-photo/close-up-hand-holding-microphone_23-2148681178.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Altoparlant dhe mikrofon me zë të pastër për të gjitha modelet.',
    price: 12
  },
  {
    title: 'Kabllo & Aksesorë',
    image: 'https://img.freepik.com/free-vector/mobile-phone-smartphone-charging-set-with-isolated-wires-plugs-power-banks-adapters-with-bolt-sign-vector-illustration_1284-79391.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Kabllo karikimi, adapterë, mbrojtëse ekrani dhe më shumë.',
    price: 6
  },
  {
    title: 'Butona anësorë & home',
    image: 'https://img.freepik.com/free-vector/house-location-pin-red-black_78370-8743.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Butona anësorë, butoni home ose fingerprint për të gjitha modelet.',
    price: 8
  }
];

const PjeseTelefona = () => {
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
          Pjesë për Telefona
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {phoneParts.map((item, i) => (
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

export default PjeseTelefona;
