import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip
} from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

const STATUS_COLORS = {
  "Në pritje": {
    color: "#a97700",
    bg: "#fff9e2",
    icon: <HourglassBottomIcon fontSize="small" />
  },
  "Në dërgesë": {
    color: "#1976d2",
    bg: "#e8f4fd",
    icon: <LocalShippingIcon fontSize="small" />
  },
  "Kryer": {
    color: "#00966c",
    bg: "#e8fff3",
    icon: <DoneAllIcon fontSize="small" />
  },
  "Refuzuar": {
    color: "#b80020",
    bg: "#ffe4e4",
    icon: <CancelIcon fontSize="small" />
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const ordersArray = Array.isArray(data)
          ? data
          : Array.isArray(data.orders)
          ? data.orders
          : [];
        setOrders(ordersArray.reverse());
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        Duke i ngarkuar...
      </div>
    );
  if (!orders.length)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        Nuk ka porosi!
      </div>
    );

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        mt: 6,
        mb: 10,
        px: { xs: 1, sm: 2 }
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        color="#023047"
        mb={4}
        sx={{ textAlign: "center", letterSpacing: 1.1 }}
      >
        Porositë e Dërguara
      </Typography>
      <Paper
        sx={{
          borderRadius: 4,
          boxShadow: 2,
          p: { xs: 0.5, sm: 2 },
          overflowX: "auto"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#ff800018" }}>
              <TableCell>#</TableCell>
              <TableCell>Emri</TableCell>
              <TableCell>Tel</TableCell>
              <TableCell>Adresa</TableCell>
              <TableCell>Totali (€)</TableCell>
              <TableCell>Produktet</TableCell>
              <TableCell>Statusi</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => {
              const status = order.status || "Në pritje";
              const st = STATUS_COLORS[status] || STATUS_COLORS["Në pritje"];
              let itemsArr = Array.isArray(order.items)
                ? order.items
                : [];
              if (typeof order.items === "string") {
                try {
                  itemsArr = JSON.parse(order.items);
                } catch {}
              }
              return (
                <TableRow key={order.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <Typography fontWeight={700} color="#ff8000">
                      €{order.total?.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {itemsArr.map((item, idx) => (
                        <li key={idx} style={{ fontSize: 15 }}>
                          <b>{item.name}</b> × {item.qty}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={st.icon}
                      label={status}
                      sx={{
                        bgcolor: st.bg,
                        color: st.color,
                        fontWeight: 600,
                        px: 1.5,
                        fontSize: 15,
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString("sq-AL", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminOrders;
