import React, { useState, useContext, useEffect } from "react";
import {
  Box, Button, TextField, Typography, Paper, Alert,
  InputAdornment, IconButton
} from "@mui/material";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

// ⬇️ njëjtë si te Login – përdor prod si fallback
const API_URL =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  "https://api.topmobile.store";

// ⬇️ helper si te Login: provo /api/auth/register dhe pastaj /auth/register
async function registerRequest(body) {
  let res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // ⛔️ MOS përdor credentials këtu – s’po vendosim cookie
    body: JSON.stringify(body),
  });

  if (res.status === 404) {
    res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  return res;
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await registerRequest(form);
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage({ type: "success", text: "Regjistrimi i suksesshëm!" });
        // opsionale: login automatik nqs backend kthen token+user
        // if (data.token && data.user) {
        //   localStorage.setItem("tm_token", data.token);
        //   localStorage.setItem("token", data.token);
        //   login(data.token, data.user);
        //   return navigate("/", { replace: true });
        // }
        setTimeout(() => navigate("/login", { replace: true }), 900);
      } else {
        setMessage({ type: "error", text: data.message || "Gabim në regjistrim" });
      }
    } catch {
      setMessage({ type: "error", text: "Gabim në lidhje me serverin!" });
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !form.name.trim() || !form.email.trim() || !form.password.trim();

  const controlSx = {
    "& .MuiInputBase-root": {
      background: "var(--chip)",
      color: "var(--text)",
      borderRadius: "14px",
      border: "1px solid var(--chip-stroke)",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--chip-stroke)" },
    "& .MuiInputLabel-root": { color: "var(--muted)" },
    "& .MuiSvgIcon-root": { color: "var(--muted)" },
    "& .MuiInputBase-input::placeholder": { color: "#8d8d8d" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--accent)",
      boxShadow: "0 0 0 4px rgba(255,128,0,.12)",
    },
  };

  return (
    <Box className="auth-page">
      <Paper elevation={0} className="auth-card">
        <Typography variant="h4" className="brand" component="div">
          <span>topmobile</span>
        </Typography>

        <Typography variant="subtitle1" align="center" sx={{ color: "var(--muted)", mb: 2 }}>
          Krijo një llogari të re
        </Typography>

        {message.text && (
          <Alert severity={message.type === "success" ? "success" : "error"} sx={{ mb: 2, borderRadius: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField label="Emri" name="name" value={form.name} onChange={handleChange}
                     required fullWidth margin="dense" autoComplete="name" sx={controlSx} />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange}
                     required fullWidth margin="dense" autoComplete="email" sx={controlSx} />
          <TextField
            label="Fjalëkalimi" name="password" type={showPwd ? "text" : "password"}
            value={form.password} onChange={handleChange} required fullWidth margin="dense"
            autoComplete="new-password" sx={controlSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPwd((v) => !v)}
                    edge="end"
                    aria-label={showPwd ? "Fshihe fjalëkalimin" : "Shfaq fjalëkalimin"}
                    sx={{ color: "var(--muted)" }}
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" disabled={disabled} className="btn-accent" sx={{ mt: 2 }}>
            {loading ? "Duke u regjistruar…" : "Regjistrohu"}
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography fontSize={14} sx={{ color: "var(--muted)" }}>
            Ke llogari? <Link to="/login" className="accent-link">Kyçu</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
