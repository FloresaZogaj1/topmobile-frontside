import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const colors = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  stroke: "#1f1f1f",
  shadowInset: "inset 0 0 22px rgba(255,114,0,.08)",
};

export default function AdminPanel() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: colors.bg }}>
      <AdminSidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          bgcolor: colors.surface,
          minHeight: "100vh",
          borderLeft: `1px solid ${colors.stroke}`,
          boxShadow: colors.shadowInset,
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
