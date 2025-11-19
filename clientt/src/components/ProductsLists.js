// src/components/ProductsLists.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext";

const ACCENT = "#FF8000";
const ACCENT_HOVER = "#e66e00";
const CARD_SHADOW = "0 10px 26px rgba(2,48,71,.08)";
const DEFAULT_IMG = "https://via.placeholder.com/300x200?text=Product";

const cardCss = {
  borderRadius: 14,
  background: "#fff",
  border: "1px solid #f1f2f4",
  boxShadow: CARD_SHADOW,
  padding: 16,
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
  transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
};
const btnCss = {
  background: ACCENT,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 16px",
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(255,128,0,.18)",
  transition: "background .13s ease, transform .13s ease",
};
const inputWrap = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 12,
  margin: "10px 0 18px",
};

export default function ProductsLists() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const { addToCart } = useCart();

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        if (!mounted) return;
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së produkteve:", err);
        if (!mounted) return;
        setError("S’mund t’i marrim produktet. Provo përsëri.");
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [API_URL]);

  const onAdd = (p) => {
    // Normalizim i lehtë për rastet kur fusha ka emra të ndryshëm
    const norm = {
      id: p.id ?? p._id ?? p.slug ?? String(Math.random()),
      name: p.name ?? p.title ?? "Produkt",
      price: Number(p.price ?? 0),
      description: p.description ?? p.desc ?? "",
      images: p.images ?? (p.image ? [p.image] : []),
      image: p.image ?? (Array.isArray(p.images) ? p.images[0] : undefined),
      quantity: 1,
      ...p,
    };
    addToCart(norm);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 12px" }}>
        <h2 style={{ fontWeight: 800, letterSpacing: .3, color: ACCENT }}>Produktet</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
            marginTop: 12,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ ...cardCss, border: "1px solid #eee" }}>
              <div
                style={{
                  width: 140,
                  height: 110,
                  borderRadius: 12,
                  background: "#f6f7f9",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ width: "70%", height: 16, background: "#f0f0f0", borderRadius: 6, marginBottom: 8 }} />
                <div style={{ width: "90%", height: 12, background: "#f4f4f4", borderRadius: 6, marginBottom: 6 }} />
                <div style={{ width: 110, height: 26, background: "#ffe8d6", borderRadius: 8, marginTop: 10 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 18,
          borderRadius: 12,
          background: "#fdecea",
          border: "1px solid #f5c2c0",
          color: "#a12622",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div
        style={{
          maxWidth: 520,
          margin: "48px auto",
          padding: 28,
          borderRadius: 16,
          background: "#fff",
          border: `2px solid ${ACCENT}22`,
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, marginBottom: 6 }}>
          S’ka produkte për momentin!
        </div>
        <div style={{ color: "#666" }}>Sapo të shtohen, do shfaqen këtu.</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 12px" }}>
      <h2 style={{ fontWeight: 800, letterSpacing: .3, color: ACCENT }}>Produktet</h2>

      {/* Katalogu në grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 18,
          marginTop: 12,
        }}
      >
        {products.map((p) => {
          const img = p.image || (Array.isArray(p.images) ? p.images[0] : "") || DEFAULT_IMG;
          return (
            <div
              key={p.id ?? p._id ?? p.slug}
              style={cardCss}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 34px rgba(255,128,0,.18)";
                e.currentTarget.style.borderColor = "#e8eaef";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = CARD_SHADOW;
                e.currentTarget.style.borderColor = "#f1f2f4";
              }}
            >
              <div
                style={{
                  width: 140,
                  minWidth: 140,
                  height: 110,
                  borderRadius: 12,
                  background: "#fafbfc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  onError={(e) => { e.currentTarget.src = DEFAULT_IMG; }}
                  loading="lazy"
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#222" }}>{p.name}</div>
                <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>
                  {p.description || p.desc || ""}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                  <div style={{ color: ACCENT, fontWeight: 900, fontSize: 18 }}>
                    €{Number(p.price || 0).toFixed(2)}
                  </div>
                  {p.category && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#6b6b6b",
                        border: "1px solid #eee",
                        background: "#f9fafb",
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {p.category}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <button
                    onClick={() => onAdd(p)}
                    style={btnCss}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ACCENT_HOVER)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT)}
                  >
                    Shto në Shportë 🛒
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
