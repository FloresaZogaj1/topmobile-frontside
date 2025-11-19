// src/components/HeaderPhaseControls.jsx
import { useThemePhase } from "../theme/ThemeProvider";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function HeaderPhaseControls() {
  const { phase, setManualPhase, enableAuto, auto } = useThemePhase();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
      <Button
        variant="contained"
        onClick={enableAuto}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          bgcolor: "var(--accent)",
          "&:hover": { bgcolor: "var(--accent)" },
        }}
      >
        {auto ? "Auto" : "Manual"}
      </Button>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="phase-label">Phase</InputLabel>
        <Select
          labelId="phase-label"
          label="Phase"
          value={phase}
          onChange={(e) => setManualPhase(e.target.value)}
          sx={{
            bgcolor: "var(--card)",
            color: "var(--text)",
            "& .MuiSelect-icon": { color: "var(--text)" },
          }}
        >
          <MenuItem value="night">Night</MenuItem>
          <MenuItem value="dawn">Dawn</MenuItem>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="dusk">Dusk</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
