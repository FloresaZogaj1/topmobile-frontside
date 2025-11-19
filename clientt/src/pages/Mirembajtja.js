// Mirembajtja.jsx
import React, { useMemo, useState } from "react";
import foto111 from "../assets/PFP-01__5_-removebg-preview.png";
import { api } from "../api";
import {
  Box, Typography, TextField, Button, MenuItem, Paper,
  Alert, Select, FormControl, InputLabel, Stack, Divider
} from "@mui/material";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000" // ← backend-i lokal
    : (process.env.REACT_APP_API_URL || "https://api.topmobile.store");

/* ——— Pajisjet & Versionet (dropdown) ——— */
const deviceData = {
  Apple: [
    "iPhone 12","iPhone 12 mini","iPhone 12 Pro","iPhone 12 Pro Max",
    "iPhone 13","iPhone 13 mini","iPhone 13 Pro","iPhone 13 Pro Max",
    "iPhone SE (3rd gen)","iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
    "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
    "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max","iPhone 16e",
    "iPad (8th gen)","iPad (9th gen)","iPad (10th gen)","iPad mini (6th gen)",
    "iPad Air (4th gen)","iPad Air (5th gen)","iPad Pro 11″ (2020)","iPad Pro 12.9″ (2020)",
    "iPad Pro 11″ (2021)","iPad Pro 12.9″ (2021)","iPad Pro 11″ (M2 2022)","iPad Pro 12.9″ (M2 2022)",
    "Apple Watch Series 6","Apple Watch SE (1st gen)","Apple Watch Series 7","Apple Watch Series 8",
    "Apple Watch SE (2nd gen)","Apple Watch Ultra","Apple Watch Series 9","Apple Watch Ultra 2","Apple Watch Series 10"
  ],
  Samsung: [
    "Galaxy S20","Galaxy S20+","Galaxy S20 Ultra","Galaxy S20 FE / FE 5G",
    "Galaxy S21","Galaxy S21+","Galaxy S21 Ultra","Galaxy S21 FE",
    "Galaxy S22","Galaxy S22+","Galaxy S22 Ultra","Galaxy S23","Galaxy S23+","Galaxy S23 Ultra","Galaxy S23 FE",
    "Galaxy S24","Galaxy S24+","Galaxy S24 Ultra","Galaxy S24 FE","Galaxy S25","Galaxy S25+","Galaxy S25 Ultra","Galaxy S25 Edge","Galaxy S25 Ultra Enterprise Edition",
    "Galaxy A25","Galaxy A26 5G","Galaxy A33","Galaxy A34","Galaxy A35","Galaxy A52","Galaxy A53","Galaxy A54","Galaxy A55","Galaxy A56",
    "Galaxy F05","Galaxy F14","Galaxy F15","Galaxy F34","Galaxy F54","Galaxy F55",
    "Galaxy M05","Galaxy M14","Galaxy M15","Galaxy M33","Galaxy M34","Galaxy M35","Galaxy M53","Galaxy M54","Galaxy M55","Galaxy M55s",
    "Galaxy Z Fold 2","Galaxy Z Fold 3","Galaxy Z Fold 4","Galaxy Z Fold 5","Galaxy Z Fold 6","Galaxy Z Fold 7",
    "Galaxy Z Flip","Galaxy Z Flip 3","Galaxy Z Flip 4","Galaxy Z Flip 5","Galaxy Z Flip 6","Galaxy Z Flip 7","Galaxy Z Flip 7 FE",
    "Galaxy Tab S6 Lite","Galaxy Tab S7","Galaxy Tab S7+","Galaxy Tab S7 FE",
    "Galaxy Tab S8","Galaxy Tab S8+","Galaxy Tab S8 Ultra","Galaxy Tab S9","Galaxy Tab S9+","Galaxy Tab S9 Ultra",
    "Galaxy Tab S10","Galaxy Tab S10+","Galaxy Tab S10 Ultra",
    "Galaxy Watch Active2","Galaxy Watch 3","Galaxy Watch 4","Galaxy Watch 4 Classic",
    "Galaxy Watch 5","Galaxy Watch 5 Pro","Galaxy Watch 6","Galaxy Watch 6 Classic",
    "Galaxy Watch 7","Galaxy Watch 8","Galaxy Watch 8 Classic","Galaxy Watch Ultra"
  ],
  Xiaomi: [
    "Mi 10","Mi 10 Pro","Mi 10 Lite","Mi 10T","Mi 10T Pro","Mi 11","Mi 11 Pro","Mi 11 Ultra","Mi 11 Lite","Mi 11X",
    "Mi 12","Mi 12 Pro","Mi 12X","Mi 12T","Mi 12T Pro","Mi 13","Mi 13 Pro","Mi 13 Ultra","Mi 13 Lite",
    "Mi 14","Mi 14 Pro","Mi 14 Ultra","Xiaomi 15 Ultra","Redmi Note 10","Redmi Note 10 Pro","Redmi Note 10 Pro Max","Redmi Note 10 5G",
    "Redmi Note 11","Redmi Note 11 Pro","Redmi Note 11 Pro+","Redmi Note 12","Redmi Note 12 Pro","Redmi Note 12 Pro+","Redmi Note 12 Turbo","Redmi Note 12S","Redmi Note 12 5G",
    "Redmi Note 13","Redmi Note 13 Pro","Redmi Note 13 Pro+","Redmi Note 13 R","Redmi Note 13 5G","Redmi Note 14","Redmi Note 14 Pro","Redmi Note 14 Pro+","Redmi Note 14 Pro+ 5G",
    "Redmi K40 Gaming","Redmi K40S","Redmi K50","Redmi K50 Pro","Redmi K50 Ultra","Redmi K50i","Redmi K60","Redmi K60 Pro","Redmi K60 Ultra","Redmi K70","Redmi K70 Pro","Redmi K70 Ultra",
    "Poco F2 Pro","Poco F3","Poco F4","Poco F5","Poco F5 Pro","Poco M7 Pro 5G","Poco X3","Poco X3 Pro","Poco X4 GT","Poco X5 Pro","Poco X6","Poco X6 Pro","Poco X7","Poco X7 Neo","Poco X7 Pro","Poco X7 Ultra",
    "Xiaomi Pad 5","Xiaomi Pad 5 Pro","Xiaomi Pad 6","Xiaomi Pad 6 Pro","Xiaomi Pad 6 Max 14","Redmi Pad","Redmi Pad SE 8.7","Redmi Pad Pro",
    "Mi Watch","Mi Watch Lite","Mi Watch Revolve","Xiaomi Watch S1","Watch S1 Active","Xiaomi Watch 2","Watch 2 Pro","Xiaomi Watch S4",
    "Mi Smart Band 5","6","7","Xiaomi Smart Band 8","9 Pro"
  ],
};

