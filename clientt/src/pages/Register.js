import { useState } from "react";
import { Box, Button, Paper, TextField, Typography, InputAdornment, IconButton, Alert, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Regjistrimi u krye me sukses! Mund të kyçesh tani.");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setLoggedIn && setLoggedIn(true);
          window.location.href = "/login";
        }, 1400);
      } else {
        setError(data.error || "Regjistrimi dështoi!");
      }
    } catch {
      setError("Gabim në lidhje!");
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#fff,#fff7ef 80%)",
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
          Regjistrohu në Top Mobile
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }} autoComplete="off">
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <TextField
            fullWidth
            label="Përdoruesi"
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
            autoComplete="username"
            required
          />
          <TextField
            fullWidth
            label="Fjalëkalimi"
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
                    onClick={() => setShowPwd(s => !s)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
            required
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
            {loading ? <CircularProgress size={25} sx={{ color: "#fff" }} /> : "Regjistrohu"}
          </Button>
        </form>
        <Typography sx={{ color: "#50577a", mt: 3, textAlign: "center", fontSize: 15 }}>
          Ke llogari?{" "}
          <a
            href="/login"
            style={{
              color: "#ff8000",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            Kyçu këtu
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
