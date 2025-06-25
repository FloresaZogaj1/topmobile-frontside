// src/pages/Settings.js

import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { EmailNotificationSettings } from "./EmailNotificationSettings";
import { ProfileSettings } from "./ProfileSettings";
import { ShopHoursSettings } from "./ShopHoursSettings";
import SettingsIcon from '@mui/icons-material/Settings';

export default function Settings() {
  return (
    <Box sx={{ maxWidth: 650, mx: "auto", mt: 5, mb: 6, px: 2 }}>
      <Stack direction="row" alignItems="center" gap={1} justifyContent="center" mb={4}>
        <SettingsIcon sx={{ color: "#ff8000", fontSize: 34 }} />
        <Typography variant="h4" sx={{
          color: "#ff8000", fontWeight: 800, letterSpacing: 1.1, textAlign: "center"
        }}>
          Cilësimet e Llogarisë
        </Typography>
      </Stack>
      <Divider sx={{ mb: 4 }} />
      <ProfileSettings />
      <EmailNotificationSettings />
      <ShopHoursSettings />
      {/* Shto këtu seksione të reja në të ardhmen */}
    </Box>
  );
}
