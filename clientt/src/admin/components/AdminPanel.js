// /src/admin/AdminPanel.js
import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Dashboard from "../Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Customers from "./Customers";
import Reports from "./Reports";
import Settings from "./Settings";


const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Porositë" },
  { key: "products", label: "Produktet" },
  { key: "customers", label: "Klientët" },
  { key: "reports", label: "Raportet" },
  { key: "settings", label: "Settings" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#fff7ef" }}>
      {/* Sidebar */}
      <Sidebar tab={tab} setTab={setTab} tabs={TABS} />

      {/* Main panel */}
      <Box sx={{ flex: 1, px: 3, py: 2 }}>
        {tab === "dashboard" && <Dashboard />}
        {tab === "products" && <Products />}
        {tab === "orders" && <Orders />}
        {tab === "customers" && <Customers />}
        {tab === "reports" && <Reports />}
        {tab === "settings" && <Settings />}
      </Box>
    </Box>
  );
}
