import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ALL_PRODUCTS from "../data/products.index";
import { useCart } from "../CartContext";
import SEO from "../seo/SEO";
import { Button } from "@mui/material";
import { openWhatsApp } from "../utils/whatsapp";   // ⬅️ ndryshimi këtu
import { productSlug, norm } from "../utils/productSlug";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./ProductDetails.css";

const categoryNames = {
  phone: "Telefona",
  accessory: "Aksesorë",
  accessories: "Aksesorë",
  case: "Mbrojtëse",
  giftcard: "Gift Card",
  samsung: "Samsung",
  iphone: "iPhone",
  fujifilm: "Fujifilm / Instax",
};

const DEFAULT_IMG = "/default-product.jpg";

/* -------------------- VARIANTS (vetëm për Instax Mini 12) -------------------- */
const COLOR_META = {
  "pastel-blue":  { label: "Pastel Blue",  hex: "#86bdf0" },
  "blossom-pink": { label: "Blossom Pink", hex: "#ff9dbb" },
  "mint-green":   { label: "Mint Green",   hex: "#8fd6b9" },
  "clay-white":   { label: "Clay White",   hex: "#e9e6e1", ring: "#bbb" },
  "lilac-purple": { label: "Lilac Purple", hex: "#b9a1e0" },
};
const MINI12_COLOR_LABEL = {
  "pastel-blue":  "Pastel Blue",
  "mint-green":   "Mint Green",
  "blossom-pink": "Blossom Pink",
  "clay-white":   "Clay White",
  "lilac-purple": "Lilac Purple",
};
const COLOR_TOKENS = Object.keys(COLOR_META);

const getColorTokenFromSlug = (slug = "") =>
  COLOR_TOKENS.find((t) => slug.includes(t)) || null;

// p.sh. instax-mini-12-pastel-blue-bundle-box -> instax-mini-12-bundle-box
const getVariantGroupKey = (slug = "") => {
  const token = getColorTokenFromSlug(slug);
  if (!token) return null;
  let key = slug.replace(`-${token}-`, "-");
  key = key.replace(`-${token}`, "");
  key = key.replace(`${token}-`, "");
  return key.replace(/--+/g, "-");
};
/* --------------------------------------------------------------------------- */

/* ----------------------------- SPEC HELPERS -------------------------------- */
const normalizeSpecs = (specs) => {
  if (!specs) return [];
  if (Array.isArray(specs)) {
    return specs
      .map((it) => {
        if (Array.isArray(it)) return { k: String(it[0]), v: String(it[1]) };
        if (it && typeof it === "object") return { k: String(it.k || it.key), v: String(it.v || it.value) };
        return null;
      })
      .filter(Boolean);
  }
  if (typeof specs === "object") {
    return Object.entries(specs).map(([k, v]) => ({
      k: String(k),
      v: Array.isArray(v) ? v.join(", ") : String(v),
    }));
  }
  return [];
};
/* --------------------------------------------------------------------------- */

