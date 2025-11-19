// src/pages/Checkout.jsx
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
const API_URL =
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:4000'
    : 'https://api.topmobile.store';


// REACT_APP_WA_NUMBER=38344XXXXXX
const WA_NUMBER = (import.meta?.env?.VITE_WA_NUMBER) || process.env.REACT_APP_WA_NUMBER || "38344XXXXXX";

/* slug helper identik */
const toSlug = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

/* normalizim artikulli nga cart */
const norm = (p) => {
  const rawId =
    p.id ?? p.productId ?? p.product_id ?? p.sku ?? p.slug ?? p.code ?? p._id ?? null;

  const name = p.name ?? p.title ?? `#${rawId || "unknown"}`;
  const id = toSlug(rawId || name) || null;

  const qty = Number(p.quantity ?? p.qty ?? 1);
  const price = Number(p.price ?? 0);
  return { rawId, id, name, price, qty };
};

function buildWaText({ orderId, fullName, phone, address, city, items, subtotal, shippingCost, total, note }) {
  const L = [];
  L.push(`🧾 Porosi e re ${orderId ? "#" + orderId : ""}`);
  L.push(`👤 Emri: ${fullName}`);
  L.push(`📞 Tel: ${phone}`);
  if (address) L.push(`📍 Adresa: ${address}${city ? ", " + city : ""}`);
  if (note) L.push(`📝 Shënim: ${note}`);
  L.push("");
  L.push("📦 Artikujt:");
  items.forEach((it) => L.push(`• ${it.name} ×${it.qty} – €${(it.price * it.qty).toFixed(2)}`));
  L.push("");
  L.push(`Nëntotali: €${subtotal.toFixed(2)}`);
  L.push(`Dërgesa: ${shippingCost === 0 ? "FALAS" : "€" + shippingCost.toFixed(2)}`);
  L.push(`Totali: €${total.toFixed(2)}`);
  return L.join("\n");
}

