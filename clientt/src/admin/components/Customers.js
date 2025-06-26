import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Snackbar, Alert, CircularProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");


export default function Customers() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch {
      setClients([]);
    }
    setLoading(false);
  };

  // Opsional: Fshi klientin
  const handleDelete = async id => {
    if (!window.confirm("A je i sigurt që do ta fshish këtë përdorues?")) return;
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setSnackbar({ open: true, message: "Përdoruesi u fshi me sukses!", severity: "success" });
      fetchClients();
    } else {
      setSnackbar({ open: true, message: "Gabim në fshirje!", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress color="warning" size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#ff8000", fontWeight: 700, mb: 3, textAlign: "center" }}
      >
        Klientët
      </Typography>
      <Paper sx={{ borderRadius: 4, boxShadow: 2, p: { xs: 0.5, sm: 2 } }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#ff800018" }}>
              <TableCell>#</TableCell>
              <TableCell>Emri i Përdoruesit</TableCell>
              <TableCell>Roli</TableCell>
              <TableCell>Data Regjistrimit</TableCell>
              <TableCell>Opsione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((user, i) => (
              <TableRow key={user.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {user.role === "admin" ? (
                      <AdminPanelSettingsIcon fontSize="small" color="warning" />
                    ) : (
                      <PersonIcon fontSize="small" color="info" />
                    )}
                    {user.username}
                  </Box>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("sq-AL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  {user.role !== "admin" && (
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {clients.length === 0 && (
          <Typography color="#bbb" textAlign="center" py={5}>S’ka klientë për momentin.</Typography>
        )}
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2600}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
