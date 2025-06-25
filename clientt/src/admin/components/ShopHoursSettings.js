// src/pages/ShopHoursSettings.js

import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button, Stack, Avatar } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function ShopHoursSettings() {
  const [hours, setHours] = useState({
    open: "09:00",
    close: "21:00"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Thirr API për ruajtje
    alert("Orari u përditësua!");
  };

  return (
    <Paper sx={{ p: 4, mb: 4, borderRadius: 5, boxShadow: "0 4px 32px #ff80001c" }}>
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <Avatar sx={{ bgcolor: "#ff8000" }}><AccessTimeIcon /></Avatar>
        <Typography fontWeight={700} fontSize={20} color="#50577a">
          Orari i Dyqanit
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 22 }}>
        <Box>
          <Typography fontSize={15} mb={0.5}>Hapet:</Typography>
          <TextField
            type="time"
            value={hours.open}
            onChange={e => setHours(h => ({ ...h, open: e.target.value }))}
            size="small"
            sx={{ minWidth: 110 }}
          />
        </Box>
        <Box>
          <Typography fontSize={15} mb={0.5}>Mbyllet:</Typography>
          <TextField
            type="time"
            value={hours.close}
            onChange={e => setHours(h => ({ ...h, close: e.target.value }))}
            size="small"
            sx={{ minWidth: 110 }}
          />
        </Box>
        <Button variant="contained" color="warning" type="submit"
          sx={{ alignSelf: "flex-end", fontWeight: 700, borderRadius: 3, px: 3 }}>
          Ruaj Orarin
        </Button>
      </form>
    </Paper>
  );
}