const softwareVersions = {
  Apple: [
    "iOS 14 – 2020","iOS 15 – 2021","iOS 16 – 2022","iOS 17 – 2023","iOS 18 – 2024",
    "iPadOS 14 – 2020","iPadOS 15 – 2021","iPadOS 16 – 2022","iPadOS 17 – 2023","iPadOS 18 – 2024",
    "watchOS 7 – 2020","watchOS 8 – 2021","watchOS 9 – 2022","watchOS 10 – 2023","watchOS 11 – 2024"
  ],
  Samsung: [
    "Android 10 + One UI 2.x – 2020","Android 11 + One UI 3.x – 2021","Android 12 + One UI 4.x – 2022","Android 13 + One UI 5.x – 2023",
    "Android 14 + One UI 6.x – 2024","Android 15 + One UI 7.x – 2025",
    "Tizen OS 5.5 – 2020 (Galaxy Watch 3)","Wear OS 3 (One UI Watch) – 2021–2023","Wear OS 4 – 2023 (Watch 6/6 Classic)","Wear OS 5 – 2024–2025"
  ],
  Xiaomi: [
    "MIUI 12 – 2020","MIUI 12.5 – 2021","MIUI 13 – 2022","MIUI 14 – 2023",
    "HyperOS 1.0 – 2024","HyperOS 2.0 – 2025",
    "RTOS – deri 2022","Zepp OS 1.0 – 2022 (Watch S1)","Zepp OS 2.0 – 2023","HyperOS for Watch – 2024"
  ]
};

