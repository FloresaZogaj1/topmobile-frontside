// src/pages/Warranty.jsx — PRINT vetëm fleta e garancionit (white mode për print, dark në ekran)

import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, MenuItem, Paper, Alert, Select, FormControl, InputLabel
} from "@mui/material";
import logo from "../assets/PFP-01__5_-removebg-preview.png";
import { api } from "../api"; // axios instance me baseURL dhe Authorization interceptor
import { useAuth } from "../AuthContext";

// Marrim datën në format YYYY-MM-DD për MySQL
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

// Të dhënat e pajisjeve dhe versionet e softuerit
const deviceData = {
  Apple: [
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 mini", "iPhone 13",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 mini", "iPhone 12",
    "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
    "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7", "iPhone 6s Plus", "iPhone 6s", "iPhone 6 Plus", "iPhone 6", "iPhone SE"
  ],
  Samsung: [
    "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S23 FE",
    "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21", "Galaxy S21 FE",
    "Galaxy Note 20 Ultra", "Galaxy Note 20",
    "Galaxy A54", "Galaxy A34", "Galaxy A24", "Galaxy A14", "Galaxy A04"
  ],
  Xiaomi: [
    "Xiaomi 14 Ultra", "Xiaomi 14", "Xiaomi 13T Pro", "Xiaomi 13T",
    "Xiaomi 13 Pro", "Xiaomi 13", "Xiaomi 12 Pro", "Xiaomi 12",
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi Note 12 Pro", "Redmi Note 12",
    "Redmi 12", "Redmi 11", "POCO X5 Pro", "POCO F5 Pro", "POCO F5"
  ]
};

const softwareVersions = {
  Apple: ["iOS 18.0", "iOS 17.6", "iOS 17.5", "iOS 17.4", "iOS 17.3", "iOS 17.2", "iOS 17.1", "iOS 17.0", "iOS 16.7", "iOS 16.6", "iOS 16.5", "iOS 16.4"],
  Samsung: ["Android 14 (One UI 6.0)", "Android 13 (One UI 5.1)", "Android 12 (One UI 4.1)", "Android 11 (One UI 3.1)"],
  Xiaomi: ["MIUI 14 (Android 13)", "MIUI 13 (Android 12)", "MIUI 12 (Android 11)", "HyperOS (Android 14)"]
};

const gjendjetPajisjes = [
  { value: "New", label: "E re" },
  { value: "Excellent", label: "E shkëlqyer" },
  { value: "Good", label: "E mirë" },
  { value: "Fair", label: "E pranueshme" },
  { value: "Poor", label: "E dëmtuar" }
];

const kohezgjatjatGarancise = [
  { value: "30 ditë", label: "30 ditë" },
  { value: "3 muaj", label: "3 muaj" },
  { value: "6 muaj", label: "6 muaj" },
  { value: "12 muaj", label: "12 muaj" },
  { value: "24 muaj", label: "24 muaj" }
];

