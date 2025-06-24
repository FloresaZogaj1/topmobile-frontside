import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Box, Snackbar, Alert } from "@mui/material";

export function ProfileSettings() {
  // Shembull: Merr nga API këto
  const [form, setForm] = useState({ emri: "Admin", email: "admin@topmobile.com", tel: "049123456" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Thirr API për ruajtje
    setSnackbar({ open: true, message: "Profili u përditësua!", severity: "success" });
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={2} color="#50577a">
        Profili Personal
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Emri"
          value={form.emri}
          onChange={e => setForm(f => ({ ...f, emri: e.target.value }))}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="Telefoni"
          value={form.tel}
          onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
          sx={{ mb: 2, width: "100%" }}
        />
        <Button type="submit" variant="contained" color="warning" sx={{ fontWeight: 700 }}>
          Ruaj ndryshimet
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2300}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
