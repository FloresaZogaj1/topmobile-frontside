// src/gamify/XPWidget.jsx
import { Box, LinearProgress, Typography } from "@mui/material";
import { useXP } from "./useXP";

export default function XPWidget() {
  const { level, cur, needed, totalXP, loading } = useXP();

  if (loading) return null;
  const pct = Math.min(100, Math.round((cur / needed) * 100));

  return (
    <Box sx={{ minWidth: 220 }}>
      <Typography variant="caption" sx={{ color: "var(--text)" }}>
        Level {level} — {totalXP} XP
      </Typography>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.08)",
          "& .MuiLinearProgress-bar": { borderRadius: 999 }
        }}
      />
      <Typography variant="caption" sx={{ color: "var(--text)" }}>
        {cur}/{needed} drejt nivelit tjetër
      </Typography>
    </Box>
  );
}