// Gjej produktin sipas path param (slug/id/emër i normalizuar)
const useFindProduct = (routeId) => {
  return useMemo(() => {
    const pid = norm(String(routeId || ""));
    const found = (ALL_PRODUCTS || []).find((p) => {
      const nId = norm(p?.id);
      const nSlug = norm(p?.slug);
      const nName = norm(p?.name);
      return pid === nId || pid === nSlug || pid === nName;
    });
    return found || null;
  }, [routeId]);
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useFindProduct(id);

  const [activeIdx, setActiveIdx] = useState(0);

  const images = useMemo(() => {
    if (!product) return [];
    const arr = Array.isArray(product.images) ? product.images : [product.images].filter(Boolean);
    return arr.length ? arr : [DEFAULT_IMG];
  }, [product]);

  const activeImg = images[activeIdx] || DEFAULT_IMG;

  const onKey = useCallback(
    (e) => {
      if (!images.length) return;
      if (e.key === "ArrowRight" || e.key === "2") setActiveIdx((i) => (i + 1) % images.length);
      else if (e.key === "ArrowLeft" || e.key === "1") setActiveIdx((i) => (i - 1 + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // ---- gjëra të sigurta PARA çdo return (pa hooks të rinj) ----
  const category = (product?.category || "").toLowerCase();
  const categoryLabel =
    categoryNames[category] ||
    (category ? category.charAt(0).toUpperCase() + category.slice(1) : "Kategori");

  const hasOld = !!(product && product.oldPrice && product.oldPrice > product.price);
  const inStock = !!(product && product.inStock !== false && (product.stock === undefined || product.stock > 0));

  // SPEC-et (hook para return)
  const specs = useMemo(() => {
    if (!product) return [];
    const base = normalizeSpecs(product.specs);
    if (base.length) return base;

    const fallback = [];
    if (product.brand) fallback.push({ k: "Brand", v: String(product.brand) });
    if (categoryLabel) fallback.push({ k: "Kategori", v: String(categoryLabel) });
    if (product.sku) fallback.push({ k: "SKU", v: String(product.sku) });
    fallback.push({ k: "Disponueshmëria", v: inStock ? "Në stok" : "Jashtë stokut" });
    if (product.price !== undefined) fallback.push({ k: "Çmimi", v: `€${product.price}` });
    return fallback;
  }, [product, categoryLabel, inStock]);

  if (!product) {
    return <div className="pd-notfound">Produkt jo i gjetur</div>;
  }

  // ---- SEO & URL ----
  const slugOrId = productSlug(product);
  const productPath = `/products/${slugOrId}`;
  const productUrl = `https://topmobile.store${productPath}`;
  const pageUrl = typeof window !== "undefined" ? window.location.href : productUrl;

  // ---- JSON-LD ----
  const additionalProperty = specs.map(({ k, v }) => ({
    "@type": "PropertyValue",
    name: k,
    value: v,
  }));
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://topmobile.store/" },
      { "@type": "ListItem", position: 2, name: "Produktet", item: "https://topmobile.store/products" },
      ...(category
        ? [{ "@type": "ListItem", position: 3, name: categoryLabel, item: `https://topmobile.store/category/${category}` }]
        : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: product.name, item: productUrl },
    ],
  };
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    image: images.length ? images : ["https://topmobile.store/og-image.jpg"],
    sku: product.sku || undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    additionalProperty,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      price: String(product.price ?? ""),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  /* ---------------- VARIANTET / SWATCHES ---------------- */
    // Existing Fujifilm Mini12 logic preserved
    const isFujifilmMini12 =
      category === "fujifilm" && String(product.slug || "").toLowerCase().includes("instax-mini-12");

    // Generic variant group support (for phones like iPhone 15 Pro Max)
    // Products can declare `variantGroup: "iphone-15-pro-max"` or use slug patterns
    let variantSiblings = [];
    let activeColorMeta = null;

    if (isFujifilmMini12) {
      const activeSlug = String(product.slug || "").toLowerCase();
      const activeColorToken = getColorTokenFromSlug(activeSlug);
      const variantGroupKey = getVariantGroupKey(activeSlug);

      variantSiblings = (ALL_PRODUCTS || []).filter((p) => {
        const s = String(p.slug || "").toLowerCase();
        return getVariantGroupKey(s) === variantGroupKey;
      });

      activeColorMeta = COLOR_META[activeColorToken] || null;
    } else {
      // Generic grouping: use `variantGroup` property if present, fallback to slug base
      const groupKey = product.variantGroup || (String(product.id || "").toLowerCase());
      if (groupKey) {
        variantSiblings = (ALL_PRODUCTS || []).filter((p) => {
          // match by explicit variantGroup or by id/slug base
          if (p.variantGroup && String(p.variantGroup).toLowerCase() === String(groupKey).toLowerCase()) return true;
          const s = String(p.slug || p.id || p.name || "").toLowerCase();
          return s.startsWith(String(groupKey).toLowerCase());
        });
      }

      // Basic color tokens for phones (display only) — conservative mapping
      const PHONE_COLOR_META = {
        blue: { label: "Blue", hex: "#5b8dd3" },
        white: { label: "White", hex: "#f2f2f2", ring: "#ddd" },
        black: { label: "Black", hex: "#111" },
        titanium: { label: "Titanium", hex: "#c2c2c2" },
      };

      // pick active color from slug if present
      const activeSlug = String(product.slug || "").toLowerCase();
      const matchedToken = ["blue", "white", "black", "titanium"].find((t) => activeSlug.includes(t));
      activeColorMeta = matchedToken ? PHONE_COLOR_META[matchedToken] : null;
    }

  // ---- TITULLI dinamik për Mini 12 ----
  const activeSlugLower = String(product.slug || "").toLowerCase();
  const activeTok = getColorTokenFromSlug(activeSlugLower);
  const colorLabel = MINI12_COLOR_LABEL[activeTok] || null;
  const displayTitle = isFujifilmMini12
    ? `Instax Mini 12${colorLabel ? ` — ${colorLabel}` : ""}${activeSlugLower.includes("bundle-box") ? " (Bundle)" : ""}`
    : product.name;

  return (
    <div className="pd-page">
      <SEO
        title={displayTitle}
        description={product.description || "Detaje produkti nga Top Mobile."}
        url={productUrl}
        image={activeImg}
      />
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>

      {/* Breadcrumb */}
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="pd-link">Home</Link>
        <span className="pd-sep"> / </span>
        <Link to="/products" className="pd-link">Produktet</Link>
        {category && (
          <>
            <span className="pd-sep"> / </span>
            <Link to={`/category/${(product.category || "").toLowerCase()}`} className="pd-link">
              {categoryLabel}
            </Link>
          </>
        )}
        <span className="pd-sep"> / </span>
        <span className="pd-current" aria-current="page">{displayTitle}</span>
      </nav>

      {/* Layout */}
      <div className="pd-grid">
        <section className="pd-gallery">
          <div className="pd-hero" role="img" aria-label={`Foto e produktit: ${displayTitle}`}>
            <img
              src={activeImg}
              alt={displayTitle}
              className="pd-hero-img"
              loading="eager"
              onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
            />
          </div>

          {/* Variantet e telefonave (horizontal strip) */}
          {category === "phone" && variantSiblings && variantSiblings.length > 1 && (
            <div className="pd-phone-variants" role="navigation" aria-label="Variantet e ngjyrave">
              {variantSiblings.map((v) => {
                const vImages = Array.isArray(v.images) ? v.images : [v.images].filter(Boolean);
                const thumb = vImages[0] || DEFAULT_IMG;
                const isActive = String(v.id || v.slug || "").toLowerCase() === String(product.id || product.slug || "").toLowerCase();
                const s = String(v.slug || v.id || "").toLowerCase();
                const colorTok = ["blue", "white", "black", "titanium"].find((t) => s.includes(t));
                const label = colorTok ? colorTok.charAt(0).toUpperCase() + colorTok.slice(1) : v.name;
                return (
                  <button
                    key={v.id || v.slug}
                    className={`pd-phone-variant ${isActive ? "is-active" : ""}`}
                    onClick={() => !isActive && navigate(`/products/${productSlug(v)}`)}
                    aria-label={`Variant ${label}`}
                    title={label}
                  >
                    <img
                      src={thumb}
                      alt={label}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                    />
                    <span className="pd-phone-variant-label">{label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {images.length > 1 && (
            <div className="pd-thumbs" role="tablist" aria-label="Galeria e fotove">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Foto ${i + 1}`}
                  aria-selected={i === activeIdx}
                  role="tab"
                  className={`pd-thumb ${i === activeIdx ? "is-active" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className="pd-thumb-img"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="pd-info">
          <h1 className="pd-title">{displayTitle}</h1>

          {/* Swatches (vetëm për Fujifilm Mini 12) */}
          {isFujifilmMini12 && variantSiblings.length > 1 && (
            <div className="pd-variants">
              <div className="pd-variants-label">
                Ngjyra{activeColorMeta ? `: ${activeColorMeta.label}` : "" }
              </div>
              <div className="pd-swatches" role="tablist" aria-label="Zgjidh ngjyrën">
                {variantSiblings.map((v) => {
                  const s = String(v.slug || "").toLowerCase();
                  const tok = getColorTokenFromSlug(s);
                  const meta = COLOR_META[tok] || { label: tok || "Ngjyrë", hex: "#999" };
                  const isActive = s === String(product.slug || "").toLowerCase();

                  return (
                    <button
                      key={s}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      title={meta.label}
                      className={`pd-swatch ${isActive ? "is-active" : ""}`}
                      style={{ "--swatch": meta.hex, "--ring": meta.ring || "transparent" }}
                      onClick={() => !isActive && navigate(`/products/${v.slug}`)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {product.description && <div className="pd-desc">{product.description}</div>}

          <div className="pd-price-row">
            {hasOld && <span className="pd-old">€{product.oldPrice}</span>}
            {product.price !== undefined && <span className="pd-price">€{product.price}</span>}
            <span className={`pd-stock ${inStock ? "in" : "out"}`} aria-live="polite">
              {inStock ? "Në stok" : "Jashtë stokut"}
            </span>
          </div>

          {/* CTA */}
          <div className="pd-actions">
            {/* Shporta: vetëm ikonë, blu, rrethor */}
            <Button
              variant="contained"
              onClick={() => addToCart(product)}
              className="pd-add-btn"
              aria-label="Shto në shportë"
              title="Shto në shportë"
            >
              <ShoppingCartRoundedIcon fontSize="medium" />
            </Button>

            {/* WhatsApp: ikonë + tekst */}
            <Button
              variant="contained"
              className="pd-wa-btn"
              aria-label="Porosit në WhatsApp"
              title="Porosit në WhatsApp"
              startIcon={<WhatsAppIcon />}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(product, pageUrl);
              }}
            >
              Porosit
            </Button>
          </div>

          {/* Tabela e specifikave */}
          {specs.length > 0 && (
            <div className="pd-specs">
              <h2 className="pd-specs-title">Specifikime</h2>
              <table className="pd-specs-table" role="table">
                <tbody>
                  {specs.map((row, i) => (
                    <tr key={i}>
                      <th scope="row" className="pd-specs-k">{row.k}</th>
                      <td className="pd-specs-v">{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {categoryLabel && (
            <div className="pd-cat">
              Kategoria:{" "}
              <Link to={`/category/${(product.category || "").toLowerCase()}`} className="pd-link">
                {categoryLabel}
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProduct={product} />
    </div>
  );
}

// Related Products Component
function RelatedProducts({ currentProduct }) {
  const navigate = useNavigate();
  
  // Gjej produktet e ngjashme bazuar në kategori dhe brand
  const relatedProducts = useMemo(() => {
    if (!currentProduct) {
      console.log("RelatedProducts: No current product");
      return [];
    }
    
    console.log("RelatedProducts: Current product:", currentProduct.name);
    
    // ALL_PRODUCTS është një array, jo object
    const allProducts = Array.isArray(ALL_PRODUCTS) ? ALL_PRODUCTS : [];
    
    if (allProducts.length === 0) {
      // Fallback nëse ALL_PRODUCTS është object
      Object.values(ALL_PRODUCTS).forEach(categoryProducts => {
        if (Array.isArray(categoryProducts)) {
          allProducts.push(...categoryProducts);
        }
      });
    }
    
    // Filtro produktet e ngjashme
    const related = allProducts.filter(product => {
      // Mos përfshi produktin aktual
      if (product.id === currentProduct.id) return false;
      
      // Përparësi për të njëjtën kategori
      if (product.category === currentProduct.category) return true;
      
      // Nëse kanë të njëjtin brand
      if (product.brand && currentProduct.brand && 
          product.brand.toLowerCase() === currentProduct.brand.toLowerCase()) return true;
      
      // Nëse kanë fjalë kyçe të ngjashme në emër
      const currentWords = currentProduct.name.toLowerCase().split(' ');
      const productWords = product.name.toLowerCase().split(' ');
      const commonWords = currentWords.filter(word => 
        word.length > 3 && productWords.includes(word)
      );
      
      return commonWords.length >= 1;
    });
    
    // Limit në 4 produkte dhe shuffle
    const result = related
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
      
    console.log("RelatedProducts: Found", result.length, "related products:", result.map(p => p.name));
    return result;
  }, [currentProduct]);
  
  if (relatedProducts.length === 0) {
    console.log("RelatedProducts: No related products found, returning null");
    return null;
  }
  
  console.log("RelatedProducts: Rendering", relatedProducts.length, "products");
  
  const handleProductClick = (product) => {
    const slug = productSlug(product);
    navigate(`/products/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="related-products">
      <h2 className="related-title">Produktet e Ngjashme</h2>
      <div className="related-grid">
        {relatedProducts.map((product) => {
          const img = (Array.isArray(product.images) && product.images[0]) || product.image || DEFAULT_IMG;
          return (
          <div key={product.id} className="related-card" onClick={() => handleProductClick(product)}>
            <div className="related-image">
              <img 
                src={img}
                alt={product.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_IMG; }}
              />
            </div>
            <div className="related-info">
              <h3 className="related-name">{product.name}</h3>
              <div className="related-price">€{product.price}</div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="related-original-price">€{product.originalPrice}</div>
              )}
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}

export default ProductDetails;
