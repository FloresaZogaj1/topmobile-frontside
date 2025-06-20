import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia} from '@mui/material';

const assistanceParts = [
  {
    title: 'Transferim të dhënash',
    image: 'https://img.freepik.com/free-vector/concept-landing-page-image-upload_52683-26839.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Transferim profesional i kontakteve, fotove dhe të dhënave nga telefoni i vjetër në të ri.',
  },
  {
    title: 'Konfigurim iCloud/Google',
    image: 'https://img.freepik.com/free-photo/close-up-man-working-with-mobile-laptop_1134-55.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Konfigurim dhe sinkronizim i plotë i iCloud, Google Account, backup dhe rikthim.',
  },
  {
    title: 'Rivendosje passwordi & account',
    image: 'https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Rivendosje e sigurt e fjalëkalimit ose akses në llogari të bllokuar.',
  },
  {
    title: 'Aktivizim SIM dhe shërbime',
    image: 'https://img.freepik.com/free-photo/top-view-hand-holding-sim-card-with-smartphone-copy-space_23-2148779252.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Aktivizim SIM, skanim QR për eSIM, konfigurim rrjeti.',
  },
  {
    title: 'Pastrimi memorie & optimizim',
    image: 'https://img.freepik.com/free-photo/aerial-view-memory-card_53876-14881.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Fshirje file-ve të panevojshme, optimizim i shpejtësisë dhe hapësirës.',
  },
  {
    title: 'Asistencë për aplikacione',
    image: 'https://img.freepik.com/free-vector/customer-support-illustration_23-2148885346.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Instalim, konfigurim ose përditësim i aplikacioneve në çdo pajisje.',
  }
];

const AsistencaMobile = () => {

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
          Asistenca Mobile
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {assistanceParts.map((item, i) => (
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
                   
                  </Typography>
                </CardContent>
                <Box sx={{ width: '100%', px: 2, pb: 2 }}>
                 
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AsistencaMobile;
