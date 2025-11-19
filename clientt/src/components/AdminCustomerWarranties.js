// src/admin/components/AdminCustomerWarranties.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api";

const colors = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  card: "#111111",
  stroke: "#1f1f1f",
  text: "#ffffff",
  muted: "#c9c9c9",
  accent: "#ff8000",
  accentHover: "#e67300",
  chip: "#151515",
  chipStroke: "#1e1e1e",
  shadow: "0 18px 42px rgba(0,0,0,.35)",
};

export default function AdminCustomerWarranties() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedCols, setSelectedCols] = useState([
    "id","created_at","client","phone","email","brandModel","imei","duration","price",
  ]);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/warranty`); // baseURL përfshin /api
      setRows(Array.isArray(data) ? data : []);
      setErrorMsg("");
    } catch (error) {
      console.error('Error loading warranties:', error);
      setRows([]);
      setErrorMsg(error?.response?.data?.message || 'Gabim gjatë ngarkimit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("A je i sigurt që do ta fshish?")) return;
    try {
      await api.delete(`/warranty/${id}`);
      setRows(prev => prev.filter(r => r.id !== id)); // optimistik
    } catch (error) {
      console.error('Error deleting warranty:', error);
      alert(error?.response?.data?.message || 'Fshirja dështoi');
    }
  };

  const handleView = async (id) => {
    setViewOpen(true); setViewLoading(true); setViewing(null);
    try {
      const { data } = await api.get(`/warranty/${id}`);
      setViewing(data);
    } catch (err) {
      console.error('Error fetching warranty', err);
      setViewing({ error: err?.response?.data?.message || 'Gabim serveri' });
    } finally {
      setViewLoading(false);
    }
  };

  const printOne = async (id) => {
    let w = viewing && viewing.id === id ? viewing : null;
    if (!w) {
      try { const { data } = await api.get(`/warranty/${id}`); w = data; } catch { return alert('S’munda të marr detajet për print'); }
    }
    const esc = (s) => String(s==null?"":s).replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
    const styles = `<style>*{box-sizing:border-box;font-family:Arial}body{margin:0;padding:18px}h1{margin:0 0 6px;font-size:20px}.m{font-size:12px;color:#555;margin-bottom:12px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #999;padding:6px 10px;font-size:13px}th{background:#f5f5f5;text-align:left}@media print{@page{size:A5 portrait;margin:10mm}}</style>`;
    const html = `<!doctype html><html><head><meta charset='utf-8'>${styles}</head><body>
      <h1>Fletë Garancioni</h1>
      <div class='m'>ID #${w.id} • ${new Date(w.created_at).toLocaleString()}</div>
      <table><tbody>
        <tr><th>Klienti</th><td>${esc(w.first_name)} ${esc(w.last_name)}</td></tr>
        <tr><th>Tel</th><td>${esc(w.phone||'-')}</td></tr>
        <tr><th>Email</th><td>${esc(w.email||'-')}</td></tr>
        <tr><th>Marka/Modeli</th><td>${esc(w.brand)} ${esc(w.model)}</td></tr>
        <tr><th>IMEI</th><td>${esc(w.imei)}</td></tr>
        <tr><th>Soft Info</th><td>${esc(w.software_info||'-')}</td></tr>
        <tr><th>Kohëzgjatja</th><td>${w.duration_months} muaj</td></tr>
        <tr><th>Çmimi</th><td>${Number(w.price).toFixed(2)} €</td></tr>
        <tr><th>Data fillimit</th><td>${esc(w.start_date)}</td></tr>
        <tr><th>Lloji pagesës</th><td>${esc(w.payment_type||'-')}</td></tr>
        <tr><th>Komente</th><td>${esc(w.comments||'-')}</td></tr>
      </tbody></table>
    </body></html>`;
    const win = window.open('', '_blank');
    if (!win) return alert('Popup i bllokuar');
    win.document.write(html); win.document.close(); win.focus(); setTimeout(()=>win.print(),100);
  };

  const filt = useMemo(() => {
    const ql = q.toLowerCase();
    return rows.filter((r) => {
      const s = `${r.first_name} ${r.last_name} ${r.phone || ""} ${r.email || ""} ${r.brand} ${r.model} ${r.imei}`.toLowerCase();
      return s.includes(ql);
    });
  }, [rows, q]);

  const allColumns = [
    { key: "id", label: "ID", get: (r) => r.id },
    { key: "created_at", label: "Data", get: (r) => new Date(r.created_at).toLocaleString() },
    { key: "client", label: "Klienti", get: (r) => `${r.first_name} ${r.last_name}`.trim() },
    { key: "phone", label: "Tel", get: (r) => r.phone || "-" },
    { key: "email", label: "Email", get: (r) => r.email || "-" },
    { key: "brandModel", label: "Marka/Modeli", get: (r) => `${r.brand} ${r.model}`.trim() },
    { key: "imei", label: "IMEI", get: (r) => r.imei },
    { key: "duration", label: "Kohëzgj.", get: (r) => `${r.duration_months} muaj` },
    { key: "price", label: "Çmimi", get: (r) => `${Number(r.price).toFixed(2)} €` },
  ];
  const visibleColumns = allColumns.filter((c) => selectedCols.includes(c.key));

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s]));

  const handlePrintSelected = () => {
    if (!visibleColumns.length) { alert("Zgjidh të paktën një kolonë për printim."); return; }
    const headCells = visibleColumns.map((c) => `<th>${c.label}</th>`).join("");
    const bodyRows = filt.map((r) => {
      const tds = visibleColumns.map((c) => `<td>${escapeHtml(c.get(r) ?? "")}</td>`).join("");
      return `<tr>${tds}</tr>`;
    }).join("");
    const styles = `
      <style>
        *{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}
        h1{margin:0 0 8px 0;font-size:18px}
        .meta{font-size:12px;color:#666}
        table{width:100%;border-collapse:collapse;margin-top:8px;table-layout:fixed}
        th,td{border:1px solid #bbb;padding:6px 8px;font-size:13px;word-break:break-word}
        th{background:#f5f5f5;text-align:left}
        @media print { @page { size:A4; margin:12mm } thead{display:table-header-group} tfoot{display:table-footer-group} }
      </style>
    `;
    const html = `
      <!doctype html><html lang="sq"><head><meta charset="utf-8">${styles}</head>
      <body>
        <h1>Lista e garancioneve</h1>
        <div class="meta">Kolonat: ${visibleColumns.map((c) => c.label).join(", ")} • Rekorde: ${filt.length}</div>
        <table>
          <thead><tr>${headCells}</tr></thead>
          <tbody>${bodyRows || `<tr><td colspan="${visibleColumns.length}" style="text-align:center;padding:20px">S’ka të dhëna</td></tr>`}</tbody>
        </table>
      </body></html>
    `;
    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, { position: "fixed", right: 0, bottom: 0, width: 0, height: 0, border: 0 });
    document.body.appendChild(iframe);
    iframe.srcdoc = html;
    iframe.onload = () => {
      try { iframe.contentWindow.focus(); iframe.contentWindow.print(); }
      finally { setTimeout(() => document.body.removeChild(iframe), 500); }
    };
  };

  return (
    <div style={{ maxWidth: 1160, margin: "24px auto", color: colors.text }}>
      <h2 style={{ margin: "8px 0 16px", fontWeight: 900, letterSpacing: 0.3 }}>
        Garancionet e Klientëve
      </h2>

      {/* Toolbar */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10, alignItems: "center",
        background: colors.surface, border: `1px solid ${colors.stroke}`, borderRadius: 10, padding: 10, boxShadow: colors.shadow,
      }}>
        <input
          placeholder="Kërko (emër, tel, email, model, IMEI)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => setShowPicker(true)} style={styles.btnGhost}>Zgjedh kolonat…</button>
        <button onClick={handlePrintSelected} style={styles.btnAccent}>Printo kolonat</button>
      </div>

      {/* Tabela */}
      <div style={{ marginTop: 12, background: colors.surface, border: `1px solid ${colors.stroke}`, borderRadius: 12, overflow: "hidden", boxShadow: colors.shadow }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ background: "linear-gradient(180deg, rgba(255,128,0,.08), rgba(255,128,0,.03))", color: colors.text }}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Klienti</th>
                <th style={styles.th}>Tel</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Marka/Modeli</th>
                <th style={styles.th}>IMEI</th>
                <th style={styles.th}>Kohëzgj.</th>
                <th style={styles.th}>Çmimi</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filt.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${colors.stroke}`, background: colors.card }}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}>{new Date(r.created_at).toLocaleString()}</td>
                  <td style={styles.td}><span style={styles.badge}>{r.first_name} {r.last_name}</span></td>
                  <td style={styles.td}>{r.phone || "-"}</td>
                  <td style={styles.td}>{r.email || "-"}</td>
                  <td style={styles.td}>{r.brand} {r.model}</td>
                  <td style={styles.tdMonospace}>{r.imei}</td>
                  <td style={styles.td}>{r.duration_months} muaj</td>
                  <td style={styles.tdStrong}>{Number(r.price).toFixed(2)} €</td>
                  <td style={{ ...styles.td, textAlign: "center", whiteSpace: "nowrap" }}>
                    <button onClick={() => handleView(r.id)} style={styles.btnLink}>Shiko</button>
                    <span style={{ color: colors.muted }}> {" | "} </span>
                    <button onClick={() => printOne(r.id)} style={styles.btnTiny}>Printo</button>
                    <span style={{ color: colors.muted }}> {" | "} </span>
                    <button onClick={() => handleDelete(r.id)} style={styles.btnDanger}>Fshij</button>
                  </td>
                </tr>
              ))}
              {!filt.length && (
                <tr>
                  <td colSpan={10} style={{ ...styles.td, textAlign: "center", padding: 24, color: colors.muted }}>
                    S’ka të dhëna
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal picker kolonash */}
      {showPicker && (
        <div style={dlg.backdrop} onClick={() => setShowPicker(false)}>
          <div style={dlg.card} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, color: colors.text }}>Zgjedh kolonat për print</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(160px,1fr))", gap: 10, margin: "12px 0 18px" }}>
              {allColumns.map((col) => (
                <label key={col.key} style={{
                  display: "flex", gap: 8, alignItems: "center", color: colors.text,
                  background: colors.surface, border: `1px solid ${colors.stroke}`, borderRadius: 10, padding: "10px 12px",
                }}>
                  <input
                    type="checkbox"
                    checked={selectedCols.includes(col.key)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedCols((prev) => checked ? [...new Set([...prev, col.key])] : prev.filter((k) => k !== col.key));
                    }}
                  />
                  {col.label}
                </label>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedCols(["client"])} style={styles.btnGhost}>Vetëm Klienti</button>
              <button onClick={() => setSelectedCols(allColumns.map((c) => c.key))} style={styles.btnGhost}>Zgjidh të gjitha</button>
              <button onClick={() => setShowPicker(false)} style={styles.btnGhost}>Mbyll</button>
              <button onClick={() => { setShowPicker(false); setTimeout(handlePrintSelected, 50); }} style={styles.btnAccent}>Printo</button>
            </div>
          </div>
        </div>
      )}

      {viewOpen && (
        <div style={dlg.backdrop} onClick={() => { setViewOpen(false); setViewing(null); }}>
          <div style={dlg.card} onClick={(e)=>e.stopPropagation()}>
            <h3 style={{ marginTop:0, color: colors.text }}>Detajet e Garancionit</h3>
            {viewLoading && <p style={{color:colors.muted}}>Duke u ngarkuar…</p>}
            {!viewLoading && viewing && viewing.error && <p style={{color:'#ff4d4f'}}>{viewing.error}</p>}
            {!viewLoading && viewing && !viewing.error && (
              <div style={{ display:'grid', gap:6, fontSize:14 }}>
                <Detail label="Klienti" value={`${viewing.first_name} ${viewing.last_name}`}/>
                <Detail label="Tel" value={viewing.phone || '-'} />
                <Detail label="Email" value={viewing.email || '-'} />
                <Detail label="Marka/Modeli" value={`${viewing.brand} ${viewing.model}`} />
                <Detail label="IMEI" value={viewing.imei} />
                <Detail label="Soft Info" value={viewing.software_info || '-'} />
                <Detail label="Kohëzgjatja" value={`${viewing.duration_months} muaj`} />
                <Detail label="Çmimi" value={`${Number(viewing.price).toFixed(2)} €`} />
                <Detail label="Data fillimit" value={viewing.start_date} />
                <Detail label="Pagesa" value={viewing.payment_type || '-'} />
                <Detail label="Komente" value={viewing.comments || '-'} />
              </div>
            )}
            <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end', gap:8 }}>
              <button onClick={()=>{ if(viewing?.id) printOne(viewing.id); }} style={styles.btnAccent}>Printo</button>
              <button onClick={()=>{ setViewOpen(false); setViewing(null); }} style={styles.btnGhost}>Mbyll</button>
            </div>
          </div>
        </div>
      )}
      {errorMsg && <p style={{marginTop:12, color:'#ff4d4f', fontSize:13}}>{errorMsg}</p>}
    </div>
  );
}

const styles = {
  input: {
    width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${colors.stroke}`,
    outline: "none", color: colors.text, background: colors.card, transition: "border-color .14s ease",
  },
  th: { textAlign: "left", padding: "12px 12px", fontWeight: 800, fontSize: 13, borderBottom: `1px solid ${colors.stroke}`, whiteSpace: "nowrap" },
  td: { padding: "12px 12px", fontSize: 14, color: colors.muted },
  tdStrong: { padding: "12px 12px", fontSize: 14, fontWeight: 800, color: colors.text },
  tdMonospace: { padding: "12px 12px", fontSize: 14, color: colors.muted, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", letterSpacing: 0.2 },
  link: { color: colors.accent, textDecoration: "none", fontWeight: 700 },
  btnGhost: { background: colors.card, border: `1px solid ${colors.stroke}`, color: colors.text, borderRadius: 10, padding: "10px 14px", fontWeight: 700, cursor: "pointer" },
  btnAccent: { background: colors.accent, border: "none", color: "#000", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer" },
  btnTiny: { background: colors.card, border: `1px solid ${colors.stroke}`, color: colors.text, borderRadius: 8, padding: "6px 10px", fontWeight: 700, cursor: "pointer" },
  btnDanger: { background: "transparent", border: "none", color: "#ff4d4f", fontWeight: 800, cursor: "pointer" },
  btnLink: { background: "transparent", border: "none", color: colors.accent, fontWeight: 800, cursor: "pointer", textDecoration: "underline" },
};

const dlg = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  card: { background: colors.card, padding: 16, borderRadius: 14, width: 560, maxWidth: "92vw", boxShadow: colors.shadow, border: `1px solid ${colors.stroke}` },
};

function Detail({ label, value }) {
  return (
    <div style={{ display:'flex', gap:8 }}>
      <div style={{ width:130, fontWeight:700 }}>{label}</div>
      <div style={{ flex:1, color:colors.muted }}>{value}</div>
    </div>
  );
}
