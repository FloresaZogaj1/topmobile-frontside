import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  Button, Paper, Chip, IconButton, Dialog, DialogTitle, DialogActions, MenuItem, Select
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';

const STATUS_OPTIONS = [
  { label: "Në pritje", value: "Në pritje", icon: <HourglassBottomIcon fontSize="small" sx={{ mr: 0.5 }} /> },
  { label: "Në dërgesë", value: "Në dërgesë", icon: <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} /> },
  { label: "Kryer", value: "Kryer", icon: <DoneAllIcon fontSize="small" sx={{ mr: 0.5 }} /> },
  { label: "Refuzuar", value: "Refuzuar", icon: <CancelIcon fontSize="small" sx={{ mr: 0.5 }} /> },
];

const STATUS_COLORS = {
  "Në pritje": { color: "warning", bg: "#fff9e2", text: "#a97700" },
  "Në dërgesë": { color: "info", bg: "#e8f4fd", text: "#1976d2" },
  "Kryer": { color: "success", bg: "#e8fff3", text: "#00966c" },
  "Refuzuar": { color: "error", bg: "#ffe4e4", text: "#b80020" }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [changingId, setChangingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  // Ndrysho statusin
  const handleStatusChange = async (id, newStatus) => {
    setChangingId(id);
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    setOrders(orders =>
      orders.map(o => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setChangingId(null);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/orders/${deleteId}`, { method: "DELETE" });
    setOrders(orders => orders.filter(o => o.id !== deleteId));
    setDeleteId(null);
  };

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" color="#b2b2b2" fontWeight={600}>
          S’ka porosi për momentin!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 5, mb: 8 }}>
      <Typography variant="h4" mb={3} fontWeight={700} color="#023047">
        Porositë – Admin
      </Typography>
      <Paper sx={{ borderRadius: 4, boxShadow: 2, p: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#ff800018" }}>
              <TableCell><b>Emri</b></TableCell>
              <TableCell><b>Nr. tel</b></TableCell>
              <TableCell><b>Adresa</b></TableCell>
              <TableCell><b>Produkte</b></TableCell>
              <TableCell><b>Totali</b></TableCell>
              <TableCell><b>Statusi</b></TableCell>
              <TableCell><b>Data</b></TableCell>
              <TableCell align="right"><b>Veprim</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.customerName}</TableCell>
                <TableCell>{o.phone}</TableCell>
                <TableCell>{o.address}</TableCell>
                <TableCell>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {o.items?.map((p, i) => (
                      <li key={i}>
                        <b>{p.name}</b> x {p.qty}
                        {p.price && (
                          <span style={{ color: "#ff8000", marginLeft: 6, fontWeight: 500 }}>
                            €{p.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="#ff8000">
                    €{o.total}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      icon={STATUS_OPTIONS.find(opt => opt.value === o.status)?.icon || <HourglassBottomIcon fontSize="small" />}
                      label={o.status}
                      sx={{
                        bgcolor: STATUS_COLORS[o.status]?.bg || "#fff5e6",
                        color: STATUS_COLORS[o.status]?.text || "#e66e00",
                        fontWeight: 700,
                        fontSize: 15,
                        borderRadius: 1
                      }}
                    />
                    {/* Ndrysho Status */}
                    <Select
                      size="small"
                      value={o.status}
                      disabled={changingId === o.id}
                      onChange={e => handleStatusChange(o.id, e.target.value)}
                      sx={{
                        minWidth: 122,
                        fontWeight: 600,
                        bgcolor: "#f7f7fa",
                        "& .MuiOutlinedInput-notchedOutline": { border: 0 }
                      }}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <MenuItem value={opt.value} key={opt.value}>
                          {opt.icon} {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </TableCell>
                <TableCell>
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleDateString("sq-AL", {
                        day: "2-digit", month: "2-digit", year: "2-digit",
                        hour: "2-digit", minute: "2-digit"
                      })
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => setDeleteId(o.id)}
                    sx={{
                      bgcolor: "#ff800021",
                      "&:hover": { bgcolor: "#ff800044" }
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Modal konfirmimi */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Fshije këtë porosi?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Anulo
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{ background: "#ff8000" }}
          >
            Fshi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOrders;
