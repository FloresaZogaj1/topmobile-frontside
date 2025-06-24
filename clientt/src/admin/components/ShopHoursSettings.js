import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";

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
    <Paper sx={{ p: 3, mb: 3, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={2} color="#50577a">
        Orari i Dyqanit
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 16 }}>
        <Box>
          <Typography fontSize={15} mb={0.5}>Hapet:</Typography>
          <TextField
            type="time"
            value={hours.open}
            onChange={e => setHours(h => ({ ...h, open: e.target.value }))}
            size="small"
          />
        </Box>
        <Box>
          <Typography fontSize={15} mb={0.5}>Mbyllet:</Typography>
          <TextField
            type="time"
            value={hours.close}
            onChange={e => setHours(h => ({ ...h, close: e.target.value }))}
            size="small"
          />
        </Box>
        <Button variant="contained" color="warning" type="submit" sx={{ alignSelf: "flex-end", fontWeight: 700 }}>
          Ruaj Orarin
        </Button>
      </form>
    </Paper>
  );
}
