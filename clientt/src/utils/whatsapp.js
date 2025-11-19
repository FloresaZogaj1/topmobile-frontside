// src/utils/whatsapp.js

// Lexo numrin nga .env: VITE_WA_PHONE=38344XXXXXX (vetëm shifra, pa +)
const ENV_PHONE = (import.meta?.env?.VITE_WA_PHONE || "").replace(/[^\d]/g, "");
const FALLBACK_PHONE = "38348723720"; // vendose tëndin këtu nëse s’përdor .env
const PHONE = ENV_PHONE || FALLBACK_PHONE;

// bashko rreshta, duke hequr null/undefined/"" automatikisht
const joinLines = (...rows) => rows.filter(Boolean).join("\n");

// normalizo newline → \n, pastaj zëvendëso me %0A (më i qëndrueshëm se encode i verbër)
function encodeForWA(str = "") {
  const s = String(str).replace(/\r\n/g, "\n");
  // fillimisht encodeURIComponent (për ë/ç, simbole), pastaj normalizo newline si %0A
  return encodeURIComponent(s).replace(/%0D%0A|%0A/g, "%0A");
}

function buildMessage(product = {}, pageUrl = "", extra = {}) {
  const title = product?.name || product?.title || "";
  const price = product?.price != null ? `€${product.price}` : "";
  const link =
    pageUrl ||
    (typeof window !== "undefined" ? window.location.href : "") ||
    "";

  return joinLines(
    `Përshëndetje Top Mobile! Dua të porosis produktin: ${title}`,
    price && `Çmimi: ${price}`,
    link && `Link: ${link}`,
    "",
    "Të dhënat e mia —",
    extra?.name && `Emri: ${extra.name}`,
    extra?.phone && `Nr. telefoni: ${extra.phone}`,
    extra?.email && `Email: ${extra.email}`,
    extra?.note && `Shënim: ${extra.note}`
  ).trim();
}

// URL “share” e qëndrueshme (api.whatsapp.com me parametra të rinj)
function makeWebUrl(msg) {
  const text = encodeForWA(msg);
  const base = "https://api.whatsapp.com/send/";
  const qp = PHONE
    ? `?phone=${PHONE}&text=${text}&type=phone_number&app_absent=0`
    : `?text=${text}&app_absent=0`;
  return `${base}${qp}`;
}

// URL direkte e app-it (whatsapp://) – mban gjithmonë `text`
function makeAppUrl(msg) {
  const text = encodeForWA(msg);
  if (PHONE) return `whatsapp://send?phone=${PHONE}&text=${text}`;
  return `whatsapp://send?text=${text}`;
}

export function makeWaLink(product = {}, pageUrl = "", extra = {}) {
  // për raste kur të duhet thjesht një href i përdorshëm
  return makeWebUrl(buildMessage(product, pageUrl, extra));
}

/**
 * Hape WhatsApp në app; nëse dështon, bie te web share.
 * Kjo thirret në onClick (user gesture), që browser-i ta lejojë protokollin.
 */
export function openWhatsApp(product = {}, pageUrl = "", extra = {}) {
  const msg = buildMessage(product, pageUrl, extra);
  const appHref = makeAppUrl(msg);
  const webHref = makeWebUrl(msg);

  let fellBack = false;

  const goWeb = () => {
    if (!fellBack) {
      fellBack = true;
      window.location.href = webHref;
    }
  };

  try {
    // Provo hapjen e aplikacionit
    window.location.href = appHref;

    // Nëse app s’u hap (s’ka app / protokolli bllokohet), qëndron në faqe → kalojmë në web
    const t = setTimeout(() => {
      if (document.visibilityState === "visible") goWeb();
    }, 700);

    // nëse përdoruesi del nga faqa (app u hap), pastro timer-in
    const visHandler = () => {
      if (document.visibilityState !== "visible") clearTimeout(t);
      document.removeEventListener("visibilitychange", visHandler);
    };
    document.addEventListener("visibilitychange", visHandler);
  } catch {
    goWeb();
  }
}
