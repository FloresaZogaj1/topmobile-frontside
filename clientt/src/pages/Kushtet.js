import React, { useState } from "react";
import { Box, Typography, Card, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Modal, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PolicyIcon from '@mui/icons-material/Policy';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';

const faqs = [
  {
    q: "Si mund ta bëj kthimin e një produkti?",
    a: "Mjafton të na kontaktoni brenda 14 ditëve nga blerja. Stafi ynë do të udhëzojë për çdo hap – plotësoni formularin online dhe kthimi bëhet shumë lehtë."
  },
  {
    q: "Çfarë garancie ofroni për produktet?",
    a: "Të gjitha produktet e reja kanë minimumi 12 muaj garanci. Për më shumë detaje, shih seksionin e garancisë."
  },
  {
    q: "A janë të sigurta të dhënat e mia personale?",
    a: "Po, të gjitha pagesat janë të koduara me SSL dhe të dhënat tuaja ruhen me përkushtim maksimal ndaj privatësisë."
  },
  {
    q: "Si mund të kontaktoj shpejt me ju?",
    a: "Mund të përdorni WhatsApp, telefon, ose email. Ne përgjigjemi brenda 1 ore në orar pune."
  }
];

const kushtetDetails = (
  <Box>
    <Typography variant="h5" mb={2} color="var(--accent)">Kushtet e Përdorimit</Typography>
    <ul>
      <li>Përdorimi i faqes është i lejuar vetëm sipas rregullave tona.</li>
      <li>Çdo mashtrim rezulton me bllokim të menjëhershëm.</li>
      <li>Çmimet mund të ndryshojnë pa paralajmërim.</li>
      <li>Privatësia e klientit respektohet maksimalisht.</li>
    </ul>
  </Box>
);

const kujdesiDetails = (
  <Box>
    <Typography variant="h5" mb={2} color="var(--accent)">Kujdesi ndaj Klientit</Typography>
    <ul>
      <li>Mbështetje telefonike/WhatsApp: <b>+383 XX XXX XXX</b></li>
      <li>Email: <b>support@topmobile.com</b></li>
      <li>Pagesat të sigurta me SSL.</li>
      <li>Përgjigje brenda 1 ore.</li>
    </ul>
  </Box>
);

const garanciaDetails = (
  <Box>
    <Typography variant="h5" mb={2} color="var(--accent)">Garanci & Kthimi</Typography>
    <ul>
      <li>12 muaj garanci për çdo produkt të ri.</li>
      <li>Kthim i mundshëm brenda 14 ditëve nëse s’është përdorur.</li>
      <li>Kthimi realizohet lehtë përmes kontaktit tonë.</li>
    </ul>
  </Box>
);

const whatsappUrl = "https://wa.me/383XXXXXXXXX?text=Pershendetje!%20Kam%20nje%20pyetje%20per%20Top%20Mobile";

const Kushtet = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (type) => setOpen(type);
  const handleClose = () => setOpen(null);

  let modalContent = null;
  if (open === "kushtet") modalContent = kushtetDetails;
  if (open === "kujdesi") modalContent = kujdesiDetails;
  if (open === "garancia") modalContent = garanciaDetails;

  return (
    <Box sx={{ bgcolor: "#000", color: "#f4eedc", minHeight: "100vh", py: 7 }}>
      {/* HERO */}
      <Box sx={{ textAlign: "center", mb: 7 }}>
        <VerifiedUserIcon sx={{ fontSize: 62, color: "var(--accent)", mb: 2 }} />
        <Typography variant="h3" fontWeight={700} color="#fff" mb={1}>
          Siguria & Kujdesi ndaj Klientit
        </Typography>
        <Typography color="var(--muted)" fontSize={18} mb={1.5}>
          Politikat tona janë të qarta, të thjeshta dhe gjithmonë në shërbim të klientit!
        </Typography>
      </Box>

      {/* KARTAT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 7,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            py: 4,
            px: 2,
            bgcolor: "#0b0b0b",
            boxShadow: "0 8px 40px rgba(255,122,0,.15)",
            textAlign: "center",
            "&:hover": {
              boxShadow: "0 18px 48px rgba(255,122,0,.35)",
              transform: "translateY(-5px) scale(1.03)"
            }
          }}
        >
          <PolicyIcon sx={{ fontSize: 46, color: "var(--accent)", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#fff" mb={1}>
            Kushtet e Përdorimit
          </Typography>
          <Typography color="var(--muted)" mb={2}>
            Respektoni rregullat tona për një përvojë të sigurt dhe të ndershme blerjeje.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--accent)", fontWeight: 600 }}
            onClick={() => handleOpen("kushtet")}
          >
            Shiko detaje
          </Button>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            py: 4,
            px: 2,
            bgcolor: "#0b0b0b",
            boxShadow: "0 8px 40px rgba(255,122,0,.15)",
            textAlign: "center",
            "&:hover": {
              boxShadow: "0 18px 48px rgba(255,122,0,.35)",
              transform: "translateY(-5px) scale(1.03)"
            }
          }}
        >
          <SupportAgentIcon sx={{ fontSize: 46, color: "var(--accent)", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#fff" mb={1}>
            Kujdesi ndaj Klientit
          </Typography>
          <Typography color="var(--muted)" mb={2}>
            Na kontaktoni në çdo kohë për ndihmë – përgjigje të shpejtë në WhatsApp, telefon apo email!
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--accent)", fontWeight: 600 }}
            onClick={() => handleOpen("kujdesi")}
          >
            Kontakto
          </Button>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            py: 4,
            px: 2,
            bgcolor: "#0b0b0b",
            boxShadow: "0 8px 40px rgba(255,122,0,.15)",
            textAlign: "center",
            "&:hover": {
              boxShadow: "0 18px 48px rgba(255,122,0,.35)",
              transform: "translateY(-5px) scale(1.03)"
            }
          }}
        >
          <ReplayIcon sx={{ fontSize: 46, color: "var(--accent)", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#fff" mb={1}>
            Garanci & Kthimi
          </Typography>
          <Typography color="var(--muted)" mb={2}>
            12 muaj garanci, 14 ditë kthim për çdo produkt të papërdorur. Proces i lehtë dhe transparent!
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--accent)", fontWeight: 600 }}
            onClick={() => handleOpen("garancia")}
          >
            Mëso më shumë
          </Button>
        </Card>
      </Box>

      {/* MODAL UNIVERSAL */}
      <Modal open={!!open} onClose={handleClose}>
        <Box sx={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#0b0b0b", color: "#fff",
          borderRadius: 4, boxShadow: "0 0 40px rgba(255,122,0,.4)",
          minWidth: 340, maxWidth: 420, p: 4,
        }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {modalContent}
        </Box>
      </Modal>

      {/* FAQ */}
      <Paper sx={{
        maxWidth: 750,
        mx: "auto",
        p: 4,
        borderRadius: 4,
        mb: 7,
        bgcolor: "#0b0b0b",
        color: "#fff",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <HelpOutlineIcon sx={{ fontSize: 34, color: "var(--accent)", mr: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#fff">Pyetje të shpeshta (FAQ)</Typography>
        </Box>
        {faqs.map((f, i) => (
          <Accordion key={i} sx={{ mb: 1.5, borderRadius: 2, bgcolor: "#111", color: "#fff" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "var(--accent)" }}/>}>
              <Typography fontWeight={600}>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="var(--muted)">{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* WhatsApp CTA */}
      <Paper sx={{
        maxWidth: 750,
        mx: "auto",
        p: 4,
        borderRadius: 4,
        bgcolor: "#0b0b0b",
        color: "#fff",
        textAlign: "center"
      }}>
        <Typography variant="h5" fontWeight={700} mb={1} color="#fff">
          Keni pyetje të tjera?
        </Typography>
        <Typography color="var(--muted)" mb={2}>
          Na shkruani në WhatsApp ose në{" "}
          <a href="mailto:
info@topmobile.store" style={{ color: "var(--accent)" }}>
            
info@topmobile.store
          </a> – përgjigjemi brenda 1 ore gjatë orarit të punës!
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "var(--accent)", fontWeight: 700, borderRadius: 2, fontSize: 18 }}
          href={48723720}
          target="_blank"
        >
          Na Kontakto në WhatsApp
        </Button>
      </Paper>
    </Box>
  );
};

export default Kushtet;
