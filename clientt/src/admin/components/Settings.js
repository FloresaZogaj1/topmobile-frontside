import React from "react";
import { Box, Typography } from "@mui/material";
import { EmailNotificationSettings } from "./EmailNotificationSettings";
import { ProfileSettings } from "./ProfileSettings";
import { ShopHoursSettings } from "./ShopHoursSettings";

export default function Settings() {
  return (
    <Box sx={{ maxWidth: 550, mx: "auto", mt: 4, mb: 5 }}>
      <Typography variant="h4" sx={{ color: "#ff8000", fontWeight: 700, mb: 4, textAlign: "center" }}>
        Cilësimet
      </Typography>
      <ProfileSettings />
      <EmailNotificationSettings />
      <ShopHoursSettings />
      {/* Shto këtu çka të duash në të ardhmen */}
    </Box>
  );
}
