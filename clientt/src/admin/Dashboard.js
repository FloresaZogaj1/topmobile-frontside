import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Divider, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");


export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Merr produktet
        const prodRes = await fetch(`${API_URL}/api/products`);
        const products = await prodRes.json();

        // Merr porositë
        const ordRes = await fetch(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orders = await ordRes.json();

        // Numëro klientët unikë
        const clients = new Set(orders.map(o => o.phone || o.customerName)).size;
        // Shuma totale e porosive
        const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

        // Merr 5 porositë e fundit
        const latestOrders = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalClients: clients,
          totalRevenue: totalRevenue.toFixed(2),
        });
        setRecentOrders(latestOrders);
      } catch (err) {
        setStats({ error: "Gabim gjatë ngarkimit të statistikave!" });
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress color="warning" size={60} />
      </Box>
    );
  }

  if (!stats || stats.error) {
    return <Typography color="error" sx={{ textAlign: "center" }}>{stats?.error || "Gabim!"}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#ff8000", fontWeight: 700, mb: 2 }}>
        Përmbledhje e shpejtë
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
            <Inventory2Icon fontSize="large" sx={{ color: "#ff8000" }} />
            <Box>
              <Typography fontWeight={700}>{stats.totalProducts}</Typography>
              <Typography fontSize={15}>Produkte</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
            <ShoppingCartIcon fontSize="large" sx={{ color: "#ff8000" }} />
            <Box>
              <Typography fontWeight={700}>{stats.totalOrders}</Typography>
              <Typography fontSize={15}>Porosi</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
            <PeopleIcon fontSize="large" sx={{ color: "#ff8000" }} />
            <Box>
              <Typography fontWeight={700}>{stats.totalClients}</Typography>
              <Typography fontSize={15}>Klientë</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} color="#ff8000">€{stats.totalRevenue}</Typography>
            <Box>
              <Typography fontWeight={700}>Totali</Typography>
              <Typography fontSize={15}>Shitje (€)</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>Porositë e fundit</Typography>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {recentOrders.map((o, i) => (
            <li key={o.id || i}>
              Porosia #{o.id} – {o.items && typeof o.items === "string"
                ? JSON.parse(o.items)[0]?.name
                : o.items?.[0]?.name} – €{o.total} – {o.customerName}
            </li>
          ))}
        </ul>
        {recentOrders.length === 0 && <Typography color="#bbb">S’ka porosi të fundit.</Typography>}
      </Paper>
    </Box>
  );
}
