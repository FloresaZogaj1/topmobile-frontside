import React, { useState, useEffect } from "react";
import "./HeroBanner.css";
import video1 from "../assets/6755161-uhd_3840_2160_25fps.mp4";

const quotes = [
  "Derisa e pi një kafe, te Top Mobile ta kanë ndreq telefonin e prishur – edhe e ke gati!",
  "Ke problem me telefon? E len te Top Mobile, pin një kafe – kur të kthehesh, e ke gati!",
  "Mos e kalo rrugën pa ndalur te Top Mobile!",
  "Vjen për një mbrojtëse, del me telefon të ri!",
  "Sa herë pret në semafor, shfleto ofertat te Top Mobile!"
];

const HeroBanner = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-banner-tm">
      {/* Video si background */}
      <video
        className="hero-banner-video-bg"
        src={video1}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay për tekstin */}
      <div className="hero-banner-overlay">
        <h1>
          <span className="gradient-orange">Top Mobile</span> – Teknologjia më e fundit, gjithmonë afër teje!
        </h1>
        <p key={quoteIdx} className="fade-in-slide-up-quote">
          {quotes[quoteIdx]}
        </p>
        <a href="#produktet" className="hero-banner-btn">
          Shiko Produktet
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
