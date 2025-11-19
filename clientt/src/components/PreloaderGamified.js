import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./preloader.css";

const SEEN_KEY = "tm_preload_seen_v2";
const DURATION_MS = 3000;     // ⏱️ ~3 sekonda
const FADE_MS = 400;

export default function PreloaderGate() {
  const location = useLocation();
  const navigate = useNavigate();

  // Shfaqe vetëm në vizitën e parë në homepage (ose me ?intro=1)
  const allowOnHome = (location.pathname || "/") === "/";
  const force = new URLSearchParams(location.search).get("intro") === "1";
  const seen = !!localStorage.getItem(SEEN_KEY);
  const shouldShow = (force || !seen) && allowOnHome;

  const [visible, setVisible] = useState(shouldShow);
  const [phase, setPhase] = useState("idle"); // idle | running | fading
  const [progress, setProgress] = useState(0); // 0→100 (%)
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(DURATION_MS / 1000));

  const startRef = useRef(0);
  const rafRef = useRef();

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!visible) return;

    setPhase("running");
    startRef.current = performance.now();

    // Në reduce-motion, shkurtoje në ~1s
    const total = reduceMotion ? 1000 : DURATION_MS;

    const tick = (t) => {
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / total, 1);
      setProgress(Math.round(p * 100));
      setSecondsLeft(Math.max(0, Math.ceil((total - elapsed) / 1000)));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // përfundo: fade-out + redirect
        setPhase("fading");
        setTimeout(() => {
          localStorage.setItem(SEEN_KEY, "1");
          navigate("/", { replace: true });
        }, FADE_MS);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, navigate, reduceMotion]);

  if (!visible) return null;

  return (
    <div
      className={`tm-preloader ${phase === "fading" ? "is-fading" : ""}`}
      role="dialog"
      aria-label="Duke u ngarkuar Top Mobile"
      aria-live="polite"
    >
      <div className="tm-preloader-bg" />
      <div className="tm-card">
        <div className="tm-head">
          <div className="tm-dot" />
          <div className="tm-title">WEBI JON BON!</div>
        </div>

        {/* Spinner + progress */}
        <div className="tm-load-wrap">
          <div className="tm-spinner" aria-hidden />
          <div className="tm-progressbar">
            <div className="tm-progress" style={{ width: `${progress}%` }} />
          </div>
          <div className="tm-sub">
            {secondsLeft > 0 ? `Rreth ${secondsLeft}s…` : "Gati!"}
          </div>
        </div>

       
      </div>
    </div>
  );
}
