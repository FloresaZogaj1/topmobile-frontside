import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DescriptionIcon from "@mui/icons-material/Description"; // Kontratat

/* ====== Tema (e njëjtë me faqet tjera) ====== */
const colors = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  card: "#111111",
  chip: "#151515",
  chipStroke: "#1e1e1e",
  stroke: "#1f1f1f",
  text: "#ffffff",
  muted: "#c9c9c9",
  accent: "#ff8000",
  accentHover: "#e67300",
};

const SIDEBAR_WIDTH = 240;

/* ====== Menu ====== */
const menu = [
  { label: "Produktet", icon: <InventoryIcon />, path: "/admin/products" },
  { label: "Përdoruesit", icon: <PeopleIcon />, path: "/admin/users" },
  { label: "Statistikat", icon: <BarChartIcon />, path: "/admin/stats" },
  { label: "Garancionet", icon: <ReceiptLongIcon />, path: "/admin/customer-warranties" },
  { label: "Kontratat", icon: <DescriptionIcon />, path: "/admin/kontratat" },
];

function AdminSidebar() {
  const location = useLocation();
  const userName = "Admin"; // ose merre nga context

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        bgcolor: colors.surface,
        borderRight: `1px solid ${colors.stroke}`,
        minHeight: "100vh",
        py: 2.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxShadow: "0 12px 40px rgba(0,0,0,.32)",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Header / Brand */}
      <Box sx={{ px: 2.25, pb: 1.5, display: "flex", alignItems: "center", gap: 1.25 }}>
        <Avatar
          sx={{
            bgcolor: colors.accent,
            width: 52,
            height: 52,
            boxShadow: "0 0 0 3px rgba(255,128,0,.18)",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40, color: "#0b0b0b" }} />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: colors.text, fontWeight: 800, lineHeight: 1, mb: 0.5 }}
            noWrap
            title={userName}
          >
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.muted }}>
            Paneli i Administratorit
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: colors.stroke, mb: 1 }} />

      {/* Menu */}
      <List sx={{ px: 1, py: 0, flex: 1 }}>
        {menu.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={active}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                color: colors.text,
                "& .MuiListItemIcon-root": {
                  color: active ? "#0b0b0b" : colors.muted,
                  minWidth: 38,
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 6,
                  bottom: 6,
                  width: 3,
                  borderRadius: 3,
                  background: active ? colors.accent : "transparent",
                  transition: "background .18s",
                },
                "&.Mui-selected": {
                  bgcolor: colors.accent,
                  color: "#0b0b0b",
                  "& .MuiListItemIcon-root": { color: "#0b0b0b" },
                },
                "&:hover": {
                  bgcolor: active ? colors.accentHover : colors.chip,
                },
                transition: "background .16s ease, transform .06s ease",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Footer i vogël */}
      <Box sx={{ px: 2.25, pt: 1 }}>
        <Divider sx={{ borderColor: colors.stroke, mb: 1 }} />
        <Typography variant="caption" sx={{ color: colors.muted }}>
          © {new Date().getFullYear()} topmobile
        </Typography>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
