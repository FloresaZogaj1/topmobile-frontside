import React, { useState } from "react";
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Paper, Divider } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from "../assets/PFP-01__5_-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "../firebase";

const Kyqu = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kyçja me Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // dërgo te backend, merr JWT (nëse ke backend)
      // localStorage.setItem("token", tokenNgaBackend);

      // Ridrejto automatikisht te Ballina
      navigate("/");
    } catch (err) {
      alert("Gabim gjatë kyçjes me Google");
    }
    setLoading(false);
  };

  // Kyçja me Facebook
 

  // Kyçja me email/password (login klasik)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
  
      if (res.ok && data.token) {
        // Ruaj token-in për përdorim të mëvonshëm
        localStorage.setItem("token", data.token);
        // Ridrejto te ballina ose dashboard
        navigate("/");
      } else {
        alert(data.error || "Gabim gjatë kyçjes!");
      }
    } catch (err) {
      alert("Gabim gjatë kyçjes!");
    }
    setLoading(false);
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 370,
          borderRadius: 4,
          bgcolor: "#fafbfc",
          boxShadow: "0px 4px 32px 0px #ff660015",
        }}
      >
        {/* Logo dhe brendi */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <img src={logo} alt="Top Mobile" style={{ height: 58, marginBottom: 8 }} />
          <Typography variant="h5" sx={{ color: "#ff6600", fontWeight: 700, letterSpacing: 1 }}>
            Kyçu në llogari
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 1 }}>
            Mirë se vini te Top Mobile
          </Typography>
        </Box>

        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "#ff6600",
            color: "#222",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { borderColor: "#ff6600", bgcolor: "#ff660010" },
          }}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Identifikohu me Google
        </Button>
    

        <Divider sx={{ mb: 2, mt: 1 }}>ose</Divider>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="dense"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              mb: 1,
            }}
          />
          <TextField
            label="Fjalëkalimi"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="dense"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              mb: 1,
            }}
          />
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1} mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  sx={{ color: "#ff6600" }}
                />
              }
              label={<span style={{ fontSize: 14 }}>Më mbaj të kyçur</span>}
            />
            <Typography
              variant="body2"
              sx={{ color: "#ff6600", cursor: "pointer", fontWeight: 600, fontSize: 14 }}
              onClick={() => alert("Reset password (implemento këtë faqe!)")}
            >
              Keni harruar fjalëkalimin?
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              bgcolor: "#ff6600",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 3,
              fontSize: 17,
              letterSpacing: 1,
              boxShadow: "0px 2px 8px 0px #ff660035",
              textTransform: "none",
              "&:hover": { bgcolor: "#e05500" }
            }}
            disabled={loading}
          >
            Kyçu
          </Button>
        </form>
<Typography align="center" mt={3} variant="body2" color="#333">
  Nuk keni llogari?{" "}
  <span
    style={{ color: "#ff6600", cursor: "pointer", fontWeight: 600 }}
    onClick={() => navigate("/regjistrohu")}
  >
    Regjistrohu
  </span>
</Typography>

      </Paper>
    </Box>
  );
};

export default Kyqu;
