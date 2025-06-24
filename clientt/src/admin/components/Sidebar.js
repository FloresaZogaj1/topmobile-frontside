import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const icons = {
  dashboard: <DashboardIcon />,
  products: <Inventory2Icon />,
  orders: <ShoppingCartIcon />
};

export default function Sidebar({ tab, setTab, tabs }) {
  return (
    <Box sx={{
      width: 210,
      background: "linear-gradient(160deg,#ff8000 72%,#232323 100%)",
      color: "#fff",
      minHeight: "100vh",
      boxShadow: "2px 0 20px #ff800018"
    }}>
      <Box sx={{ p: 3, fontWeight: 700, fontSize: 24, letterSpacing: 1, textAlign: "center", color: "#232323", background: "#fff", borderRadius: "0 0 38px 38px" }}>
        Top Mobile
      </Box>
      <List sx={{ mt: 3 }}>
        {tabs.map(({ key, label }) => (
          <ListItem disablePadding key={key}>
            <ListItemButton
              selected={tab === key}
              onClick={() => setTab(key)}
              sx={{
                "&.Mui-selected": {
                  background: "#232323",
                  color: "#ff8000",
                  fontWeight: 700,
                  borderRight: "4px solid #ff8000"
                },
                borderRadius: "0 38px 38px 0",
                my: 0.5,
                mx: 0.7
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>{icons[key]}</ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{ fontSize: 17 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
