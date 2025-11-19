import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RAW_TESTIMONIALS = [
  { id: "sara",   tag: "Këshilla Profesionale", text: "Stafi më ndihmoi të zgjedh telefonin sipas buxhetit. Faleminderit!", author: "Sara B." },
  { id: "erion",  tag: "Aksesorë Origjinal",    text: "Bleva mbrojtëse dhe karikues, çmimi dhe cilësia shumë të mira.", author: "Erion T." },
  { id: "armir",  tag: "Gift Card",             text: "Falë gift card-it gjetëm telefonin e ëndrrave në ofertë.", author: "Armir M." },
  { id: "besart", tag: "Shërbim i Shpejtë",     text: "E çova telefonin dhe u rregullua për 1 orë! Super staf.", author: "Besart M." },
];

export default function Testimonials() {
  const slides = useMemo(() => {
    const byKey = new Map();
    for (const t of RAW_TESTIMONIALS) {
      const k = (t.text + "|" + t.author).toLowerCase().trim();
      if (!byKey.has(k)) byKey.set(k, t);
    }
    return Array.from(byKey.values());
  }, []);

  return (
    <section className="tm-testi tm-testi--dark">
      <div className="tm-testi__box">
        <div className="tm-testi__left">
          <div className="tm-testi__eyebrow">Dëshmitë</div>
          <h2 className="tm-testi__title">Çka thonë klientët tanë për Top Mobile?</h2>
        </div>

        <div className="tm-testi__right">
          <Swiper
            key={slides.length}
            loop={false}
            slidesPerView={1}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{ 760: { slidesPerView: 2, spaceBetween: 18 } }}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="tm-testi__card">
                  <span className="tm-testi__tag"><span className="dot" />{item.tag}</span>
                  <p className="tm-testi__text">
                    <svg aria-hidden="true" className="quote" viewBox="0 0 24 24">
                      <path d="M8.6 6.5c1.8 0 3 1.2 3 3 0 2-1.6 3.7-3.8 4.8l.6 1.4c3.2-1.2 5.6-3.6 5.6-6.8 0-2.8-1.9-4.8-5.1-4.8-2.5 0-4.6 1.5-5.3 3.7-.4 1.1-.4 2.3-.2 3.4h2.5c-.3-1.9.5-4.7 3.7-4.7Zm9 0c1.8 0 3 1.2 3 3 0 2-1.6 3.7-3.8 4.8l.6 1.4c3.2-1.2 5.6-3.6 5.6-6.8 0-2.8-1.9-4.8-5.1-4.8-2.5 0-4.6 1.5-5.3 3.7-.4 1.1-.4 2.3-.2 3.4h2.5c-.3-1.9.5-4.7 3.7-4.7Z"/>
                    </svg>
                    {item.text}
                  </p>
                  <div className="tm-testi__author">{item.author}</div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .tm-testi{
          --accent: var(--primary);
          --bg: var(--bg-primary);
          --card: var(--bg-card);
          --ring: rgba(255,122,0,.28);
          --text: var(--text-primary);
          --muted: var(--text-secondary);
        }

        .tm-testi{ padding:40px 0 10px; }
        .tm-testi__box{
          position:relative;
          max-width:1200px; margin:0 auto;
          padding:var(--space-10) var(--space-8);
          border-radius:var(--radius-2xl);
          background: var(--gradient-card);
          border: 1px solid var(--border-light);
          display:grid; grid-template-columns:1fr 1.4fr; gap:var(--space-8);
          box-shadow:var(--shadow-2xl);
        }
        .tm-testi__box::before{
          content:""; position:absolute; inset:-70px 0 auto 0; height:160px; pointer-events:none;
          background: radial-gradient(520px 120px at 50% 0%, rgba(255,122,0,.18), rgba(255,122,0,0) 70%);
          filter: blur(8px);
        }

        .tm-testi__left{ display:flex; flex-direction:column; justify-content:center; }
        .tm-testi__eyebrow{ color:var(--accent); font-weight:var(--weight-black); letter-spacing:.3px; margin-bottom:var(--space-2); font-size:var(--text-base); text-transform:uppercase; }
        .tm-testi__title{ margin:0; color:var(--text-primary); font-weight:var(--weight-black); font-size:var(--text-3xl); line-height:var(--leading-tight); }

        .tm-testi__right{ min-width:0; }

        /* DARK CARDS, premium ring + subtle gradient */
        .tm-testi__card{
          position:relative;
          background: var(--card);
          color: var(--text);
          border-radius:14px;
          padding:18px 18px 16px;
          min-height:138px;
          display:flex; flex-direction:column;
          border:1px solid #242424;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.02),
            0 10px 26px rgba(0,0,0,.35);
        }
        .tm-testi__card::after{
          content:""; position:absolute; inset:0; border-radius:14px; pointer-events:none;
          background: linear-gradient(135deg, rgba(255,122,0,.08) 0%, rgba(255,255,255,0) 28%);
        }

        .tm-testi__tag{
          display:inline-flex; align-items:center; gap:8px;
          background: rgba(255,122,0,.12);
          border:1px solid rgba(255,122,0,.24);
          color: var(--accent);
          border-radius:999px; padding:4px 10px;
          font-weight:700; font-size:12.5px;
        }
        .tm-testi__tag .dot{ width:6px; height:6px; border-radius:50%; background:var(--accent); }

        .tm-testi__text{ margin:10px 0 12px; color:var(--text); font-size:16px; line-height:1.6; flex:1; }
        .tm-testi__text .quote{ width:18px; height:18px; margin-right:8px; vertical-align:-3px; fill: var(--ring); }

        .tm-testi__author{ font-weight:800; font-size:14px; color:#e6e0cc; }

        /* SWIPER CONTROLS – pa shigjeta blu, në stil dark */
        .tm-testi :global(.swiper){ padding: 2px 6px 22px; }
        .tm-testi :global(.swiper-button-prev),
        .tm-testi :global(.swiper-button-next){
          width:36px; height:36px; border-radius:12px;
          background:#0f0f0f; border:1px solid #242424; color:#fff;
          box-shadow:0 12px 30px rgba(0,0,0,.4);
        }
        .tm-testi :global(.swiper-button-prev:hover),
        .tm-testi :global(.swiper-button-next:hover){
          border-color: rgba(255,122,0,.45);
          color:#fff; background:#141414; transform:translateY(-1px);
        }
        /* mbulo default blu të swiper-it */
        .tm-testi :global(.swiper-button-prev:after),
        .tm-testi :global(.swiper-button-next:after){ font-size:16px; }

        .tm-testi :global(.swiper-pagination-bullet){
          width:7px; height:7px; opacity:.5; background:#111;
          border:1px solid rgba(255,122,0,.45);
        }
        .tm-testi :global(.swiper-pagination-bullet-active){
          opacity:1; background:var(--accent); border-color:var(--accent);
        }

        @media (max-width: 900px){
          .tm-testi{ padding:30px 0 6px; }
          .tm-testi__box{ grid-template-columns:1fr; gap:14px; padding:16px 14px; }
          .tm-testi__left{ align-items:center; text-align:center; }
          .tm-testi__title{ font-size:24px; }
        }
        @media (prefers-reduced-motion: reduce){
          .tm-testi *{ transition:none !important; }
        }
      `}</style>
    </section>
  );
}
