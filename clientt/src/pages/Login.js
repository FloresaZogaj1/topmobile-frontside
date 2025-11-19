import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL || "https://api.topmobile.store";

// Funksion ndihmës që bën fallback nëse /api/auth/login kthen 404
async function loginRequest(body) {
  // provo /api/auth/login
  let res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // nëse nuk ekziston (404), provo /auth/login
  if (res.status === 404) {
    res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  return res;
}

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPwd, setShowPwd] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  useEffect(() => {
    const existing =
      localStorage.getItem("tm_token") || localStorage.getItem("token");
    if (existing || user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await loginRequest(form);
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.token && data.user) {
        localStorage.setItem("tm_token", data.token);
        localStorage.setItem("token", data.token);
        login(data.token, data.user);

        if (from) {
          const isAdminOnly =
            from.startsWith("/admin") || from.startsWith("/warranty");
          if (isAdminOnly) {
            if (data.user.role === "admin")
              return navigate(from, { replace: true });
            return navigate("/", { replace: true });
          }
          return navigate(from, { replace: true });
        }

        if (data.user.role === "admin") return navigate("/admin", { replace: true });
        return navigate("/", { replace: true });
      }

      setMessage({ type: "error", text: data.message || "Gabim në login" });
    } catch {
      setMessage({ type: "error", text: "Gabim në lidhje me serverin!" });
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const disabled = !form.email.trim() || !form.password.trim();

  const controlSx = {
    "& .MuiInputBase-root": {
      background: "var(--chip)",
      color: "var(--text)",
      borderRadius: "14px",
      border: "1px solid var(--chip-stroke)",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--chip-stroke)",
    },
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

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "var(--muted)", mb: 2 }}
        >
          Kyçu në llogarinë tënde
        </Typography>

        {message.text && (
          <Alert
            severity={message.type === "success" ? "success" : "error"}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            {message.text}
          </Alert>
        )}

        <Button
          fullWidth
          variant="outlined"
          className="btn-chip"
          sx={{ mb: 1.2, textTransform: "none" }}
          startIcon={
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              width="22"
              height="22"
              alt="google"
              style={{ borderRadius: 2 }}
            />
          }
          onClick={loginWithGoogle}
        >
          Identifikohu me Google
        </Button>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Adresa e emailit"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            margin="dense"
            autoComplete="email"
            sx={controlSx}
          />
          <TextField
            label="Fjalëkalimi"
            name="password"
            type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            margin="dense"
            autoComplete="current-password"
            sx={controlSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPwd((v) => !v)}
                    edge="end"
                    aria-label={
                      showPwd ? "Fshihe fjalëkalimin" : "Shfaq fjalëkalimin"
                    }
                    sx={{ color: "var(--muted)" }}
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={disabled}
            className="btn-accent"
            sx={{ mt: 2 }}
          >
            Kyçu
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography fontSize={14} sx={{ color: "var(--muted)" }}>
            Nuk ke llogari?{" "}
            <Link to="/register" className="accent-link">
              Regjistrohu
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
