import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Grid, Divider, CircularProgress
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EuroIcon from "@mui/icons-material/Euro";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      // Grumbullo të dhënat për statistika mujore
      const months = [
        "Jan", "Shk", "Mar", "Pri", "Maj", "Qer",
        "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"
      ];
      let revenue = 0;
      let monthly = Array(12).fill(0);

      (Array.isArray(data) ? data : []).forEach(o => {
        const dt = new Date(o.createdAt);
        const month = dt.getMonth();
        revenue += Number(o.total || 0);
        monthly[month] += 1;
      });

      const monthlyOrdersData = months.map((m, i) => ({
        name: m,
        orders: monthly[i]
      }));

      setMonthlyOrders(monthlyOrdersData);
      setTotalRevenue(revenue);
      setTotalOrders((Array.isArray(data) ? data.length : 0));
    } catch {
      setMonthlyOrders([]);
      setTotalRevenue(0);
      setTotalOrders(0);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#ff8000", fontWeight: 700, mb: 3, textAlign: "center" }}
      >
        Raportet & Statistikat
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", py: 12 }}>
          <CircularProgress color="warning" size={60} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{
                p: 3, borderRadius: 4, display: "flex", alignItems: "center", gap: 2, background: "#fffbe8"
              }}>
                <EuroIcon sx={{ fontSize: 38, color: "#ff8000" }} />
                <Box>
                  <Typography fontWeight={700} fontSize={23} color="#ff8000">
                    €{totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography fontSize={15}>Të ardhurat totale</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{
                p: 3, borderRadius: 4, display: "flex", alignItems: "center", gap: 2, background: "#fffbe8"
              }}>
                <ShoppingCartIcon sx={{ fontSize: 38, color: "#ff8000" }} />
                <Box>
                  <Typography fontWeight={700} fontSize={23} color="#ff8000">
                    {totalOrders}
                  </Typography>
                  <Typography fontSize={15}>Porositë totale</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{
                p: 3, borderRadius: 4, display: "flex", alignItems: "center", gap: 2, background: "#fffbe8"
              }}>
                <BarChartIcon sx={{ fontSize: 38, color: "#ff8000" }} />
                <Box>
                  <Typography fontWeight={700} fontSize={23} color="#ff8000">
                    {monthlyOrders.reduce((a, b) => a + b.orders, 0)}
                  </Typography>
                  <Typography fontSize={15}>Porosi këtë vit</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Porositë mujore (Grafik)
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 4, background: "#fff9f3" }}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#ff8000" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  );
}
