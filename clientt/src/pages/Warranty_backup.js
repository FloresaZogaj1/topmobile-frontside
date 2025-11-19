// src/pages/Warranty.jsx — PRINT vetëm fleta e garancionit (white mode për print, dark në ekran)

import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, MenuItem, Paper, Alert, Select, FormControl, InputLabel
} from "@mui/material";
import logo from "../assets/PFP-01__5_-removebg-preview.png";
import { api } from "../api"; // axios instance me baseURL dhe Authorization interceptor
import { useAuth } from "../AuthContext";

// Marrim datën në format DD.MM.YYYY
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
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

// CSS për printim - Simplified approach
const warrantyCSS = `
  .warranty-preview-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .warranty-preview-container {
    width: 210mm;
    max-height: 90vh;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    overflow: auto;
    position: relative;
  }
  
  .warranty-close-btn {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f44336;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    z-index: 10001;
  }
  
  .warranty-document {
    background: white !important;
    color: black !important;
    font-family: Arial, sans-serif;
    font-size: 11px;
    line-height: 1.3;
    padding: 15mm;
    min-height: 297mm;
    width: 100%;
  }
  
  .warranty-document * {
    color: black !important;
    background: white !important;
  }
  
  .warranty-document img {
    display: block;
    max-width: 100%;
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
  const [showPrint, setShowPrint] = useState(false);
  const [printData, setPrintData] = useState(null);

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

  const handlePrint = async () => {
    if (!form.emri) return setError("Shkruani emrin.");
    if (!form.mbiemri) return setError("Shkruani mbiemrin.");
    if (!requireContact()) return setError("Vendosni një numër telefoni ose një email të vlefshëm.");
    if (!form.marka || !form.modeli) return setError("Zgjidhni pajisjen dhe modelin.");
    if (!form.imei || !validateIMEI(form.imei)) return setError("IMEI duhet të jetë saktësisht 14 shifra.");
    if (!form.softInfo) return setError("Zgjidhni versionin e softuerit.");
    if (!form.kohezgjatja) return setError("Zgjidhni kohëzgjatjen e garancionit.");
    if (!form.cmimi) return setError("Shkruani çmimin.");

    // Clear any previous messages
    setError("");
    setSuccess("");
    
    try {
      // përdor axios `api` (shton vetë token-in dhe /api baseURL)
      await api.post("/warranty/from-form", form);
      
      // Ruaj të dhënat për printim përpara se të pastrohen
      setPrintData({ ...form });
      
      // Pastro formën pas ruajtjes së suksesshme
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
      
      setSuccess("Garancioni u ruajt me sukses!");
      
    } catch (e) {
      console.error("Warranty submission error:", e);
      const msg = e?.response?.data?.message || e?.message || "Gabim në ruajtjen e garancionit.";
      
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        setError("Seanca ka skaduar ose s'keni të drejta. Ju lutem kyçuni si admin.");
        return;
      }
      
      if (e?.response?.status === 500) {
        setError("Gabim i serverit. Ju lutem provoni përsëri ose kontaktoni administratorin.");
        return;
      }
      
      setError(msg);
      return; // Don't proceed to print if there's an error
    }

    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 350);
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
              color="warning"
              onClick={handlePrint}
              sx={{ fontWeight: 700, fontSize: 17, background: "var(--accent)", "&:hover": { background: "var(--accent-hover)" } }}
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
        </Paper>
      </Box>

      {/* PRINT FLETË GARANCIONI */}
      {showPrint && printData && (
        <>
          <style>{`
            .simple-warranty-modal {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.8);
              z-index: 9999;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            .simple-warranty-content {
              background: white;
              color: black;
              width: 90%;
              max-width: 800px;
              max-height: 90%;
              overflow: auto;
              padding: 40px;
              position: relative;
            }
            
            .simple-warranty-close {
              position: absolute;
              top: 10px;
              right: 15px;
              background: #f44336;
              color: white;
              border: none;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              cursor: pointer;
              font-size: 18px;
            }
            
            @media print {
              .simple-warranty-modal {
                background: white !important;
                position: static !important;
              }
              
              .simple-warranty-close {
                display: none !important;
              }
              
              body * {
                visibility: hidden;
              }
              
              .simple-warranty-modal, .simple-warranty-modal * {
                visibility: visible;
              }
            }
          `}</style>
          <div className="simple-warranty-modal">
            <div className="simple-warranty-content">
              <button className="simple-warranty-close" onClick={() => setShowPrint(false)}>×</button>
              
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <img src={logo} alt="Top Mobile" style={{ width: '80px', marginBottom: '15px' }} />
                <h1 style={{ margin: 0, fontSize: '24px' }}>FLETË GARANCIONI</h1>
              </div>
            <div className="warranty-logo-row">
              <img src={logo} alt="Logo" />
              <div>
                <div style={{ fontWeight: 600 }}>Top Mobile</div>
                <div>Rr. Bulevardi dëshmorët e kombit<br />Ulpianë, Prishtinë</div>
                <div>TEL: 048 723 720</div>
              </div>
            </div>

            <div className="warranty-header">Fletë Garancioni</div>

            <div className="warranty-grid">
              <div className="warranty-grid-row">
                <div>
                  <div className="warranty-details-row"><span className="warranty-label">Klienti:</span> {printData.emri} {printData.mbiemri}</div>
                  <div className="warranty-details-row"><span className="warranty-label">Data e fillimit te garancionit:</span> {printData.data}</div>
                </div>
                <div>
                  <div className="warranty-details-row"><span className="warranty-label">Detajet:</span> Çmimi: {printData.cmimi}€</div>
                </div>
              </div>
            </div>

            <table className="warranty-table">
              <thead>
                <tr>
                  <th>Modeli</th>
                  <th>IMEI</th>
                  <th>Software Info</th>
                  <th>Kohëzgjatja e garancionit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{printData.modeli}</td>
                  <td>{printData.imei}</td>
                  <td>{printData.softInfo}</td>
                  <td>{printData.kohezgjatja}</td>
                </tr>
              </tbody>
            </table>

            <div className="warranty-section-title">Kushtet e Garancionit</div>
            <div className="warranty-kushtet">
              Periudha e Garancionit fillon nga data e blerjes dhe perfundon ne afatin e shprehur ne Fletë Garancion. Shërbimi i garancionit do te kryhet ne ambientet e servisit te Top Mobile.<br /><br />
              <b>Garancioni mbulon riparimin (kthimin ne gjendje pune) falas te produkteve te shitura nga Top Mobile, duke plotesuar njekohesisht te gjitha kushtet e meposhtme:</b><br />
              - Defekti i produktit eshte me origjine prodhimi / nga fabrika<br />
              - Produkti shoqerohet me Faturen e blerjes dhe Fleten e Garancise<br />
              Top Mobile ka per obligim eleminimin e defektit sa me te shpejte, ne rastin me te keq per nje periudhe 30 ditore.<br /><br />
              <b>Garancioni nuk vlen ne keto raste:</b><br />
              - Demtimet fizike nga keperdorimi, pakujdesia etj<br />
              - Perditësimi i software-sistemit operativ (Update, downgrade) etj<br />
              - Perdorimi i produktit ne ambiente te papershtatshme (lagështi, nxehtësi, etj)<br />
              - Demtimet e shkaktuara nga tensioni i larte apo i ulet i rrymes elektrike, nga demtimet termike apo mekanike rrufeja etj.<br />
              - Demtimet nga ekspozimi i pajisjes ndaj lagështisë, nxehtësisë, tymit, dridhjeve, papastërtive, apo kushteve te jashtëzakonshme apo te papershtatshme.<br />
              - Nëse bleresi nuk e ka flet garancionin.<br />
              - Nëse aparati është hapur dhe është tentuar te riparohet nga person i cili nuk ka autorizim nga servisi i Top Mobile.<br />
            </div>

            <div className="warranty-footer">
              <div><b>Top Mobile</b></div>
              <div className="warranty-sign">
                <span className="warranty-sign-line"></span>
                <span className="warranty-sign-label">Nënshkrimi i klientit</span>
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Warranty;