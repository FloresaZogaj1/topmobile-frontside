import React, { useState } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper } from "@mui/material";

export function EmailNotificationSettings() {
  const [enabled, setEnabled] = useState(true); // Merr nga DB ose API realisht

  const handleToggle = () => {
    setEnabled(!enabled);
    // TODO: Thirr API për të ruajtur preferencën
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={1} color="#50577a">
        Njoftimet me Email
      </Typography>
      <FormControlLabel
        control={<Switch checked={enabled} onChange={handleToggle} color="warning" />}
        label="Merr njoftime kur krijohet një porosi e re"
      />
    </Paper>
  );
}
