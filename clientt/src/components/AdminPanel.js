import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "products", label: "Produktet" },
  { key: "orders", label: "Porositë" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#fff7ef" }}>
      <Sidebar tab={tab} setTab={setTab} tabs={TABS} />
      <Box sx={{ flex: 1, px: 3, py: 2 }}>
        {tab === "dashboard" && <Dashboard />}
        {tab === "products" && <Products />}
        {tab === "orders" && <Orders />}
      </Box>
    </Box>
  );
}
