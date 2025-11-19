import React, { useEffect, useState, useMemo } from "react";
import { api } from "../api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";

// Icons (opsionale, por e bëjnë më “dashboard”)
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EuroIcon from "@mui/icons-material/Euro";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function AdminStats() {
  const [stats, setStats] = useState(null); // null = loading, {} = error bosh

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/api/admin/stats`); // backend në production ka /api prefix
        setStats(data || {});
      } catch {
        setStats({});
      }
    })();
  }, []);

  const accent = "var(--accent, #ff8000)"; // portokallia jote
  const cardBg = "rgba(255,255,255,0.98)"; // karta të bardha si në screenshot
  const valueColor = accent;

  // Formattera të sigurt
  const fInt = (n) =>
    typeof n === "number" && !Number.isNaN(n) ? n.toLocaleString("sq-AL") : "-";

  const fEUR = (n) => {
    if (typeof n === "number" && !Number.isNaN(n))
      return new Intl.NumberFormat("sq-AL", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(n);
    return "-";
  };

  const items = useMemo(
    () => [
      {
        label: "Produkte",
        value: fInt(stats?.totalProducts),
        icon: <Inventory2Icon />,
      },
      {
        label: "Përdorues",
        value: fInt(stats?.totalUsers),
        icon: <PeopleAltIcon />,
      },
      {
        label: "Porosi",
        value: fInt(stats?.totalOrders),
        icon: <ShoppingCartIcon />,
      },
      {
        label: "Shitje",
        value: fEUR(stats?.totalSales),
        icon: <EuroIcon />,
      },
      {
        label: "Shitje sot",
        value: fEUR(stats?.sales_today),
        icon: <TrendingUpIcon />,
      },
      {
        label: "Porosi sot",
        value: fInt(stats?.orders_today),
        icon: <AssignmentTurnedInIcon />,
      },
    ],
    [stats]
  );

  const LoadingCard = () => (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: cardBg,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 4,
          width: "100%",
          bgcolor: accent,
          opacity: 0.9,
        }}
      />
      <CardContent>
        <Skeleton width={120} height={24} />
        <Skeleton width={100} height={40} />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <span role="img" aria-label="stats">📊</span>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#eae6dd", // nude e ngrohtë si në navbar
            textShadow: "0 1px 0 rgba(0,0,0,0.5)",
          }}
        >
          Statistika
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {(stats === null ? Array.from({ length: 6 }) : items).map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            {stats === null ? (
              <LoadingCard />
            ) : (
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: cardBg,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
                  },
                }}
              >
                {/* top accent bar */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 4,
                    width: "100%",
                    bgcolor: accent,
                  }}
                />
                <CardContent>
                  <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(255,128,0,0.12)",
                        color: accent,
                        display: "inline-flex",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 900, color: valueColor, lineHeight: 1.1 }}
                  >
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