const llojetPageses = [
  { value: "Cash", label: "Cash" },
  { value: "Card", label: "Card" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Installments", label: "Installments" }
];

// Stili i formularit
const paperSx = {
  p: 4,
  bgcolor: "rgba(255,255,255,0.05)",
  color: "var(--text)",
  border: "1px solid rgba(255,255,255,0.1)"
};

const inputSx = {
  mb: 2,
  "& .MuiInputBase-input": { color: "var(--text)" },
  "& .MuiInputLabel-root": { color: "var(--text-muted)" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&.Mui-focused fieldset": { borderColor: "var(--accent)" }
  }
};

const selectControlSx = {
  mb: 2,
  "& .MuiInputLabel-root": { color: "var(--text-muted)" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&.Mui-focused fieldset": { borderColor: "var(--accent)" }
  },
  "& .MuiSelect-select": { color: "var(--text)" },
  "& .MuiSelect-icon": { color: "var(--text-muted)" }
};

const menuProps = {
  PaperProps: {
    style: {
      backgroundColor: "rgba(30, 30, 30, 0.95)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "var(--text)"
    }
  }
};

// CSS për printim - Simple solution
const warrantyCSS = `
  .warranty-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 9999;
    overflow: auto;
    font-family: Arial, sans-serif;
  }
  
  .warranty-content {
    background: white;
    color: black;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .warranty-close {
    position: fixed;
    top: 20px;
    right: 30px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    z-index: 10000;
  }
  
  .warranty-content * {
    color: black !important;
    background: white !important;
  }
  
  .warranty-content h1 {
    text-align: center;
    margin: 20px 0;
    font-size: 24px;
    font-weight: bold;
  }
  
  .warranty-content p {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .warranty-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .warranty-content th,
  .warranty-content td {
    border: 2px solid black;
    padding: 12px;
    text-align: left;
  }
  
  .warranty-content th {
    background: #f0f0f0;
    font-weight: bold;
    text-align: center;
  }
  
  .warranty-content img {
    display: block;
    max-width: 100px;
    margin: 0 auto 15px;
  }
  
  @media print {
    .warranty-close {
      display: none !important;
    }
    
    .warranty-modal {
      background: white !important;
    }
    
    body {
      background: white !important;
    }
  }
  
  @media print {
    .warranty-preview-overlay {
      background: white !important;
      position: static !important;
      width: auto !important;
      height: auto !important;
    }
    
    .warranty-preview-container {
      box-shadow: none !important;
      border: none !important;
      max-height: none !important;
    }
    
    .warranty-close-btn {
      display: none !important;
    }
    
    .warranty-document {
      padding: 0 !important;
    }
    
    body > *:not(.warranty-preview-overlay) {
      display: none !important;
    }
  }

  @media print {
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
    }
    
    body { 
      background: white !important; 
      color: black !important; 
    }
    
    @page { 
      size: A4; 
      margin: 15mm; 
    }
    
    .warranty-sheet {
      width: 100% !important;
      max-width: none !important;
      background: white !important;
      color: black !important;
      font-family: Arial, sans-serif;
      font-size: 11px;
      line-height: 1.3;
      page-break-inside: avoid;
      box-shadow: none !important;
      margin: 0 !important;
      border: none !important;
      padding: 0 !important;
      position: static !important;
    }
    
    .warranty-logo-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid black;
    }
    
    .warranty-logo-row img {
      width: 80px;
      height: auto;
      object-fit: contain;
    }
    
    .warranty-logo-row > div {
      text-align: right;
      font-size: 10px;
      line-height: 1.2;
    }
    
    .warranty-header {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;
      text-transform: uppercase;
    }
    
    .warranty-grid {
      margin-bottom: 15px;
    }
    
    .warranty-grid-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .warranty-details-row {
      margin-bottom: 4px;
      font-size: 11px;
    }
    
    .warranty-label {
      font-weight: bold;
    }
    
    .warranty-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 10px;
    }
    
    .warranty-table th,
    .warranty-table td {
      border: 1px solid black;
      padding: 6px 4px;
      text-align: left;
      vertical-align: top;
    }
    
    .warranty-table th {
      background-color: #f0f0f0;
      font-weight: bold;
      text-align: center;
    }
    
    .warranty-section-title {
      font-size: 12px;
      font-weight: bold;
      margin: 15px 0 8px 0;
      text-decoration: underline;
    }
    
    .warranty-kushtet {
      font-size: 9px;
      line-height: 1.4;
      text-align: justify;
      margin-bottom: 20px;
    }
    
    .warranty-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
      font-size: 10px;
    }
    
    .warranty-sign {
      text-align: center;
    }
    
    .warranty-sign-line {
      display: inline-block;
      width: 120px;
      border-bottom: 1px solid black;
      margin-bottom: 3px;
    }
    
    .warranty-sign-label {
      display: block;
      font-size: 9px;
    }
  }
  
  /* Print media query to hide everything except warranty */
  @media print {
    body > *:not(#warranty-print-root) {
      display: none !important;
    }
    
    .print-overlay {
      display: none !important; /* Hide the dark overlay during print */
    }
    
    #warranty-print-root {
      display: block !important;
      position: static !important;
    }
    
    .warranty-sheet {
      box-shadow: none !important;
      margin: 0 !important;
      border: none !important;
      position: static !important;
    }
  }
`;

const Warranty = () => {
  const { user, loading } = useAuth();
  
  // Draft nga localStorage
  const savedDraft = localStorage.getItem("warrantyDraft");
  const initialForm = savedDraft ? JSON.parse(savedDraft) : {
    emri: "",
    mbiemri: "",
    telefoni: "",
    email: "",
    marka: "",
    modeli: "",
    imei: "",
    softInfo: "",
    gjendja: "New",
    kohezgjatja: "",
    cmimi: "",
    data: getTodayDate(),
    komente: "",
    llojiPageses: "Cash"
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSignatures, setShowSignatures] = useState(false); // toggle për nënshkrime në print

  // Check if user is authenticated and is admin
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Duke ngarkuar...</Typography>
      </Box>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Qasja e kufizuar
          </Typography>
          <Typography>
            Vetëm administratorët mund të krijojnë fletë garancioni. 
            Ju lutem kyçuni me llogari administratori.
          </Typography>
        </Alert>
      </Box>
    );
  }

  const validateIMEI = (imei) => /^\d{14}$/.test(imei);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (tel) => /^\d{8,}$/.test(tel.trim());
  const requireContact = () =>
    (!!form.email && validateEmail(form.email)) || (!!form.telefoni && validatePhone(form.telefoni));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };
  const handleMarkaChange = (e) => setForm({ ...form, marka: e.target.value, modeli: "", softInfo: "" });
  const handleModeliChange = (e) => setForm({ ...form, modeli: e.target.value });



  const handleDirectPrint = async () => {
    // Same validation as handlePrint
    if (!form.emri?.trim() || !form.mbiemri?.trim()) return setError("Shkruani emrin dhe mbiemrin e klientit.");
    if (!validatePhone(form.telefoni)) return setError("Numri i telefonit duhet të jetë të paktën 8 shifra.");
    if (form.email && !validateEmail(form.email)) return setError("Email-i nuk është valid.");
    if (!form.marka) return setError("Zgjidhni markën e pajisjes.");
    if (!form.modeli) return setError("Zgjidhni modelin e pajisjes.");
    if (!validateIMEI(form.imei)) return setError("IMEI-ja duhet të jetë saktësisht 14 shifra.");
    if (!form.softInfo) return setError("Zgjidhni Software Info.");
    if (!form.kohezgjatja) return setError("Zgjidhni kohëzgjatjen e garancionit.");
    if (!form.cmimi) return setError("Shkruani çmimin.");

    setError("");
    setSuccess("");
    
    try {
  await api.post("/warranty/from-form", form);
      
      // Create print content
      const printContent = createPrintHTML(form);
      
      // Open new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait a moment then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      
      // Clear form after successful save
      setForm({
        emri: "",
        mbiemri: "",
        telefoni: "",
        email: "",
        marka: "",
        modeli: "",
        imei: "",
        softInfo: "",
        gjendja: "New",
        komente: "",
        kohezgjatja: "",
        cmimi: "",
        data: getTodayDate(),
        llojiPageses: "Cash"
      });
      
      setSuccess("Garancioni u ruajt dhe u dërgua në printim!");
      
    } catch (e) {
      console.error("Direct print error:", e);
      const msg = e?.response?.data?.message || e?.message || "Gabim në ruajtjen e garancionit.";
      
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        setError("Seanca ka skaduar ose s'keni të drejta. Ju lutem kyçuni si admin.");
        return;
      }
      
      setError(msg);
    }
  };

  const createPrintHTML = (data) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fletë Garancioni</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20mm;
            color: black;
            background: white;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
          }
          .header h1 { 
            margin: 10px 0; 
            font-size: 24px; 
          }
          .logo { 
            width: 80px; 
            margin-bottom: 15px; 
          }
          .info { 
            margin-bottom: 20px; 
          }
          .info p { 
            margin: 8px 0; 
            font-size: 14px; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }
          th, td { 
            border: 2px solid black; 
            padding: 12px; 
            text-align: left; 
          }
          th { 
            background: #f0f0f0; 
            font-weight: bold; 
            text-align: center; 
          }
          .terms { 
            font-size: 12px; 
            line-height: 1.5; 
            margin-top: 30px; 
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            font-size: 12px; 
          }
          ${showSignatures ? `
          .signatures { display:flex; justify-content:space-between; margin-top:40px; }
          .signature-block { width:45%; text-align:center; }
          .sig-line { width:220px; height:0; border-bottom:1.5px solid #000; margin:50px auto 6px; }
          .sig-label { font-size:12px; }
          ` : ''}
        </style>
      </head>
      <body>
        <div class="header">
          <h1>FLETË GARANCIONI</h1>
        </div>
        
        <div class="info">
          <p><strong>Emri i klientit:</strong> ${data.emri} ${data.mbiemri}</p>
          <p><strong>Numri i telefonit:</strong> ${data.telefoni}</p>
          <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
          <p><strong>Data e blerjes:</strong> ${data.data}</p>
          <p><strong>Çmimi:</strong> €${data.cmimi}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Marka</th>
              <th>Modeli</th>
              <th>IMEI</th>
              <th>Software Info</th>
              <th>Kohëzgjatja</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.marka}</td>
              <td>${data.modeli}</td>
              <td>${data.imei}</td>
              <td>${data.softInfo}</td>
              <td>${data.kohezgjatja}</td>
            </tr>
          </tbody>
        </table>

        <div class="terms">
          <h3>Kushtet e Garancionit:</h3>
          <p>• Kjo garanci mbulon defektet e prodhimit për periudhën e specifikuar.</p>
          <p>• Dëmtimet fizike, uji dhe përdorimi i gabuar nuk mbulohen nga garancia.</p>
          <p>• Produkti duhet të paraqitet së bashku me këtë certifikatë garancije.</p>
          ${data.komente ? `<p><strong>Komente:</strong> ${data.komente}</p>` : ''}
        </div>
        ${showSignatures ? `
        <div class="signatures">
          <div class="signature-block">
            <div class="sig-line"></div>
            <div class="sig-label">Nënshkrimi i klientit</div>
          </div>
          <div class="signature-block">
            <div class="sig-line"></div>
            <div class="sig-label">Nënshkrimi TOPMOBILE</div>
          </div>
        </div>` : ''}
        <div class="footer">
          <p><strong>Top Mobile Store</strong></p>
          <p>Tel: +383 44 123 456 | Email: info@topmobile.com</p>
          <p>Adresa: Rruga Kryesore, Prishtinë, Kosovë</p>
        </div>
      </body>
      </html>
    `;
  };

  const handleDraft = () => {
    localStorage.setItem("warrantyDraft", JSON.stringify(form));
    setSuccess("Drafti është ruajtur me sukses!");
  };

  const modelet = form.marka ? deviceData[form.marka] : [];
  const softwareOpts = form.marka ? softwareVersions[form.marka] : [];

  return (
    <>
      {/* Forma (nuk printohet) */}
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 4, bgcolor: "var(--bg)" }}>
        <Typography variant="h5" fontWeight={700} mb={3} sx={{ color: "var(--text)" }}>
          Fletë Garancioni
        </Typography>

        <Paper elevation={0} sx={paperSx}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField label="Emri *" name="emri" value={form.emri} onChange={handleChange} fullWidth sx={inputSx} />
          <TextField label="Mbiemri *" name="mbiemri" value={form.mbiemri} onChange={handleChange} fullWidth sx={inputSx} />
          <TextField label="Numri i telefonit" name="telefoni" value={form.telefoni} onChange={handleChange} fullWidth sx={inputSx} inputProps={{ inputMode: "numeric", pattern: "\\d{8,}" }} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth sx={inputSx} />

          <FormControl fullWidth sx={selectControlSx}>
            <InputLabel>Marka *</InputLabel>
            <Select value={form.marka} name="marka" onChange={handleMarkaChange} label="Marka *" MenuProps={menuProps}>
              <MenuItem value=""><em>Zgjidh</em></MenuItem>
              <MenuItem value="Apple">🍏 Apple</MenuItem>
              <MenuItem value="Samsung">📱 Samsung</MenuItem>
              <MenuItem value="Xiaomi">📱 Xiaomi</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={selectControlSx}>
            <InputLabel>Modeli *</InputLabel>
            <Select value={form.modeli} name="modeli" onChange={handleModeliChange} label="Modeli *" MenuProps={menuProps} disabled={!form.marka}>
              <MenuItem value=""><em>Zgjidh</em></MenuItem>
              {modelet.map(model => (
                <MenuItem key={model} value={model}>{model}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="IMEI (14 shifra) *" name="imei" value={form.imei} onChange={handleChange} fullWidth sx={inputSx} inputProps={{ maxLength: 14, pattern: "\\d{14}" }} />

          <FormControl fullWidth sx={selectControlSx}>
            <InputLabel>Software Info *</InputLabel>
            <Select value={form.softInfo} name="softInfo" onChange={handleChange} label="Software Info *" MenuProps={menuProps} disabled={!form.marka}>
              <MenuItem value=""><em>Zgjidh</em></MenuItem>
              {softwareOpts.map(soft => (
                <MenuItem key={soft} value={soft}>{soft}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={selectControlSx}>
            <InputLabel>Gjendja e pajisjes *</InputLabel>
            <Select value={form.gjendja} name="gjendja" onChange={handleChange} label="Gjendja e pajisjes *" MenuProps={menuProps}>
              {gjendjetPajisjes.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={selectControlSx}>
            <InputLabel>Kohëzgjatja e garancionit *</InputLabel>
            <Select value={form.kohezgjatja} name="kohezgjatja" onChange={handleChange} label="Kohëzgjatja e garancionit *" MenuProps={menuProps}>
              <MenuItem value=""><em>Zgjidh</em></MenuItem>
              {kohezgjatjatGarancise.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Çmimi (€) *" name="cmimi" value={form.cmimi} onChange={handleChange} fullWidth sx={inputSx} />
          <TextField label="Data e fillimit të garancionit" name="data" value={form.data} fullWidth sx={inputSx} InputProps={{ readOnly: true }} />
          <TextField label="Komente" name="komente" value={form.komente} onChange={handleChange} fullWidth multiline rows={2} sx={inputSx} />

          <FormControl fullWidth sx={{ ...selectControlSx, mb: 3 }}>
            <InputLabel>Lloji i pagesës *</InputLabel>
            <Select value={form.llojiPageses} name="llojiPageses" onChange={handleChange} label="Lloji i pagesës *" MenuProps={menuProps}>
              {llojetPageses.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, flexDirection: "row", mt: 1 }}>
            <Button
              variant="contained"
              onClick={handleDirectPrint}
              sx={{ fontWeight: 700, fontSize: 17, background: "#4caf50", "&:hover": { background: "#45a049" } }}
              fullWidth
            >
              PRINTO FLETËN E GARANCIONIT
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDraft}
              fullWidth
              sx={{ fontWeight: 700, fontSize: 17, border: "2px solid #1976d2" }}
            >
              NË PRITJE
            </Button>
          </Box>
          <Box sx={{ mt: 3, display:'flex', alignItems:'center', gap:2 }}>
            <input
              id="toggle-signatures"
              type="checkbox"
              checked={showSignatures}
              onChange={(e) => setShowSignatures(e.target.checked)}
              style={{ width:18, height:18 }}
            />
            <label htmlFor="toggle-signatures" style={{ cursor:'pointer', fontSize:14 }}>
              Shfaq seksionin e nënshkrimeve në print
            </label>
          </Box>
        </Paper>
      </Box>


    </>
  );
};

export default Warranty;