// src/utils/productSlug.js
export const norm = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const productSlug = (p) => p?.slug || p?.id || norm(p?.name);
