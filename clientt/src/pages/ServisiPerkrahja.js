import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent} from '@mui/material';
import { CardMedia } from "@mui/material";


const serviceParts = [
  {
    title: 'Ndërrim ekrani',
    image: 'https://image.shutterstock.com/image-vector/remove-attachment-puzzle-line-icons-260nw-2458526435.jpg',
    desc: 'Zëvendësim profesional i ekraneve për çdo model telefoni.',
  },
  {
    title: 'Ndërrim baterie',
    image: 'https://img.freepik.com/free-photo/close-up-circuit-board-repair_23-2148419129.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Bateri të reja dhe instalim i sigurt për jetëgjatësi maksimale.',
  },
  {
    title: 'Ndërrim porte karikimi',
    image: 'https://img.freepik.com/free-photo/repairman-soldering-components-motherboard-while-fixing-damaged-smart-phone-using-tweezers-iron_343059-504.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Zëvendësim i portës së karikimit për ngarkim të sigurt.',
  },
  {
    title: 'Riparim audio (altoparlant, mikrofon)',
    image: 'https://img.freepik.com/free-photo/close-up-shot-specialized-radio-equipment-used-home-studio_482257-116675.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Shërbim i plotë për altoparlant dhe mikrofon me zë të qartë.',
  },
  {
    title: 'Instalim sistemesh dhe softuer',
    image: 'https://img.freepik.com/free-photo/quality-assurance-clipboard-icon_53876-123828.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Instalim dhe konfigurim i softuerëve për çdo model telefoni.',
  },
  {
    title: 'Pastrimi i thellë (anti-pluhur & ujë)',
    image: 'https://img.freepik.com/free-photo/modern-smartphone-design-with-floating-elements_187299-46984.jpg?uid=R144109746&ga=GA1.1.2116894046.1746009338&semt=ais_hybrid&w=740',
    desc: 'Pastrimi profesional për zgjatje të jetës së pajisjes.',
  }
];

const ServisiPerkrahja = () => {

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
          Servisi & Përkrahja
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {serviceParts.map((item, i) => (
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

export default ServisiPerkrahja;