function openWhatsAppWith(text) {
  const number = String(WA_NUMBER || "").replace(/[^\d]/g, "");
  if (!number) return alert("Numri i WhatsApp nuk është i konfiguruar.");

  const safe = String(text || "")
    .replace(/\uFFFD/g, "")
    .replace(/\r\n/g, "\n")
    .trim();

  const msg = encodeURIComponent(safe);

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isMobile = isAndroid || isIOS;

  let url = "";
  if (isMobile) {
    url = `whatsapp://send?phone=${number}&text=${msg}`;
  } else {
    url = `https://web.whatsapp.com/send?phone=${number}&text=${msg}`;
  }

  window.location.assign(url);

  setTimeout(() => {
    if (!document.hidden) {
      const alt = isMobile
        ? `https://api.whatsapp.com/send?phone=${number}&text=${msg}&app_absent=0`
        : `https://api.whatsapp.com/send?phone=${number}&text=${msg}`;
      window.location.assign(alt);
    }
  }, 1000);
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, total: ctxTotal } = useCart();
  const items = (cart || []).map(norm).filter((i) => i.qty > 0);

  const subtotal = items.reduce((s, p) => s + p.price * p.qty, 0);
  const shippingCost = 0;
  const total = ctxTotal > 0 ? ctxTotal : subtotal + shippingCost;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });
  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const handleFinishOrder = async (e) => {
    e?.preventDefault?.();
    if (!fullName || !phone || !items.length) {
      const reason = !fullName ? "emrin" : !phone ? "telefonin" : "karta është bosh";
      setToast({ open: true, type: "error", msg: `Plotëso të dhënat: ${reason}.` });
      return;
    }

    const token = localStorage.getItem("tm_token") || localStorage.getItem("token");

    setLoading(true);
    try {
      const payload = {
        customerName: fullName,
        phone,
        address,
        city,
        note,
        shippingCost,
        total: Number(total.toFixed(2)),
        items: items.map((p) => {
          const pid = toSlug(p.id || p.name); // siguro slug për product_id
          const maybeNum = Number(p.rawId);
          const product_db_id = Number.isInteger(maybeNum) ? maybeNum : null;

          return {
            product_id: pid,     // slug (VARCHAR)
            productId: pid,      // alias (për kompatibilitet)
            id: pid,             // alias (për kompatibilitet)
            product_db_id,       // INT kur ekziston (nga DB), ndryshe null
            name: p.name || "produkt",
            qty: Number(p.qty || 1),
            price: Number(p.price || 0),
          };
        }),
      };

      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || data?.detail || `Gabim ${res.status}`);

      const orderId = data?.id;

      const text = buildWaText({
        orderId,
        fullName,
        phone,
        address,
        city,
        note,
        items,
        subtotal,
        shippingCost,
        total,
      });
      openWhatsAppWith(text);

      setToast({ open: true, type: "success", msg: `Porosia u krye me sukses! #${orderId ?? "?"} ✅` });

      clearCart();
      ["tm_cart", "cart", "cartItems"].forEach((k) => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
      });

      setTimeout(() => navigate("/faleminderit"), 800);
    } catch (err) {
      setToast({ open: true, type: "error", msg: err.message || "Gabim serveri." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ck-page">
      <div className="ck-shell">
        <header className="ck-header">
          <h1 className="ck-title">Përfundo Porosinë</h1>
          <p className="ck-subtitle">Plotëso të dhënat e dërgesës dhe konfirmo porosinë.</p>
        </header>

        <div className="ck-grid">
          {/* Majtas: Forma */}
          <form className="ck-card ck-form-card" onSubmit={handleFinishOrder}>
            <div className="ck-form">
              <input className="ck-input" placeholder="Emri i plotë *" aria-label="Emri i plotë"
                     value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
              <input className="ck-input" placeholder="Telefoni *" aria-label="Telefoni"
                     value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" />
              <input className="ck-input" placeholder="Adresa" aria-label="Adresa"
                     value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="address-line1" />
              <input className="ck-input" placeholder="Qyteti" aria-label="Qyteti"
                     value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
              <textarea className="ck-input ck-textarea" placeholder="Shënim (opsionale)" aria-label="Shënim (opsionale)"
                        value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            <div className="ck-cta-wrap">
              <button type="submit" className="ck-btn" disabled={loading}>
                {loading ? "Po përpunohet..." : `PËRFUNDO POROSINË (€${total.toFixed(2)})`}
              </button>
            </div>
          </form>

          {/* Djathtas: Përmbledhje */}
          <aside className="ck-card ck-summary">
            <h2 className="ck-summary-title">Përmbledhje</h2>
            <div className="ck-items" role="list">
              {items.length === 0 ? (
                <div className="ck-empty">Shporta është bosh.</div>
              ) : (
                items.map((it, i) => (
                  <div key={i} className="ck-item" role="listitem">
                    <div className="ck-item-line1">
                      <span className="ck-item-name" title={it.name}>{it.name}</span>
                      <span className="ck-item-price">€{(it.price * it.qty).toFixed(2)}</span>
                    </div>
                    <div className="ck-item-line2">
                      <span className="ck-item-qty">Sasia: {it.qty}</span>
                      <span className="ck-item-unit">€{it.price.toFixed(2)} / copë</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="ck-totals">
              <div className="ck-row"><span>Nëntotali</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="ck-row"><span>Dërgesa</span><span>{shippingCost === 0 ? "FALAS" : `€${shippingCost.toFixed(2)}`}</span></div>
              <div className="ck-row ck-row-total"><span>Totali</span><span>€{total.toFixed(2)}</span></div>
            </div>
          </aside>
        </div>
      </div>

      <Snackbar open={toast.open} autoHideDuration={3500} onClose={closeToast}>
        <Alert onClose={closeToast} severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
