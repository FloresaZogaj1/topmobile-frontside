import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, IconButton, Menu, MenuItem, CircularProgress, Tooltip, Button, Stack
} from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");


const STATUS_COLORS = {
  "Në pritje": { color: "#a97700", bg: "#fff8e2", icon: <HourglassBottomIcon fontSize="small" /> },
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
  const [filterStatus, setFilterStatus] = useState("Të gjitha");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
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

  // Filtron porositë sipas statusit
  const filteredOrders =
    filterStatus === "Të gjitha"
      ? orders
      : orders.filter(order => (order.status || "Në pritje") === filterStatus);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress color="warning" size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, mb: 8, px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#ff8000", fontWeight: 700, textAlign: "center",
          mb: 3, letterSpacing: 1.1, textTransform: "uppercase"
        }}
      >
        Porositë e Dërguara
      </Typography>

      {/* FILTER STATUS */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3} justifyContent="center">
        <FilterAltIcon color="warning" />
        {["Të gjitha", ...statusList].map(status => (
          <Button
            key={status}
            variant={filterStatus === status ? "contained" : "outlined"}
            color={status === "Refuzuar" ? "error" : status === "Kryer" ? "success" : "warning"}
            sx={{
              bgcolor: filterStatus === status
                ? (status === "Refuzuar" ? "#b80020" : status === "Kryer" ? "#00966c" : "#ff8000")
                : "#fff",
              color: filterStatus === status ? "#fff" : "#666",
              borderRadius: 3,
              px: 2.5, fontWeight: 700, boxShadow: filterStatus === status ? 2 : 0,
              textTransform: "none",
              fontSize: 15,
              '&:hover': {
                bgcolor:
                  status === "Refuzuar" ? "#e64949"
                    : status === "Kryer" ? "#13b07c"
                      : status === "Në dërgesë" ? "#0e89db"
                        : "#ff8000",
                color: "#fff"
              }
            }}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </Button>
        ))}
      </Stack>

      <Paper sx={{
        borderRadius: 4,
        boxShadow: "0 6px 24px 0 #ff800018",
        overflow: "auto",
        p: { xs: 0.5, sm: 2 },
        minHeight: 350,
        maxHeight: "72vh"
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "#ff800025" }}>
              <TableCell>#</TableCell>
              <TableCell>Emri</TableCell>
              <TableCell>Tel</TableCell>
              <TableCell>Adresa</TableCell>
              <TableCell>Totali (€)</TableCell>
              <TableCell>Produktet</TableCell>
              <TableCell>Statusi</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="center">Opsione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 7, color: "#888" }}>
                  Nuk ka porosi për këtë status.
                </TableCell>
              </TableRow>
            )}
            {filteredOrders.map((order, i) => {
              const status = order.status || "Në pritje";
              const st = STATUS_COLORS[status] || STATUS_COLORS["Në pritje"];
              let itemsArr = [];
              try {
                itemsArr = typeof order.items === "string" ? JSON.parse(order.items) : order.items || [];
              } catch { itemsArr = []; }
              return (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": { background: "#fff7f1" },
                    height: 75,
                    transition: "background 0.15s"
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>{i + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{order.customerName}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{order.phone}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <Typography fontWeight={700} color="#ff8000" fontSize={17}>
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
                        px: 2,
                        fontSize: 16,
                        borderRadius: 2,
                        boxShadow: "0 2px 8px 0 #0001",
                        letterSpacing: 1
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
                  <TableCell align="center">
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
