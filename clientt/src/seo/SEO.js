// src/seo/SEO.jsx
import { useEffect } from "react";

function upsertMeta({ name, property, content }) {
  if (!content) return;
  let selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLinkCanonical(href) {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  url,
  image = "https://topmobile.store/public/PFP-01__4_-removebg-preview.png",
}) {
  useEffect(() => {
    const site = "Top Mobile";
    const fullTitle = title ? `${title} | ${site}` : site;
    const desc =
      description ||
      "Telefona, servis profesional dhe aksesorë origjinalë. Dërgesa e shpejtë në gjithë Kosovën.";
    const canon = url || "https://topmobile.store/";

    // Title
    document.title = fullTitle;

    // Canonical
    upsertLinkCanonical(canon);

    // Basic meta
    upsertMeta({ name: "description", content: desc });

    // Open Graph
    upsertMeta({ property: "og:title", content: fullTitle });
    upsertMeta({ property: "og:description", content: desc });
    upsertMeta({ property: "og:type", content: "website" });
    upsertMeta({ property: "og:url", content: canon });
    upsertMeta({ property: "og:image", content: image });
    upsertMeta({ property: "og:image:alt", content: "Top Mobile – Telefona dhe Servis" });
    upsertMeta({ property: "og:site_name", content: site });

    // Twitter
    upsertMeta({ name: "twitter:card", content: "summary_large_image" });
    upsertMeta({ name: "twitter:title", content: fullTitle });
    upsertMeta({ name: "twitter:description", content: desc });
    upsertMeta({ name: "twitter:image", content: image });
  }, [title, description, url, image]);

  return null;
}
