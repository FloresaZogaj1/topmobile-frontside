import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    tag: "Këshilla Profesionale",
    text: "Stafi më ndihmoi të zgjedh telefonin sipas buxhetit. Faleminderit!",
    author: "Sara B."
  },
  {
    tag: "Aksesorë Origjinal",
    text: "Bleva mbrojtëse dhe karikues origjinal, cmimi dhe cilësia shumë të mira.",
    author: "Erion T."
  },
  {
    tag: "Gift Card",
    text: "Shërbim i shkëlqyer dhe profesional! Falë gift card-it të Top Mobile gjetëm telefonin e ëndrrave në ofertë. Do të kthehem përsëri!",
    author: "Armir M."
  },
  {
    tag: "Shërbim i Shpejtë",
    text: "E çova telefonin për ndërrim ekrani dhe u rregullua për 1 orë! Super staf.",
    author: "Besart M."
  },
];

const mainColor = "#ff8000";
const mainShadow = "0 4px 24px #ff800015";

const Testimonials = () => (
  <div style={{
    background: "#fff8f1",
    color: "#222",
    padding: "54px 0 54px 0",
    borderTop: "1px solid #f6f3ed",
    display: "flex",
    justifyContent: "center"
  }}>
    <div style={{
      maxWidth: 980,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 60,
      justifyContent: "center",
      flexWrap: "wrap",
    }}>
      {/* MAJTAS */}
      <div style={{
        flex: 1,
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        maxWidth: 320
      }}>
        <div style={{
          color: mainColor,
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 8,
          letterSpacing: 0.7
        }}>Dëshmitë</div>
        <h2 style={{
          fontSize: 29,
          fontWeight: 800,
          margin: "0 0 26px 0",
          lineHeight: 1.14
        }}>Çka thonë klientët tanë për Top Mobile?</h2>
      </div>
      {/* DJATHTAS */}
      <div style={{
        flex: 2,
        minWidth: 320,
        maxWidth: 520
      }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={22}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          style={{ padding: "10px 0 30px 0" }}
          breakpoints={{
            900: { slidesPerView: 2 }
          }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div style={{
                background: "#fff",
                borderRadius: 17,
                border: `1.6px solid ${mainColor}15`,
                boxShadow: mainShadow,
                padding: "25px 20px 19px 22px",
                minHeight: 147,
                display: "flex",
                flexDirection: "column",
                marginBottom: 16,
                position: "relative"
              }}>
                <div style={{
                  color: mainColor,
                  background: "#fff7e5",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "2.7px 12px",
                  fontSize: 14,
                  marginBottom: 13,
                  display: "inline-block",
                  letterSpacing: 0.3
                }}>{item.tag}</div>
                <div style={{
                  fontSize: 17,
                  color: "#222",
                  marginBottom: 17,
                  lineHeight: 1.6,
                  flex: 1
                }}>{item.text}</div>
                <div style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#023047',
                }}>{item.author}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    {/* Responsive CSS */}
    <style>
      {`
        @media (max-width: 900px) {
          .swiper {
            padding-bottom: 14px !important;
          }
        }
        @media (max-width: 700px) {
          .swiper {
            width: 95vw !important;
            max-width: 420px !important;
          }
          div[style*="maxWidth: 980px"] {
            flex-direction: column !important;
            gap: 36px !important;
            align-items: center !important;
          }
          div[style*="maxWidth: 320px"] {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}
    </style>
  </div>
);

export default Testimonials;
