// src/components/ScrollSlider.js
import React, { useRef } from "react";
import "./ScrollSlider.css"; // Vendos stilizimin në këtë file

const images = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
  // Shto sa të duash
];

const ScrollSlider = () => {
  const sliderRef = useRef();

  // Event për mouse wheel horizontal
  const onWheel = (e) => {
    if (sliderRef.current) {
      e.preventDefault();
      sliderRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={sliderRef}
      onWheel={onWheel}
      className="scroll-slider"
      style={{
        display: "flex",
        overflowX: "auto",
        gap: 16,
        padding: 8,
        scrollbarWidth: "none",
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide${i}`}
          style={{
            width: 380,
            height: 220,
            borderRadius: 14,
            objectFit: "cover",
            flex: "0 0 auto",
            boxShadow: "0 4px 16px #0001"
          }}
        />
      ))}
    </div>
  );
};

export default ScrollSlider;
