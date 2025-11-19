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

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setErr("");
        const { data } = await api.get("/api/contracts/softsave"); // backend në production ka /api prefix
        const dataArray = Array.isArray(data) ? data : (data.rows || data.data || []);
        setRows(dataArray);
      } catch (e) {
        setErr(e.message || "Gabim gjatë ngarkimit");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
                    <td style={{ ...tdCell, textAlign: "right" }}>
                      <Link
                        to={`/admin/kontratat/${r.id}`}
                        style={{
                          color: UI.accent,
                          textDecoration: "none",
                          fontWeight: 800,
                        }}
                      >
                        Hap / Printo
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
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
