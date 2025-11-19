// src/admin/components/AdminWelcome.jsx
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const colors = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  card: "#111111",
  stroke: "#1f1f1f",
  text: "#ffffff",
  muted: "#c9c9c9",
  accent: "#ff8000",
  accentHover: "#e67300",
  shadow: "0 18px 42px rgba(0,0,0,.35)",
};

export default function AdminWelcome() {
  const [sales, setSales] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("tm_token");
    fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSales(data.sales_today ?? 0))
      .catch(() => setSales(0));
  }, []);

  return (
    <Box
      sx={{
        mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2.5,
        color: colors.text,
      }}
    >
      <EmojiEmotionsIcon
        sx={{
          fontSize: 96,
          color: colors.accent,
          filter: "drop-shadow(0 8px 26px rgba(255,128,0,.22))",
        }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, letterSpacing: 0.3, textAlign: "center" }}
      >
        Mirësevjen, Admin!
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: colors.muted, textAlign: "center", maxWidth: 640 }}
      >
        A patëm naj shitje sot, a veç po lodhesh kot? 😂
      </Typography>

      <Card
        elevation={0}
        sx={{
          mt: 3,
          minWidth: 320,
          background: colors.surface,
          border: `1px solid ${colors.stroke}`,
          borderRadius: 2,
          boxShadow: colors.shadow,
          overflow: "hidden",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 120% -20%, rgba(255,128,0,.08), transparent 60%)",
            pointerEvents: "none",
          },
        }}
      >
        <CardContent
          sx={{
            px: 4,
            py: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MonetizationOnIcon
            sx={{
              fontSize: 44,
              color: colors.accent,
              mb: 0.5,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: colors.accent,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: 0.4,
            }}
          >
            €{sales === null ? "..." : sales.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
          </Typography>
          <Typography sx={{ color: colors.muted, fontWeight: 700, fontSize: 16 }}>
            Shitjet e sotme
          </Typography>

          <Divider sx={{ my: 2, width: "100%", borderColor: colors.stroke }} />

          <Typography
            variant="caption"
            sx={{ color: colors.muted, textAlign: "center" }}
          >
            Përditësohet në hapjen e faqes. Për shifra të detajuara, shiko <strong>Porositë</strong>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
