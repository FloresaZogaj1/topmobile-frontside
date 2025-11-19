import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import products from "../data/products.index";
import { useCart } from "../CartContext";
import { productSlug } from "../utils/productSlug";
import "./ProductsIphone.css"; // Përdor të njëjtin stilizim CSS

const PLACEHOLDER = "/default-product.jpg";

/* --------- Ngjyra & Grupim (vetëm për Instax Mini 12) --------- */
const COLOR_META = {
  "pastel-blue":  { label: "Pastel Blue",  hex: "#86bdf0" },
  "mint-green":   { label: "Mint Green",   hex: "#8fd6b9" },
  "blossom-pink": { label: "Blossom Pink", hex: "#ff9dbb" },
  "clay-white":   { label: "Clay White",   hex: "#e9e6e1", ring: "#bbb" },
  "lilac-purple": { label: "Lilac Purple", hex: "#b9a1e0" },
};
const COLOR_TOKENS = Object.keys(COLOR_META);
const getColorTokenFromSlug = (slug = "") =>
  COLOR_TOKENS.find((t) => slug.includes(t)) || null;

// p.sh. instax-mini-12-pastel-blue-th-ex-d-eu  -> instax-mini-12-th-ex-d-eu
//       instax-mini-12-mint-green-bundle-box   -> instax-mini-12-bundle-box
const getVariantGroupKey = (slug = "") => {
  const token = getColorTokenFromSlug(slug);
  if (!token) return null;
  let key = slug.replace(`-${token}-`, "-");
  key = key.replace(`-${token}`, "");
  key = key.replace(`${token}-`, "");
  return key.replace(/--+/g, "-");
};

const computeMini12DisplayName = (groupKey = "") =>
  `Instax Mini 12${groupKey.includes("bundle-box") ? " (Bundle)" : ""}`;
/* --------------------------------------------------------------- */

const slugToFilters = (slug) => {
  switch (String(slug || "").toLowerCase()) {
    case "iphone":      return { category: "iphone" };
    case "ipad":        return { category: "ipad" };
    case "watch":       return { category: "watch" };
    case "accessories": return { category: "accessories" };
    case "samsung":     return { category: "samsung" };
    case "fujifilm":    return { tags: ["fujifilm", "instax"] };
    case "keot":        return { tags: ["keot"] };
    default:            return { category: String(slug || "").toLowerCase() };
  }
};

export default function Category() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const filters = slugToFilters(slug);

  // 1) filtro si më parë
  const rawItems = useMemo(() => {
    return (products || []).filter((p) => {
      if (filters.category) {
        return String(p.category || "").toLowerCase() === filters.category;
      }
      if (filters.tags && filters.tags.length) {
        const ptags = (p.tags || []).map((t) => String(t).toLowerCase());
        return filters.tags.some((t) => ptags.includes(t));
      }
      return false;
    });
  }, [filters]);

  // 2) në /fujifilm, grupon *vetëm* Instax Mini 12 (grupe të ndara: body vs bundle)
  const items = useMemo(() => {
    if (String(slug).toLowerCase() !== "fujifilm") return rawItems;

    const others = [];
    const groups = new Map(); // key -> array of variants

    for (const p of rawItems) {
      const s = String(p.slug || "").toLowerCase();
      if (!s.includes("instax-mini-12")) { // vetëm Mini 12 grupon
        others.push(p);
        continue;
      }
      const key = getVariantGroupKey(s);
      if (!key) { others.push(p); continue; }
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }

    // zgjidh një "representative" për çdo grup + ruaj variantet
    const prefOrder = ["pastel-blue", "mint-green", "blossom-pink", "clay-white", "lilac-purple"];
    const reps = Array.from(groups.entries()).map(([key, arr]) => {
      let chosen = arr[0];
      for (const pref of prefOrder) {
        const m = arr.find((x) => String(x.slug || "").toLowerCase().includes(pref));
        if (m) { chosen = m; break; }
      }
      return {
        ...chosen,
        name: computeMini12DisplayName(key),   // ✅ emri unifikuar: “Instax Mini 12” / “(Bundle)”
        __variants: arr,                       // ✅ swatches në kartë
      };
    });

    // shfaq fillimisht grupet e Mini 12, pastaj produktet e tjera si janë
    return [...reps, ...others];
  }, [rawItems, slug]);

  const titleMap = {
    iphone: "iPhone",
    ipad: "iPad",
    watch: "Apple Watch",
    accessories: "Aksesorë",
    samsung: "Samsung",
    fujifilm: "Fujifilm / Instax",
    keot: "KEOT",
  };
  const title = titleMap[String(slug).toLowerCase()] || "Kategori";

  return (
    <Box className="iphone-page" sx={{ maxWidth: 1300, mx: "auto", py: 5, px: { xs: 1, md: 4 } }}>
      <Typography component="h1" variant="h4" fontWeight={900} className="iphone-title" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <div className="products-grid">
        {items.map((p, idx) => (
          <div key={(p.id || p.slug || idx) + "_cat"} className="modern-product-card">
            {/* Badge I RI */}
            <div className="product-new-badge">I RI</div>
            
            {/* Heart Icon */}
            <div className="product-heart">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>

            <div className="modern-product-image">
              <Link to={`/products/${productSlug(p)}`}>
                <img
                  src={(p?.images?.[0] || "").trim() || PLACEHOLDER}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                />
              </Link>
            </div>

            <div className="modern-product-info">
              <div className="product-category-label">FUJIFILM</div>
              <Link to={`/products/${productSlug(p)}`} className="modern-product-title">
                {p.name}
              </Link>

              {/* Color swatches për variante */}
              {!!p.__variants?.length && (
                <div className="color-swatches" style={{ display: "flex", gap: "8px", marginBottom: "var(--space-3)" }}>
                  {p.__variants.map((v) => {
                    const s = String(v.slug || "").toLowerCase();
                    const tok = getColorTokenFromSlug(s);
                    const meta = COLOR_META[tok] || { hex: "#999" };
                    return (
                      <Link
                        key={v.slug}
                        to={`/products/${productSlug(v)}`}
                        title={COLOR_META[tok]?.label || "Ngjyrë"}
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: meta.hex,
                          border: `2px solid ${meta.ring || "rgba(255,255,255,0.15)"}`,
                          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.35)",
                          display: "inline-block"
                        }}
                        aria-label={`Hap variantin ${COLOR_META[tok]?.label || ""}`}
                      />
                    );
                  })}
                </div>
              )}

              <div className="modern-product-price">
                {p.oldPrice && p.oldPrice > p.price && (
                  <span style={{ color: "#6b6b6b", textDecoration: "line-through", fontSize: "13px", marginRight: "8px" }}>
                    €{p.oldPrice}
                  </span>
                )}
                €{p.price}
              </div>

              <div className="modern-product-buttons">
                <button 
                  className="btn-buy-now"
                  onClick={() => addToCart({ ...p, qty: 1 })}
                >
                  Shto në Shportë
                </button>
                <Link to={`/products/${productSlug(p)}`} className="btn-details-gray">
                  Detajet
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!items.length && (
        <Typography sx={{ 
          color: "var(--text-secondary)", 
          textAlign: "center", 
          width: "100%", 
          py: 10, 
          fontSize: 20, 
          fontWeight: 600 
        }}>
          Aktualisht nuk ka produkte në këtë kategori.
        </Typography>
      )}
    </Box>
  );
}
