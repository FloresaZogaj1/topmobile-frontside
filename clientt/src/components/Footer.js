import React from "react";
import "./Footer.css";
import "../pages/Legal.css"; // reuse legal typography/link styles
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  // Structured Data (Local SEO)
  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "Top Mobile",
    "url": "https://topmobile.store/",
    "image": "https://topmobile.store/og-image.jpg",
    "telephone": "+38345407222",
    "email": "topmobileshopservice@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ulpiane",
      "addressLocality": "Prishtinë",
      "addressCountry": "XK"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "21:00" }
    ],
    "paymentAccepted": ["Cash","Visa","Mastercard","Apple Pay","Google Pay"],
    "areaServed": "Kosovo",
    "sameAs": [
      "https://www.facebook.com/topmobile.rks",
      "https://www.instagram.com/topmobile.rks/",
      "https://www.tiktok.com/@topmobile.rks"
    ]
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(storeJsonLd)}</script>

      <footer className="footer" role="contentinfo">
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-main">
          {/* Logo & Kontakt */}
          <div className="footer-logo-contact">
            <div className="footer-logo">Top Mobile</div>
            <div className="footer-contact">
              <div>Adresa: Ulpiane, Prishtinë</div>
              <div>
                Tel:{" "}
                <a href="tel:+38345407222" aria-label="Telefono 048 723 720">048 723 720</a>
              </div>
              <div>
                Email:{" "}
                <a href="mailto:info@topmobile.store">
                 info@topmobile.store
                </a>
              </div>
              <div>Orari: 09:00–21:00 (Hënë–Shtunë)</div>
              <div>E diel: Mbyllur</div>
            </div>
          </div>

          {/* Linke Meny */}
          <div className="footer-links">
            <h4>Meny & Shërbime</h4>
            <ul>
              <li><Link to="/products">Produktet</Link></li>
              <li><Link to="/cart">Shporta</Link></li>
              <li><Link to="/sherbimet/servisi">Riparime & Bartje të Dhënave</Link></li>
              <li><Link to="/products/accessories">Aksesorë</Link></li>
              <li><Link to="/gift-cards">Gift Cards</Link></li>
              <li>
                <a href="https://wa.me/38348723720" target="_blank" rel="noopener noreferrer">
                  Na Kontakto në WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Pagesat */}
          <div className="footer-links">
            <h4>Na ndiqni</h4>
            <div className="footer-social" aria-label="Rrjetet sociale">
              <a href="https://www.facebook.com/topmobile.rks" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/topmobile.rks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@topmobile.rks" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="https://wa.me/38344723123" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>

            <h4>Pagesat e pranuara</h4>
            <div className="footer-payments" aria-label="Metodat e pagesës">
              <span className="pay-chip"><SiVisa size={22} title="Visa" /></span>
              <span className="pay-chip"><SiMastercard size={22} title="Mastercard" /></span>
              <span className="pay-chip"><SiApplepay size={22} title="Apple Pay" /></span>
              <span className="pay-chip"><SiGooglepay size={22} title="Google Pay" /></span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Top Mobile. Të gjitha të drejtat e rezervuara.
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="legal-link">Privatësia</Link>
              <Link to="/terms" className="legal-link">Kushtet</Link>
              <Link to="/warranties" className="legal-link">Garancia</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
