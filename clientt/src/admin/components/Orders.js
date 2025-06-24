import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, IconButton, Menu, MenuItem, CircularProgress, Tooltip
} from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const token = localStorage.getItem("token");

const STATUS_COLORS = {
  "Në pritje": { color: "#a97700", bg: "#fff9e2", icon: <HourglassBottomIcon fontSize="small" /> },
  "Në dërgesë": { color: "#1976d2", bg: "#e8f4fd", icon: <LocalShippingIcon fontSize="small" /> },
  "Kryer": { color: "#00966c", bg: "#e8fff3", icon: <DoneAllIcon fontSize="small" /> },
  "Refuzuar": { color: "#b80020", bg: "#ffe4e4", icon: <CancelIcon fontSize="small" /> }
};

const statusList = ["Në pritje", "Në dërgesë", "Kryer", "Refuzuar"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data.reverse() : []);
    } catch {
      setOrders([]);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders();
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("A je i sigurt që do ta fshish këtë porosi?")) return;
    await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchOrders();
  };

  // Open status menu
  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress color="warning" size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 5, mb: 6 }}>
      <Typography
        variant="h4"
        sx={{ color: "#ff8000", fontWeight: 700, textAlign: "center", mb: 4, letterSpacing: 1.1 }}
      >
        Porositë e Dërguara
      </Typography>
      <Paper sx={{ borderRadius: 4, boxShadow: 2, overflowX: "auto", p: { xs: 0.5, sm: 2 } }}>
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
              <TableCell>Opsione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => {
              const status = order.status || "Në pritje";
              const st = STATUS_COLORS[status] || STATUS_COLORS["Në pritje"];
              let itemsArr = [];
              try {
                itemsArr = typeof order.items === "string" ? JSON.parse(order.items) : order.items || [];
              } catch { itemsArr = []; }
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
                  <TableCell>
                    <Tooltip title="Ndrysho status">
                      <IconButton
                        onClick={e => handleMenuOpen(e, order.id)}
                        size="small"
                        sx={{ color: "#ff8000" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Fshi porosinë">
                      <IconButton
                        onClick={() => handleDelete(order.id)}
                        size="small"
                        sx={{ color: "#b80020" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Dropdown status */}
                    <Menu
                      anchorEl={anchorEl}
                      open={selectedOrderId === order.id && Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {statusList.map(st => (
                        <MenuItem
                          key={st}
                          onClick={() => handleStatusChange(order.id, st)}
                          selected={status === st}
                        >
                          {st}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
