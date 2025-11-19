import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "https://api.topmobile.store";

function formatDateSq(d) {
  try { return new Date(d).toLocaleDateString("sq-AL"); } catch { return d; }
}

export default function AdminKontrateView() {
  const { id } = useParams();
  const [row, setRow] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/contracts/softsave/${id}`);
        const j = await r.json();
        if (!r.ok) throw new Error(j?.message || "Nuk u gjet");
        setRow(j);
      } catch (e) { setErr(e.message); }
    })();
  }, [id]);

  const handlePrint = () => {
    setTimeout(() => window.print(), 50);
  };

  if (err) return <div style={{maxWidth:900, margin:"24px auto"}}>Gabim: {err}</div>;
  if (!row) return <div style={{maxWidth:900, margin:"24px auto"}}>Duke ngarkuar…</div>;

  return (
    <div style={{maxWidth:900, margin:"24px auto", padding:"0 12px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Kontrata {row.contract_no}</h2>
        <div style={{display:"flex", gap:8}}>
          <button onClick={handlePrint} style={{padding:"8px 12px"}}>PRINTO</button>
          <Link to="/admin/kontratat"><button style={{padding:"8px 12px"}}>← Kthehu</button></Link>
        </div>
      </div>

      {/* version i thjeshtë i fletës së printit (i njëjtë me Mirembajtja) */}
      <div id="print-area" style={{background:"#fff", padding:"18mm 16mm"}}>
        <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:"8mm"}}>
          <img src="/logo-topmobile.png" alt="Top Mobile" style={{height:"22mm"}} />
          <div>
            <h1 style={{margin:0, fontSize:22}}>KONTRATË SHËRBIMI</h1>
            <h2 style={{margin:0, fontSize:18, color:"#333"}}>“SOFT &amp; SAVE”</h2>
          </div>
        </div>

        <div style={{display:"flex", justifyContent:"space-between", marginBottom:"6mm"}}>
          <div>Nr. i Kontratës: <b>{row.contract_no}</b></div>
          <div>Data e lidhjes: <b>{formatDateSq(row.date_signed)}</b></div>
        </div>

        <div style={{borderTop:"1px solid #ddd", borderBottom:"1px solid #ddd", padding:"6mm 0", margin:"4mm 0 6mm"}}>
          <div style={{display:"flex", justifyContent:"space-between", gap:14}}>
            <div style={{flex:1}}>
              <b>Top Mobile Shop &amp; Service L.L.C.</b>
              <div>Adresa: <span>Ulpianë, Prishtinë</span></div>
              <div>Pajisja: <span>{row.brand} {row.model}{row.version ? ` (${row.version})` : ""}</span></div>
            </div>
            <div style={{flex:1}}>
              <div>Nr. Telefoni: <span>045 407 223</span></div>
              <div>IMEI / Serial: <span>{row.imei}</span></div>
            </div>
          </div>
        </div>

        <p><b>Klienti:</b> {row.first_name} {row.last_name}</p>

        <h3>📱 Përshkrimi i Shërbimit</h3>
        <ul>
          <li>Përditësime sistemi dhe optimizim performance</li>
          <li>Heqje malware/virusesh dhe pastrim i skedarëve të panevojshëm</li>
          <li>Instalim &amp; konfigurim fillestar i aplikacioneve bazë</li>
          <li>Backup i të dhënave dhe rikthim kur nevojitet</li>
          <li>Diagnostikim &amp; asistencë teknike gjatë periudhës së kontratës</li>
        </ul>

        <h3>💶 Çmimi &amp; Pagesa</h3>
        <ul>
          <li>Lloji i pagesës: <b>{row.pay_type}</b></li>
          <li>Pagesa kryhet në fillim të kontratës dhe është e pakthyeshme.</li>
        </ul>

        <div style={{display:"flex", justifyContent:"space-between", marginTop:"14mm"}}>
          <div>
            <div>Nënshkrimi i klientit:</div>
            <div style={{borderBottom:"1px solid #222", minWidth:200, height:24}} />
            <div style={{fontSize:12, color:"#666"}}>{row.first_name} {row.last_name}</div>
          </div>
          <div>
            <div>Top Mobile:</div>
            <div style={{borderBottom:"1px solid #222", minWidth:200, height:24}} />
          </div>
        </div>
      </div>

      {/* CSS për print, që të dalë vetëm fleta */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area { position: absolute; left: 0; top: 0; margin:0; box-shadow:none; width:210mm; min-height:297mm; }
        }
        @page { size: A4; margin: 10mm; }
      `}</style>
    </div>
  );
}
