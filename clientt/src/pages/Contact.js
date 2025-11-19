import React from "react";
import { Container, Typography, Box, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import SEO from "../seo/SEO";
import "./Contact.css";
// Optional local brand marks (fallback to text if missing)
import appleLogo from "../assets/iphone_15_pro_max_black_titanium_pdp_image_position_3_e1a0e669-f7fd-491b-828b-6e362af107be-removebg-preview.png";
import samsungLogo from "../assets/Samsung-Galaxy-S24-Ultra-Titanium-Grey-removebg-preview.webp";
import xiaomiLogo from "../assets/19454_redmi-note-14-pro-black-main-removebg-preview.png";
import fujifilmLogo from "../assets/photographer-s-hand-cuts-film-stipe-concrete-backdrop-removebg-preview.png";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Mesazhi u dërgua me sukses!");
  };

  return (
    <>
      <SEO 
        title="Kontakt - Top Mobile"
        description="Na kontaktoni për çdo pyetje rreth produkteve tona. Jemi këtu për t'ju ndihmuar!"
        keywords="kontakt, top mobile, telefon, email, adresë"
      />
      
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-phone-animation">
            <div className="floating-phone">
              <div className="phone-body">
                <div className="phone-screen">
                  <div className="screen-glow"></div>
                  <div className="phone-ui">
                    <div className="status-bar"></div>
                    <div className="app-icons">
                      <div className="icon"></div>
                      <div className="icon"></div>
                      <div className="icon"></div>
                      <div className="icon"></div>
                    </div>
                  </div>
                </div>
                <div className="phone-button"></div>
              </div>
            </div>
          </div>
          <div className="contact-hero-content">
            <div className="section-badge">📞 KONTAKT</div>
            <h1 className="contact-hero-title">Na Kontaktoni</h1>
            <p className="contact-hero-subtitle">
              Jemi këtu për t'ju ndihmuar me çdo pyetje rreth produkteve dhe shërbimeve tona
            </p>
          </div>
          {/* Brand badges: below hero content on mobile, floating on desktop */}
          <div className="brand-float-wrap">
            <div className="brand-chip apple">
              <img src={appleLogo} alt="Apple" />
              <span>iPhone</span>
            </div>
            <div className="brand-chip samsung">
              <img src={samsungLogo} alt="Samsung" />
              <span>Samsung</span>
            </div>
            <div className="brand-chip xiaomi">
              <img src={xiaomiLogo} alt="Xiaomi" />
              <span>Xiaomi</span>
            </div>
            <div className="brand-chip fujifilm">
              <img src={fujifilmLogo} alt="Fujifilm" />
              <span>Fujifilm</span>
            </div>
          </div>
          <div className="hero-bg-elements">
            <div className="bg-circle circle-1"></div>
            <div className="bg-circle circle-2"></div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="contact-info-section">
          <div className="container">
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3>Telefoni</h3>
                <p>048 723 720</p>
                <span className="contact-availability">24/7 Mbështetje</span>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Email</h3>
                <p>info@topmobile.store</p>
                <span className="contact-availability">Përgjigje brenda 2 orëve</span>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.96-2.61s.62-1.85.84-2.11c.2-.24.39-.29.52-.29l.4.01c.13 0 .29-.06.45.35.18.46.62 1.49.67 1.6.05.11.09.24.02.38-.07.14-.11.21-.22.32-.11.11-.23.25-.33.32-.11.08-.22.18-.1.35.12.17.5.84 1.08 1.36.74.68 1.41.89 1.6.99.2.11.31.09.42-.05.11-.14.48-.56.61-.75.13-.2.26-.17.44-.1.18.07 1.11.52 1.3.62.2.1.33.15.38.23.05.08.05.42-.11.79z"/>
                  </svg>
                </div>
                <h3>WhatsApp</h3>
                <p>048 723 720</p>
                <p>Mesazhe të shpejta</p>
                <span className="contact-availability">Aktiv gjithmonë</span>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3>Adresa</h3>
                <p>Ulpiane, Prishtinë</p>
                <span className="contact-availability">Hap gjithmonë</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="working-hours-card">
              <div className="working-hours-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="m12.5 7-1 0 0 6 5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3>Orari i Punës</h3>
              <div className="working-hours-grid">
                <div className="working-day">
                  <span>E Hënë - E Shtunë</span>
                  <span>09:00 - 21:00</span>
                </div>
                <div className="working-day">
                  <span>E Diel</span>
                  <span>Mbyllur</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="container">
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <div className="section-badge">📝 MESAZHI</div>
                <h2>Dërgoni një Mesazh</h2>
                <p>Na shkruani pyetjet tuaja dhe ne do t'ju përgjigjemi sa më shpejt</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Emri *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="Shkruani emrin tuaj"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Mbiemri *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Shkruani mbiemrin tuaj"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefoni *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+383 44 123 456"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subjekti *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Përshkruani shkurtimisht çështjen tuaj"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mesazhi *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="Shkruani mesazhin tuaj të detajuar këtu..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Dërgo Mesazhin
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Map Section removed per request */}
      </div>
    </>
  );
};

export default Contact;