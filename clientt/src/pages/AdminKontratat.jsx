// src/admin/pages/AdminKontratat.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const UI = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  card: "#111111",
  stroke: "#1f1f1f",
  text: "#ffffff",
  muted: "#bfbfbf",
  accent: "#ff8000",
  accentHover: "#e67300",
  softRow: "#121212",
  headerGrad: "linear-gradient(180deg, rgba(255,128,0,.12), rgba(255,128,0,.04))",
  shadow: "0 18px 40px rgba(0,0,0,.35)",
};

export default function AdminKontratat() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null); // contract being edited
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [printRow, setPrintRow] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setErr("");
        const { data } = await api.get("/api/contracts/softsave"); // backend në production ka /api prefix
        const dataArray = Array.isArray(data) ? data : (data.rows || data.data || []);
        // normalize keys for UI
        const normalized = dataArray.map(r => ({
          ...r,
          contract_no: r.contract_no || r.contractNo || '',
          brand: r.device_brand || r.brand || '',
          model: r.device_model || r.model || '',
          version: r.device_name || r.version || '',
          pay_type: r.payment_type || r.pay_type || '',
          date_signed: r.start_date || r.date_signed || null,
        }));
        setRows(normalized);
      } catch (e) {
        setErr(e.message || "Gabim gjatë ngarkimit");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const reloadOne = async (id) => {
    try {
      const { data } = await api.get(`/api/contracts/softsave/${id}`);
      const mapped = {
        ...data,
        contract_no: data.contract_no || data.contractNo || '',
        brand: data.device_brand || data.brand || '',
        model: data.device_model || data.model || '',
        version: data.device_name || data.version || '',
        pay_type: data.payment_type || data.pay_type || '',
        date_signed: data.start_date || data.date_signed || null,
      };
      setRows(r => r.map(x => x.id === id ? { ...x, ...mapped } : x));
    } catch (e) { /* silent */ }
  };

  const startEdit = (row) => {
    setEditing(row.id);
    setForm({
      emri: row.first_name || "",
      mbiemri: row.last_name || "",
      marka: row.device_brand || row.brand || "",
      modeli: row.device_model || row.model || "",
      pajisja: row.device_name || row.version || "",
      imei: row.imei || "",
      llojiPageses: row.payment_type || row.pay_type || "Cash",
      data: (row.start_date || row.date_signed || "").slice(0,10),
      komente: row.notes || ""
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      setSaving(true); setErr("");
      await api.put(`/api/contracts/softsave/${editing}`, form);
      await reloadOne(editing);
      setEditing(null);
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Gabim në përditësim");
    } finally { setSaving(false); }
  };

  const cancelEdit = () => { setEditing(null); };

  const deleteRow = async (id) => {
    if (!window.confirm("Fshije përfundimisht kontratën?")) return;
    try {
      await api.delete(`/api/contracts/softsave/${id}`);
      setRows(r => r.filter(x => x.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Gabim në fshirje");
    }
  };

  const printOne = (row) => {
    setPrintRow(row);
    setTimeout(() => {
      const el = document.getElementById('admin-print-area');
      if (!el) return;
      const win = window.open('', 'PRINT', 'width=840,height=1170');
      win.document.write('<!doctype html><html><head><title>Kontratë</title><meta charset="utf-8" />');
      win.document.write('<style>@page{size:A4;margin:10mm}body{background:#fff;color:#111;font-family:Inter,Arial}#admin-print-area{width:210mm;min-height:297mm;padding:18mm 16mm;}</style>');
      win.document.write('</head><body>' + el.outerHTML + '</body></html>');
      win.document.close(); win.focus();
      setTimeout(()=>{ win.print(); win.close(); setPrintRow(null); },300);
    }, 100);
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(r =>
      (r.contract_no || "").toLowerCase().includes(s) ||
      (r.first_name || "").toLowerCase().includes(s) ||
      (r.last_name || "").toLowerCase().includes(s) ||
      (r.brand || "").toLowerCase().includes(s) ||
      (r.model || "").toLowerCase().includes(s) ||
      (r.imei || "").toLowerCase().includes(s)
    );
  }, [rows, q]);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "24px auto",
        padding: "0 12px",
        color: UI.text,
      }}
    >
      <h2
        style={{
          margin: "0 0 14px 0",
          fontWeight: 900,
          letterSpacing: 0.3,
          color: UI.accent,
        }}
      >
        Kontratat “Soft &amp; Save”
      </h2>

      {/* Toolbar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 12,
          margin: "14px 0 18px 0",
        }}
      >
        <input
          placeholder="Kërko (kontratë, klient, IMEI, pajisje)…"
          value={q}
          onChange={e=>setQ(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: `1px solid ${UI.stroke}`,
            background: UI.card,
            color: UI.text,
            outline: "none",
            boxShadow: UI.shadow,
          }}
        />
        <Link to="/mirembajtja" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${UI.stroke}`,
              background: UI.accent,
              color: "#0b0b0b",
              fontWeight: 900,
              letterSpacing: 0.4,
              cursor: "pointer",
              boxShadow: UI.shadow,
            }}
          >
            + Kontratë e re
          </button>
        </Link>
      </div>

      {/* Error */}
      {err && (
        <div
          style={{
            background: "#2a0c11",
            color: "#ff5e73",
            border: "1px solid #4a1a22",
            padding: "10px 12px",
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          Gabim: {err}
        </div>
      )}

      {/* Table Card */}
      <div
        style={{
          background: UI.surface,
          borderRadius: 16,
          border: `1px solid ${UI.stroke}`,
          boxShadow: UI.shadow,
          overflow: "hidden",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: UI.headerGrad,
            borderBottom: `1px solid ${UI.stroke}`,
            padding: "14px 16px",
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          Lista e kontratave
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            width="100%"
            cellPadding="12"
            style={{ borderCollapse: "collapse", minWidth: 960 }}
          >
            <thead>
              <tr style={{ background: UI.card }}>
                {["#", "Kontrata", "Klienti", "Pajisja", "IMEI", "Pagesa", "Data", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      borderBottom: `1px solid ${UI.stroke}`,
                      color: UI.muted,
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ padding: 20, color: UI.muted }}>
                    Duke ngarkuar…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: 20, color: UI.muted }}>
                    S’ka të dhëna.
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{
                      borderTop: `1px solid ${UI.stroke}`,
                      background: UI.card,
                    }}
                  >
                    <td style={tdCell}>{i + 1}</td>
                    <td style={tdStrong}>{r.contract_no}</td>
                    <td style={tdCell}>
                      {(r.first_name || "") + " " + (r.last_name || "")}
                    </td>
                    <td style={tdCell}>
                      {(r.brand || "") + " " + (r.model || "")}
                    </td>
                    <td style={{ ...tdCell, fontVariantNumeric: "tabular-nums" }}>
                      {r.imei}
                    </td>
                    <td style={tdCell}>{r.pay_type || "-"}</td>
                    <td style={{ ...tdCell, whiteSpace: "nowrap" }}>
                      {r.date_signed
                        ? new Date(r.date_signed).toLocaleDateString("sq-AL")
                        : "-"}
                    </td>
                    <td style={{ ...tdCell, textAlign: "right", whiteSpace:'nowrap' }}>
                      <button onClick={()=>printOne(r)} style={actionBtn}>Print</button>
                      <button onClick={()=>startEdit(r)} style={actionBtn}>Edit</button>
                      <button onClick={()=>deleteRow(r.id)} style={{...actionBtn, color:'#ff4d4f'}}>Fshij</button>
                      <Link to={`/admin/kontratat/${r.id}`} style={{...actionLink}}>Shiko</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit */}
      {editing && (
        <div style={modalBackdrop}>
          <div style={modalCard}>
            <h3 style={{margin:'0 0 12px'}}>Përditëso kontratën #{editing}</h3>
            <div style={formGrid}>
              <label>Emri<input name="emri" value={form.emri||''} onChange={handleChange} /></label>
              <label>Mbiemri<input name="mbiemri" value={form.mbiemri||''} onChange={handleChange} /></label>
              <label>Marka<input name="marka" value={form.marka||''} onChange={handleChange} /></label>
              <label>Modeli<input name="modeli" value={form.modeli||''} onChange={handleChange} /></label>
              <label>Version/Pajisja<input name="pajisja" value={form.pajisja||''} onChange={handleChange} /></label>
              <label>IMEI<input name="imei" value={form.imei||''} onChange={handleChange} /></label>
              <label>Lloji Pagesës<input name="llojiPageses" value={form.llojiPageses||''} onChange={handleChange} /></label>
              <label>Data<input type="date" name="data" value={form.data||''} onChange={handleChange} /></label>
              <label style={{gridColumn:'1 / -1'}}>Komente<textarea name="komente" value={form.komente||''} onChange={handleChange} rows={3} /></label>
            </div>
            {err && <div style={{color:'#ff5e73', marginTop:8}}>Gabim: {err}</div>}
            <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:16}}>
              <button onClick={cancelEdit} disabled={saving} style={actionBtn}>Anulo</button>
              <button onClick={saveEdit} disabled={saving} style={{...actionBtn, background:'#ff8000', color:'#0b0b0b'}}>{saving? 'Duke ruajtur…':'Ruaj'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden print area for one row */}
      {printRow && (
        <div id="admin-print-area" style={{display:'none'}}>
          <div style={{background:'#fff', padding:'18mm 16mm'}}>
            <h1 style={{margin:0}}>KONTRATË SHËRBIMI “SOFT & SAVE”</h1>
            <p><b>Nr.:</b> {printRow.contract_no} &nbsp; <b>Data:</b> {printRow.date_signed ? new Date(printRow.date_signed).toLocaleDateString('sq-AL') : ''}</p>
            <p><b>Klienti:</b> {printRow.first_name} {printRow.last_name}</p>
            <p><b>Pajisja:</b> {(printRow.brand||printRow.device_brand)||''} {(printRow.model||printRow.device_model)||''} {printRow.version?` (${printRow.version})`:''}</p>
            <p><b>IMEI:</b> {printRow.imei}</p>
            <p><b>Lloji i pagesës:</b> {printRow.pay_type || printRow.payment_type}</p>
            <hr />
            <p style={{fontSize:12}}>Kontrata mbulon mirëmbajtje software për pajisjen për 12 muaj: përditësime, optimizim, pastrim malware, backup dhe asistencë teknike.</p>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'18mm'}}>
              <div>
                <div style={{borderBottom:'1px solid #222', minWidth:180, height:26}} />
                <div style={{fontSize:11, color:'#666'}}>Klienti</div>
              </div>
              <div>
                <div style={{borderBottom:'1px solid #222', minWidth:180, height:26}} />
                <div style={{fontSize:11, color:'#666'}}>Top Mobile</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* qeli të ripërdorshme */
const tdCell = {
  borderBottom: `1px solid ${UI.stroke}`,
  color: UI.text,
  fontSize: 14,
};
const tdStrong = {
  ...tdCell,
  color: UI.accent,
  fontWeight: 900,
};

const actionBtn = {
  background:'transparent',
  border:'1px solid #1f1f1f',
  color:'#ff8000',
  fontSize:12,
  padding:'4px 8px',
  borderRadius:6,
  cursor:'pointer',
  marginLeft:4
};
const actionLink = {
  color:'#49d17c',
  fontSize:12,
  fontWeight:800,
  textDecoration:'none',
  marginLeft:4
};
const modalBackdrop = {
  position:'fixed', left:0, top:0, right:0, bottom:0,
  background:'rgba(0,0,0,.65)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000
};
const modalCard = {
  background:'#111', color:'#fff', padding:'20px 22px', borderRadius:12, width:'100%', maxWidth:600,
  border:'1px solid #222', boxShadow:'0 12px 42px rgba(0,0,0,.45)'
};
const formGrid = {
  display:'grid', gap:10, gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))'
};
