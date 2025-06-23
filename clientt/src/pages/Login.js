import axios from "axios";
import { useState } from "react";
import { Box, Button, Paper, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://topmobile-backside-production.up.railway.app/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      onLogin && onLogin();
    } catch (err) {
      setError("Gabim në login! Kontrollo të dhënat.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(115deg,#fff,#fff7ef 80%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Paper elevation={4} sx={{
        p: { xs: 3, sm: 5 },
        maxWidth: 400,
        width: "100%",
        borderRadius: 5,
        boxShadow: "0 6px 28px #ff800018"
      }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            mb: 3,
            color: "#ff8000"
          }}
        >
          Kyçu në Top Mobile
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ mb: 2, background: "#fff" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="warning" />
                </InputAdornment>
              ),
            }}
            autoFocus
          />
          <TextField
            fullWidth
            label="Password"
            type={showPwd ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 3, background: "#fff" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="warning" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPwd((s) => !s)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            size="large"
            disabled={loading}
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 17,
              py: 1.3,
              boxShadow: "0 2px 12px #ff800038",
              mb: 1
            }}
          >
            {loading ? "Duke u kyçur..." : "Kyçu"}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </form>
        <Typography sx={{ color: "#50577a", mt: 3, textAlign: "center", fontSize: 15 }}>
          Nuk ke llogari? <span style={{ color: "#ff8000", fontWeight: 600, cursor: "pointer" }}>Na kontakto për të krijuar një llogari</span>
        </Typography>
      </Paper>
    </Box>
  );
}
