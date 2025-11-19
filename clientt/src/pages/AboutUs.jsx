// AboutUs.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { CheckCircle, Shield, Wrench, Star, MapPin, Clock, Phone } from "lucide-react";
import logo from "../assets/PFP-01__5_-removebg-preview.png"; // ndrysho nese ke path tjeter
import "./ProductsIphone.css"; // për variablat CSS: --text, --surface, --stroke, --accent, etj.

const H = (props) => (
  <Typography
    {...props}
    sx={{
      fontWeight: 900,
      letterSpacing: 0.2,
      color: "var(--text)",
      ...props.sx,
    }}
  />
);

const Pill = ({ children }) => (
  <Chip
    label={children}
    sx={{
      background:
        "linear-gradient(90deg, rgba(255,128,0,.18), rgba(255,128,0,.08))",
      border: "1px solid var(--accent)",
      color: "var(--text)",
      fontWeight: 700,
      borderRadius: "999px",
      px: 1,
      py: 0.5,
      "& .MuiChip-label": { px: 0.5, fontSize: { xs: 12, sm: 13 } },
    }}
    variant="outlined"
  />
);

export default function AboutUs() {
  const stats = [
    { label: "Vite Eksperiencë", value: "7+" },
    { label: "Pajisje të Riparuara", value: "8,500+" },
    { label: "Klientë të Kënaqur", value: "5,000+" },
    { label: "Vlerësim Mesatar", value: "4.9/5" },
  ];

  const values = [
    {
      icon: <Shield size={22} />,
      title: "Besueshmëri",
      desc: "Punojmë me transparencë, garanci reale dhe pjesë origjinale kurdo që është e mundur.",
    },
    {
      icon: <Wrench size={22} />,
      title: "Ekspertizë",
      desc: "Ekip teknik me përvojë në Apple, Samsung, Xiaomi dhe shumë më tepër.",
    },
    {
      icon: <Star size={22} />,
      title: "Cilësi Premium",
      desc: "Standard i lartë shërbimi dhe estetikë e kujdesshme – si një dyqan ‘boutique’.",
    },
    {
      icon: <CheckCircle size={22} />,
      title: "Shpejtësi",
      desc: "Diagnozë e saktë dhe zgjidhje të shpejta që të mos humbisni kohë.",
    },
  ];

  const roadmap = [
    { year: "2018", text: "Nisja e Top Mobile si shërbim riparimi & aksesorë." },
    { year: "2020", text: "Zgjerim i linjës së produkteve dhe shërbimeve software." },
    { year: "2023", text: "Lansimi i platformës online topmobile.store." },
    { year: "2025", text: "Modernizim UX/UI dhe paketat ‘Soft & Save’." },
  ];

  


  return (
    <Box sx={{ bgcolor: "var(--page-bg, #0b0b0b)" }}>
      <style>{`
        .about-hero {
          background:
            radial-gradient(900px 480px at 90% -10%, rgba(255,128,0,.16), transparent 60%),
            radial-gradient(720px 380px at -10% 10%, rgba(255,128,0,.08), transparent 50%);
          border-bottom: 1px solid var(--stroke);
        }
        @media (max-width: 900px){
          .about-hero{
            background:
              radial-gradient(520px 320px at 110% -10%, rgba(255,128,0,.16), transparent 60%),
              radial-gradient(420px 280px at -20% 10%, rgba(255,128,0,.08), transparent 50%);
          }
        }
        .glass-card {
          background: color-mix(in oklab, var(--surface) 94%, transparent);
          border: 1px solid var(--stroke);
          border-radius: 18px;
        }
        .value-card:hover { transform: translateY(-2px); }
        .value-card { transition: transform .25s ease; }
      `}</style>

      {/* HERO */}
      <Box className="about-hero">
        <Container sx={{ py: { xs: 6, sm: 8, md: 12 } }}>
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            alignItems="center"
            sx={{ mb: { xs: 2.5, sm: 3 } }}
          >
            <Box sx={{ width: { xs: 48, sm: 56, md: 64 }, height: { xs: 48, sm: 56, md: 64 } }}>
              <img
                src={logo}
                alt="Top Mobile"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                loading="lazy"
              />
            </Box>
            <Pill>Top Mobile Shop & Service L.L.C.</Pill>
          </Stack>

          <H
            variant="h3"
            sx={{
              fontSize: { xs: 30, sm: 36, md: 46 },
              lineHeight: 1.12,
            }}
          >
            Rreth Nesh
          </H>

          <Typography
            variant="h6"
            sx={{
              color: "var(--muted)",
              maxWidth: 880,
              mt: 1.5,
              fontSize: { xs: 14.5, sm: 15.5, md: 16.5 },
            }}
          >
            Ne jemi një ekip teknikësh, dizajnerësh dhe problem-zgjidhësish që besojnë se
            teknologjia duhet të jetë e shpejtë, estetike dhe pa dhimbje koke. Qasja jonë:
            punë e pastër, komunikim i qartë, rezultat premium.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: { xs: 2.5, sm: 3 } }}
          >
            <Button
              variant="contained"
              component="a"
              href="https://www.instagram.com/topmobile.rks/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "var(--accent)",
                color: "#0b0b0b",
                fontWeight: 900,
                borderRadius: 999,
                px: { xs: 2.2, sm: 3 },
                py: { xs: 1, sm: 1.1 },
                minHeight: 44,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { background: "var(--accent-hover)" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Na Kontakto
            </Button>

            <Button
              variant="outlined"
              href="tel:+38348723720"
              startIcon={<Phone size={18} />}
              sx={{
                borderColor: "var(--stroke)",
                color: "var(--text)",
                fontWeight: 800,
                borderRadius: 999,
                px: { xs: 2.2, sm: 3 },
                py: { xs: 1, sm: 1.1 },
                minHeight: 44,
                textTransform: "none",
                "&:hover": { borderColor: "var(--accent)", background: "rgba(255,128,0,.06)" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              +383 48 723 720
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* STATS */}
      <Container sx={{ py: { xs: 4, sm: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {stats.map((s) => (
            <Grid item xs={6} sm={3} key={s.label}>
              <Card className="glass-card" elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", py: { xs: 2.5, md: 3 } }}>
                  <H variant="h4" sx={{ fontSize: { xs: 22, sm: 24, md: 28 } }}>{s.value}</H>
                  <Typography sx={{ color: "var(--muted)", mt: 0.5, fontSize: { xs: 12.5, sm: 13.5 } }}>
                    {s.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* VALUES */}
      <Container sx={{ pb: { xs: 4.5, sm: 5, md: 8 } }}>
        <H variant="h5" sx={{ mb: { xs: 2, sm: 2.5 } }}>Vlerat Tona</H>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {values.map((v) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <Card className="glass-card value-card" elevation={0} sx={{ height: "100%" }}>
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                    {v.icon}
                    <Typography sx={{ fontWeight: 800, color: "var(--text)", fontSize:{ xs: 14.5, sm: 15 } }}>
                      {v.title}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "var(--muted)", fontSize:{ xs: 13.5, sm: 14 } }}>
                    {v.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* STORY / ROADMAP */}
      <Container sx={{ pb: { xs: 4.5, sm: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <H variant="h5" sx={{ mb: { xs: 2, sm: 2.5 } }}>Historia jonë</H>
            <Card className="glass-card" elevation={0}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack spacing={{ xs: 1.5, sm: 2 }}>
                  {roadmap.map((r) => (
                    <Stack key={r.year} direction="row" spacing={2} alignItems="flex-start">
                      <Box sx={{ minWidth: { xs: 60, sm: 72 } }}>
                        <Typography sx={{ fontWeight: 900, color: "var(--text)", fontSize:{ xs: 14.5, sm: 15.5 } }}>
                          {r.year}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "var(--muted)", fontSize:{ xs: 13.5, sm: 14.5 } }}>
                        {r.text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <H variant="h5" sx={{ mb: { xs: 2, sm: 2.5 } }}>Çfarë premtojmë</H>
            <Card className="glass-card" elevation={0}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack spacing={1.2}>
                  {[
                    "Diagnozë e saktë para çdo riparimi.",
                    "Çmime korrekte, pa surpriza.",
                    "Afate reale – e themi si është.",
                    "Garanci shërbimi sipas punës dhe pjesës.",
                  ].map((t) => (
                    <Stack direction="row" spacing={1.2} alignItems="center" key={t}>
                      <CheckCircle size={18} />
                      <Typography sx={{ color: "var(--text)", fontSize:{ xs: 13.5, sm: 14.5 } }}>
                        {t}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Divider sx={{ my: { xs: 2, sm: 2.5 }, borderColor: "var(--stroke)" }} />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.2}
                >
                  <Chip
                    icon={<Clock size={16} />}
                    label="09:00–21:00 (Hënë–Shtunë)"
                    sx={{ color: "var(--text)", width: { xs: "100%", sm: "auto" } }}
                  />
                  <Chip
                    icon={<MapPin size={16} />}
                    label="Ulpianë, Prishtinë"
                    sx={{ color: "var(--text)", width: { xs: "100%", sm: "auto" } }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      

      {/* BRANDS */}
      <Container sx={{ pb: { xs: 4.5, sm: 5, md: 8 } }}>
        <H variant="h5" sx={{ mb: { xs: 2, sm: 2.5 } }}>Punojmë me</H>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {["Apple", "Samsung", "Xiaomi", "PlayStation", "Fujifilm Instax"].map((b) => (
            <Chip key={b} label={b} sx={{ color: "var(--text)", borderColor: "var(--stroke)" }} variant="outlined" />
          ))}
        </Stack>
      </Container>

      {/* CTA */}
      <Box sx={{ borderTop: "1px solid var(--stroke)", py: { xs: 5, sm: 6, md: 8 } }}>
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
            <Grid item xs={12} md={8}>
              <H variant="h4" sx={{ fontSize: { xs: 24, sm: 28, md: 34 }, mb: { xs: 0.5, md: 1 } }}>
                Keni nevojë për servis apo këshillim?
              </H>
              <Typography sx={{ color: "var(--muted)", fontSize:{ xs: 13.5, sm: 14.5 } }}>
                Na shkruani menjëherë – ju rikthejmë pajisjen në formën më të mirë.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.2}
                justifyContent={{ md: "flex-end" }}
              >
                
                <Button
                  variant="outlined"
                  href="tel:+38345407223"
                  sx={{
                    borderColor: "var(--stroke)",
                    color: "var(--text)",
                    fontWeight: 800,
                    borderRadius: 999,
                    px: { xs: 2.2, sm: 3 },
                    py: { xs: 1, sm: 1.1 },
                    minHeight: 44,
                    textTransform: "none",
                    "&:hover": { borderColor: "var(--accent)", background: "rgba(255,128,0,.06)" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Thirr tani
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