const llojetPageses = [
  { value: "Cash", label: "Cash" },
  { value: "Transfer Bankar", label: "Transfer Bankar" },
  { value: "POS", label: "POS" },
];

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function formatDateSq(iso) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("sq-AL"); } catch { return iso; }
}

/* ——— Kontrata autoincrement 00000001, 00000002… ——— */
function nextContractNo() {
  const KEY = "softsave_contract_counter";
  const current = parseInt(localStorage.getItem(KEY) || "0", 10);
  const next = current + 1;
  localStorage.setItem(KEY, String(next));
  return String(next).padStart(8, "0");
}

function generateIMEI14() {
  let s = "";
  for (let i = 0; i < 14; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// 🎨 Sx dark për TextField/Select (premium orange/green)
const controlSx = {
  "& .MuiInputBase-root": {
    background: "#111111",
    color: "#f4eedc",
    borderRadius: "14px",
    border: "1px solid #1a1a1a",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#232323" },
  "& .MuiInputLabel-root": { color: "#b9b3a0" },
  "& .MuiSvgIcon-root": { color: "#b9b3a0" },
  "& .MuiFormHelperText-root": { color: "#b9b3a0" },
  "& .MuiInputBase-input::placeholder": { color: "#8d8d8d" },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff7a00",
    boxShadow: "0 0 0 4px rgba(255,122,0,.16)",
  },
};

export default function Mirembajtja() {
  const [form, setForm] = useState({
    klienti: "",
    mbiemri: "",
    brand: "",
    model: "",
    version: "",
    imei: "",                  // ← FILLON BOSH (s’gjenerohet automatikisht)
    llojiPageses: "Cash",
    data: todayISO(),
  });
  const [contractNo, setContractNo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  // ⛔️ HOQËM gjenerimin automatik në useEffect
  // useEffect(() => { setForm((f) => ({ ...f, imei: generateIMEI14() })); }, []);

  const imeiOK = useMemo(() => /^\d{14}$/.test(form.imei), [form.imei]);
  const models = useMemo(() => form.brand ? deviceData[form.brand] || [] : [], [form.brand]);
  const versions = useMemo(() => form.brand ? softwareVersions[form.brand] || [] : [], [form.brand]);

  const allValid = useMemo(
    () =>
      form.klienti.trim() &&
      form.mbiemri.trim() &&
      form.brand &&
      form.model &&
      imeiOK &&
      !!form.llojiPageses,
    [form, imeiOK]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError(""); setSuccess(""); setPending(false);
  };

  const handlePending = () => {
    if (!form.klienti.trim()) return setError("Shkruani emrin e klientit!");
    if (!form.mbiemri.trim()) return setError("Shkruani mbiemrin!");
    if (!form.brand) return setError("Zgjidh markën e pajisjes!");
    if (!form.model) return setError("Zgjidh modelin e pajisjes!");
    if (!imeiOK) return setError("IMEI duhet të ketë saktësisht 14 shifra numerike!");
    if (!form.llojiPageses) return setError("Zgjidh llojin e pagesës!");
    setPending(true);
    setSuccess("Kontrata është vendosur në pritje!");
  };

  // Print helper që përdor një dritare të re me sfond të bardhë
  function doPrintFromElement(el) {
    if (!el) return;
    const css = `@page { size: A4; margin: 10mm; }
      body { background:#fff !important; color:#111; font-family: Inter, system-ui, Arial, sans-serif; }
      #print-area.a4 { width:210mm; min-height:297mm; padding:18mm 16mm; box-sizing:border-box; }
      #print-area .header { display:flex; align-items:center; gap:16px; margin-bottom:8mm; }
      #print-area .header .logo img { height:22mm; object-fit:contain; }
      #print-area .title h1 { margin:0; font-size:18pt; letter-spacing:.5px; }
      #print-area .title h2 { margin:0; font-size:14pt; color:#333; }
      #print-area .row { display:flex; gap:14px; justify-content:space-between; align-items:flex-end; }
      #print-area .row.meta { margin-bottom:6mm; }
      #print-area .block { border-top:1px solid #ddd; border-bottom:1px solid #ddd; padding:6mm 0; margin:4mm 0 6mm; }
      #print-area .col { flex:1; }
      #print-area .two-cols { align-items:flex-start; gap:18px; }
      #print-area .two-cols .col h3 { margin:0 0 6px; }
      #print-area ul { margin:4px 0 8px 18px; }
      #print-area .line { display:inline-block; min-width:48mm; border-bottom:1px solid #222; padding:0 2mm 1mm; }
      #print-area .big { min-width:80mm; height:12mm; }
      #print-area .muted { font-size:10pt; color:#666; margin-top:3mm; }
      #print-area .signs { display:flex; justify-content:space-between; gap:14px; margin-top:14mm; }`;
    const win = window.open('', 'PRINT', 'width=840,height=1170');
    win.document.write('<!doctype html><html><head><title>Kontratë Soft & Save</title><meta charset="utf-8" />');
    win.document.write('<style>' + css + '</style>');
    win.document.write('</head><body>' + el.outerHTML + '</body></html>');
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
  }

  const handlePrint = async () => {
    if (!allValid) {
      setError("Plotëso fushat e detyrueshme para printimit.");
      return;
    }
    try {
      // Backend pret emri, mbiemri, telefoni, email, marka, modeli, imei, pajisja, cmimi, llojiPageses, data, komente
      const payload = {
        emri: form.klienti,
        mbiemri: form.mbiemri,
        marka: form.brand,
        modeli: form.model,
        pajisja: form.version || null, // përdorim version si pajisja / info shtesë
        imei: form.imei,
        llojiPageses: form.llojiPageses,
        data: form.data,
        cmimi: null,
        telefoni: null,
        email: null,
        komente: null,
      };

      // Mos shto /api sepse baseURL tashmë e ka /api.
      const { data: json } = await api.post("/contracts/softsave", payload);

      // Backend kthen ok + contract_id; nuk kthen contract_no aktualisht
      setContractNo(json.contract_id ? `ID ${json.contract_id}` : "");
      setShowPrint(true);
      setTimeout(() => {
        const el = document.getElementById('print-area');
        doPrintFromElement(el);
        setShowPrint(false);
      }, 150);
      setError("");
      setSuccess("Kontrata u ruajt me sukses!");
    } catch (e) {
      console.error("Ruajtja e kontratës dështoi:", e);
      const msg = e?.response?.data?.message || e.message || "Gabim";
      setError(msg);
    }
  };

  return (
    <>
      <style>{`
        .softsave-dark {
          min-height: 100vh;
          background:
            radial-gradient(1200px 600px at 80% -10%, rgba(255,122,0,.08), transparent 60%),
            radial-gradient(900px 500px at -10% 10%, rgba(255,122,0,.05), transparent 58%),
            #0b0b0b;
          padding-bottom: 64px;
          border-top: 1px solid #1b1b1b;
        }
        #print-area.a4 {
          width: 210mm; min-height: 297mm;
          padding: 18mm 16mm; background:#fff; color:#111;
          font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          line-height: 1.35; box-shadow: 0 0 0.5mm rgba(0,0,0,.1);
        }
        #print-area .header { display:flex; align-items:center; gap:16px; margin-bottom:8mm; }
        #print-area .header .logo img { height: 22mm; object-fit: contain; }
        #print-area .title h1 { margin:0; font-size: 18pt; letter-spacing:.5px; }
        #print-area .title h2 { margin:0; font-size: 14pt; color:#333; }
        #print-area .row { display:flex; gap:14px; justify-content:space-between; align-items:flex-end; }
        #print-area .row.meta { margin-bottom:6mm; }
        #print-area .block { border-top:1px solid #ddd; border-bottom:1px solid #ddd; padding:6mm 0; margin:4mm 0 6mm; }
        #print-area .col { flex:1; }
        #print-area .two-cols { align-items:flex-start; gap:18px; }
        #print-area .two-cols .col h3 { margin:0 0 6px; }
        #print-area ul { margin:4px 0 8px 18px; }
        #print-area .line { display:inline-block; min-width:48mm; border-bottom:1px solid #222; padding:0 2mm 1mm; }
        #print-area .big { min-width:80mm; height:12mm; }
        #print-area .muted { font-size:10pt; color:#666; margin-top:3mm; }
        #print-area .signs { display:flex; justify-content:space-between; gap:14px; margin-top:14mm; }

        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area { position: absolute; left: 0; top: 0; margin:0; box-shadow:none; }
        }
        @page { size: A4; margin: 10mm; }
      `}</style>

      <Box className="softsave-dark">
        <Box className="tm-container" sx={{ mx: "auto", pt: 6, maxWidth: 520 }}>
          <Typography
            variant="h5"
            fontWeight={900}
            sx={{ color: "#f4eedc", mb: 2, textAlign: "center" }}
          >
            Kontratë Mirëmbajtjeje Softuerësh
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              bgcolor: "#0f0f0f",
              border: "1px solid #1b1b1b",
              boxShadow: "0 16px 60px rgba(0,0,0,.45)",
              color: "#f4eedc",
            }}
          >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Stack spacing={2}>
              <TextField
                label="Emri i klientit *"
                name="klienti"
                value={form.klienti}
                onChange={handleChange}
                sx={controlSx}
              />
              <TextField
                label="Mbiemri *"
                name="mbiemri"
                value={form.mbiemri}
                onChange={handleChange}
                sx={controlSx}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth sx={controlSx}>
                  <InputLabel>Marka *</InputLabel>
                  <Select
                    name="brand"
                    value={form.brand}
                    label="Marka *"
                    onChange={(e) =>
                      setForm(f => ({ ...f, brand: e.target.value, model: "", version: "" }))
                    }
                  >
                    <MenuItem value=""><em>Zgjedh markën…</em></MenuItem>
                    {Object.keys(deviceData).map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={!form.brand} sx={controlSx}>
                  <InputLabel>Modeli *</InputLabel>
                  <Select
                    name="model"
                    value={form.model}
                    label="Modeli *"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>{form.brand ? "Zgjedh modelin…" : "Zgjedh markën më parë"}</em>
                    </MenuItem>
                    {(deviceData[form.brand] || []).map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
              </Stack>

              <FormControl fullWidth disabled={!form.brand} sx={controlSx}>
                <InputLabel>Versioni (opsional)</InputLabel>
                <Select
                  name="version"
                  value={form.version}
                  label="Versioni (opsional)"
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Zgjedh versionin…</em></MenuItem>
                  {(softwareVersions[form.brand] || []).map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </Select>
              </FormControl>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
                <TextField
                  label="IMEI (14 shifra) *"
                  name="imei"
                  value={form.imei}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 14);
                    handleChange({ target: { name: "imei", value: v } });
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "\\d{14}", maxLength: 14 }}
                  helperText={imeiOK || !form.imei ? "Shkruani saktësisht 14 shifra" : "⚠️ IMEI jo i vlefshëm"}
                  error={!!form.imei && !imeiOK}
                  fullWidth
                  sx={controlSx}
                />
              
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth sx={controlSx}>
                  <InputLabel>Lloji i pagesës *</InputLabel>
                  <Select
                    name="llojiPageses"
                    value={form.llojiPageses}
                    onChange={handleChange}
                    label="Lloji i pagesës *"
                  >
                    {llojetPageses.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Data"
                  name="data"
                  type="date"
                  value={form.data}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={controlSx}
                />
              </Stack>

              <Divider sx={{ my: 0.5, borderColor: "#1b1b1b" }} />

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handlePending}
                  disabled={pending}
                  sx={{
                    background: "#ff7a00",
                    color: "#0b0b0b",
                    fontWeight: 900,
                    borderRadius: 999,
                    flex: 1,
                    boxShadow: "none",
                    textTransform: "none",
                    "&:hover": { background: "#ff6600" }
                  }}
                >
                  {pending ? "NË PRITJE ✔" : "NË PRITJE"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handlePrint}
                  disabled={!allValid}
                  sx={{
                    borderColor: "#49d17c",
                    color: "#49d17c",
                    fontWeight: 900,
                    borderRadius: 999,
                    flex: 1,
                    textTransform: "none",
                    "&:hover": { borderColor: "#64e596", color: "#64e596", background: "rgba(100,229,150,.08)" }
                  }}
                >
                  PRINTO
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* ——— Fleta e kontratës për print ——— */}
          {showPrint && (
            <div id="print-area" className="a4">
              <div className="header">
                <div className="logo"><img src={foto111} alt="Top Mobile" /></div>
                <div className="title">
                  <h1>KONTRATË SHËRBIMI</h1>
                  <h2>“SOFT &amp; SAVE”</h2>
                </div>
              </div>

              <div className="row meta">
                <div>Nr. i Kontratës: <span className="line">{contractNo || "________"}</span></div>
                <div>Data e lidhjes: <span className="line">{formatDateSq(form.data)}</span></div>
              </div>

              <div className="block">
                <div className="row">
                  <div className="col">
                    <strong>Top Mobile Shop &amp; Service L.L.C.</strong>
                    <div>Adresa: <span className="line">Ulpianë, Prishtinë</span></div>
                    <div>Pajisja: <span className="line">
                      {form.brand} {form.model}{form.version ? ` (${form.version})` : ""}
                    </span></div>
                  </div>
                  <div className="col">
                    <div>Nr. Telefoni: <span className="line">045 407 223</span></div>
                    <div>IMEI / Serial: <span className="line">{form.imei}</span></div>
                  </div>
                </div>
              </div>

              <div className="row two-cols">
                <div className="col left">
                  <h3>📱 Përshkrimi i Shërbimit</h3>
                  <p>Kontrata “Soft &amp; Save” mbulon mirëmbajtje software për pajisjen tuaj për një periudhë 12-mujore.</p>
                  <ul>
                    <li>Përditësime sistemi dhe optimizim performance</li>
                    <li>Heqje malware/virusesh dhe pastrim i skedarëve të panevojshëm</li>
                    <li>Instalim &amp; konfigurim fillestar i aplikacioneve bazë</li>
                    <li>Backup i të dhënave dhe rikthim kur nevojitet</li>
                    <li>Diagnostikim &amp; asistencë teknike gjatë periudhës së kontratës</li>
                  </ul>

                  <h3>🎁 Bonus</h3>
                  <ul><li>Zbritje 20% në aksesorë të përzgjedhur dhe shërbime online/telefon</li></ul>
                </div>

                <div className="col right">
                  <h3>💶 Çmimi &amp; Pagesa</h3>
                  <ul>
                    <li>Lloji i pagesës: <strong>{form.llojiPageses}</strong></li>
                    <li>Pagesa kryhet në fillim të kontratës dhe është e pakthyeshme.</li>
                  </ul>

                  <h3>🔒 Privatësia &amp; Konfidencialiteti</h3>
                  <ul>
                    <li>Të dhënat trajtohen konfidencialisht dhe nuk ruhen pa pëlqimin e klientit.</li>
                    <li>Ndërhyrjet në të dhëna bëhen vetëm me autorizim me shkrim.</li>
                    <li>Top Mobile nuk mban përgjegjësi për defekte harduerike ekzistuese, dëme nga lagështia ose pajisje me ndërhyrje jozyrtare (root/jailbreak).</li>
                  </ul>
                </div>
              </div>

              <div className="signs">
                <div>
                  <div>Nënshkrimi i klientit:</div>
                  <div className="line big">&nbsp;</div>
                  <div className="muted">{form.klienti} {form.mbiemri}</div>
                </div>
                <div>
                  <div>Top Mobile:</div>
                  <div className="line big">&nbsp;</div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
