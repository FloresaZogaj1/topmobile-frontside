import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./AdminWarrantyDetails.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function AdminWarrantyDetails() {
  const { id } = useParams();
  const [w, setW] = useState(null);

  // Helpers
  const fmtPrice = (v) =>
    v === undefined || v === null || isNaN(Number(v)) ? "-" : `${Number(v).toFixed(2)} €`;
  const fmtDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return d.toISOString().slice(0, 10);
  };
  const titleCase = (s) => s?.toLowerCase()?.replace(/\b\w/g, (m) => m.toUpperCase()) ?? "";

  // Load
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/api/warranties/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        credentials: "include",
      });
      const data = await res.json();
      setW(data);
    })();
  }, [id]);

  const fullName = useMemo(() => {
    if (!w) return "";
    return titleCase([w.first_name, w.last_name].filter(Boolean).join(" "));
  }, [w]);

  // Auto-print me ?print=1
  useEffect(() => {
    if (!w) return;
    const params = new URLSearchParams(window.location.search);
    const shouldAutoPrint = params.get("print") === "1";
    if (shouldAutoPrint) setTimeout(() => window.print(), 150);
  }, [w]);

  if (!w) return <div className="awd-loading">Po ngarkohet…</div>;

  return (
    // print-root: ankorë për rregullat e printimit
    <div className="awd-wrap print-root">
      {/* ======= UI normale në ekran ======= */}
      <div className="awd-card">
        <header className="awd-header">
          <div>
            <h1 className="awd-title">Garancioni #{w.id}</h1>
            <p className="awd-sub">Detajet e garancionit të klientit</p>
          </div>
          <div className="awd-actions no-print">
            <button className="awd-btn awd-btn-outline" onClick={() => window.history.back()}>
              Kthehu
            </button>
            <button className="awd-btn" onClick={() => window.print()}>
              Printo
            </button>
          </div>
        </header>

        <section className="awd-section">
          <h2 className="awd-section-title">Klienti</h2>
          <div className="awd-grid">
            <div className="awd-item">
              <span className="awd-label">Emri & Mbiemri</span>
              <span className="awd-value">{fullName}</span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Tel</span>
              <span className="awd-value">{w.phone || "-"}</span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Email</span>
              <span className="awd-value">{w.email || "-"}</span>
            </div>
          </div>
        </section>

        <section className="awd-section">
          <h2 className="awd-section-title">Pajisja</h2>
          <div className="awd-grid">
            <div className="awd-item">
              <span className="awd-label">Marka/Modeli</span>
              <span className="awd-value">
                {w.brand} {w.model}
              </span>
            </div>
            <div className="awd-item">
              <span className="awd-label">IMEI</span>
              <span className="awd-value awd-code">{w.imei}</span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Software</span>
              <span className="awd-value">{w.software_info || "-"}</span>
            </div>
          </div>
        </section>

        <section className="awd-section">
          <h2 className="awd-section-title">Garancia</h2>
          <div className="awd-grid">
            <div className="awd-item">
              <span className="awd-label">Kohëzgjatja</span>
              <span className="awd-value">
                <span className="awd-badge">{w.duration_months} muaj</span>
              </span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Çmimi</span>
              <span className="awd-value awd-price">{fmtPrice(w.price)}</span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Fillimi</span>
              <span className="awd-value">{fmtDate(w.start_date)}</span>
            </div>
            <div className="awd-item">
              <span className="awd-label">Pagesa</span>
              <span className="awd-value">{w.payment_type || "-"}</span>
            </div>
          </div>
        </section>

        <section className="awd-section">
          <h2 className="awd-section-title">Komente</h2>
          <div className="awd-note">{w.comments || "-"}</div>
        </section>

        <footer className="awd-footer print-only">
          <p>Gjeneruar nga sistemi i garancioneve • #{w.id}</p>
        </footer>
      </div>

      {/* ======= PRINT SHEET — vetëm në print ======= */}
      <div className="print-sheet">
        <div className="ps-header">
          <div className="ps-title">Fletë Garancioni</div>
          <div className="ps-company">
            {/* Nëse ke file-in e logos, zëvendëso div-in me <img src="/logo-top.png" className="ps-logo-img" alt="Top Mobile" /> */}
            <div className="ps-logo">Top</div>
            <div className="ps-addr">
              <div className="ps-name">Top Mobile</div>
              <div>Rr. Bulevardi dëshmorët e kombit</div>
              <div>Ulpianë, Prishtinë</div>
              <div>TEL: 045-407-222</div>
            </div>
          </div>
        </div>

        <div className="ps-info">
          <div><b>Klienti:</b> {fullName || "-"}</div>
          <div><b>Data e fillimit të garancionit:</b> {fmtDate(w.start_date)}</div>
          <div><b>Detajet:</b> Çmimi: {fmtPrice(w.price)}</div>
        </div>

        <table className="ps-table">
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
              <td>{w.brand} {w.model}</td>
              <td className="ps-code">{w.imei}</td>
              <td>{w.software_info || "-"}</td>
              <td>{w.duration_months} muaj</td>
            </tr>
          </tbody>
        </table>

        <div className="ps-terms">
          <h4>Kushtet e Garancionit</h4>
          <p>
            Periudha e Garancionit fillon nga data e blerjes dhe përfundon në afatin e shprehur në Fletë Garancion.
            Shërbimi i garancionit do të kryhet në ambientet e servisit të Top Mobile.
          </p>

          <p><b>Garancioni mbulon riparimin (kthimin në gjendje pune) falas të produkteve të shitura nga Top Mobile, duke plotësuar njëkohësisht të gjitha kushtet e mëposhtme:</b></p>
          <ul>
            <li>Defekti i produktit është me origjinë prodhimi / nga fabrika.</li>
            <li>Produkti shoqërohet me Faturën e blerjes dhe Fletën e Garancisë.</li>
            <li>Top Mobile ka për obligim eliminimin e defektit sa më të shpejtë, në rastin më të keq për një periudhë 30 ditore.</li>
          </ul>

          <p><b>Garancioni nuk vlen në këto raste:</b></p>
          <ul>
            <li>Dëmtime fizike nga keqpërdorimi, pakujdesia etj.</li>
            <li>Përditësimi i software/sistemit operativ (update/downgrade) etj.</li>
            <li>Përdorimi i produktit në ambiente të papërshtatshme (lagështi, nxehtësi, etj.).</li>
            <li>Dëmtime nga tension i lartë/ulët, rryma elektrike, dëmtime termike apo mekanike.</li>
            <li>Ekspozim ndaj lagështisë, nxehtësisë, tymit, dridhjeve, papastërtive apo kushteve të jashtëzakonshme.</li>
            <li>Nëse blerësi nuk e ka flet garancionin.</li>
            <li>Nëse pajisja është hapur/riparuar nga persona pa autorizim nga Top Mobile.</li>
          </ul>
        </div>

        <div className="ps-sign">
          <div className="ps-sign-label">Nënshkrimi i klientit</div>
          <div className="ps-sign-caret">▾</div>
        </div>
      </div>
    </div>
  );
}
