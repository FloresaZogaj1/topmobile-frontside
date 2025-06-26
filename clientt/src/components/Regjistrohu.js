import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/PFP-01__5_-removebg-preview.png";

const Regjistrohu = () => {
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: dërgo të dhënat te backend për regjistrim
    alert(`Emri: ${emri}\nEmail: ${email}\nTel: ${tel}\nFjalëkalimi: ${password}`);
    // pas regjistrimit, ridrejto te login/ballina
    navigate("/kycu");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={6} sx={{ p: 4, width: 370, borderRadius: 4, bgcolor: "#fafbfc" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <img src={logo} alt="Top Mobile" style={{ height: 58, marginBottom: 8 }} />
          <Typography variant="h5" sx={{ color: "#ff6600", fontWeight: 700, letterSpacing: 1 }}>
            Krijo llogari të re
          </Typography>
        </Box>
        <form onSubmit={handleRegister}>
          <TextField label="Emri dhe Mbiemri" fullWidth required sx={{ mb: 2 }} value={emri} onChange={e => setEmri(e.target.value)} />
          <TextField label="Email" type="email" fullWidth required sx={{ mb: 2 }} value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Telefon" type="tel" fullWidth sx={{ mb: 2 }} value={tel} onChange={e => setTel(e.target.value)} />
          <TextField label="Fjalëkalimi" type="password" fullWidth required sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#ff6600", color: "#fff", fontWeight: 700, borderRadius: 3, fontSize: 17 }}>
            Regjistrohu
          </Button>
        </form>
        <Typography align="center" mt={3} variant="body2" color="#333">
          Ke llogari?{" "}
          <span style={{ color: "#ff6600", cursor: "pointer", fontWeight: 600 }} onClick={() => navigate("/kycu")}>
            Kyçu
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Regjistrohu;
