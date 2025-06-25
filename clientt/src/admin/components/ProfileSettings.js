// src/pages/ProfileSettings.js

import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Snackbar, Alert, Stack, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export function ProfileSettings() {
  const [form, setForm] = useState({
    emri: "Admin",
    email: "admin@topmobile.com",
    tel: "049123456"
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Thirr API për ruajtje
    setSnackbar({ open: true, message: "Profili u përditësua!", severity: "success" });
  };

  return (
    <Paper sx={{ p: 4, mb: 4, borderRadius: 5, boxShadow: "0 4px 32px #ff80001c" }}>
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <Avatar sx={{ bgcolor: "#ff8000" }}><PersonIcon /></Avatar>
        <Typography fontWeight={700} fontSize={20} color="#50577a">
          Profili Personal
        </Typography>
      </Stack>
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
        <Button type="submit" variant="contained" color="warning"
          sx={{ fontWeight: 700, borderRadius: 3, px: 3, mt: 1, boxShadow: "0 2px 8px #ff800028" }}>
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
