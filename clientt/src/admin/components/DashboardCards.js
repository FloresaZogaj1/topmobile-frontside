// src/admin/components/DashboardCards.js
import { Box, Paper, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

const stats = [
  { label: "Porosi", value: 120, icon: <ShoppingCartIcon />, color: "#ff8000" },
  { label: "Produkte", value: 58, icon: <InventoryIcon />, color: "#ffa040" },
  { label: "Klientë", value: 37, icon: <PeopleIcon />, color: "#ffb300" },
];

export default function DashboardCards() {
  return (
    <Box sx={{ display: "flex", gap: 3, mb: 5 }}>
      {stats.map((stat, i) => (
        <Paper key={i} sx={{ flex: 1, p: 3, display: "flex", alignItems: "center", bgcolor: "#fff", borderRadius: 3, boxShadow: 2 }}>
          <Box sx={{ mr: 2, color: stat.color, fontSize: 40 }}>{stat.icon}</Box>
          <div>
            <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
            <Typography fontWeight={500}>{stat.label}</Typography>
          </div>
        </Paper>
      ))}
    </Box>
  );
}
