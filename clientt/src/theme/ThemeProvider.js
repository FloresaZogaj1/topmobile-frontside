import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext();


const PHASES = {
  night: { start: 22, end: 5 },  // 22:00 - 05:59
  dawn:  { start: 6, end: 8 },   // 06:00 - 08:59
  day:   { start: 9, end: 18 },  // 09:00 - 18:59
  dusk:  { start: 19, end: 21 }, // 19:00 - 21:59
};

function computePhase(date = new Date()) {
  const h = date.getHours();
  if (h >= PHASES.night.start || h <= PHASES.night.end) return "night";
  if (h >= PHASES.dawn.start && h <= PHASES.dawn.end) return "dawn";
  if (h >= PHASES.day.start && h <= PHASES.day.end) return "day";
  return "dusk";
}

export default function ThemeProvider({ children }) {
  const [phase, setPhase] = useState(
    () => localStorage.getItem("uiPhase") || computePhase()
  );
  const [auto, setAuto] = useState(
    () => (localStorage.getItem("uiAuto") ?? "1") === "1"
  );

  // Përditëso fazën automatikisht çdo 5 min kur auto është ON
  useEffect(() => {
    const apply = (p) => {
      document.documentElement.setAttribute("data-phase", p);
    };
    if (auto) {
      const p = computePhase();
      setPhase(p);
      apply(p);
      const id = setInterval(() => {
        const next = computePhase();
        setPhase((cur) => {
          if (cur !== next) apply(next);
          return next;
        });
      }, 5 * 60 * 1000);
      return () => clearInterval(id);
    } else {
      apply(phase);
    }
  }, [auto]); // vetë "phase" aplikohet nga toggle manual më poshtë

  useEffect(() => {
    document.documentElement.setAttribute("data-phase", phase);
    localStorage.setItem("uiPhase", phase);
  }, [phase]);

  const value = useMemo(() => ({
    phase, setPhase,
    auto, setAuto,
    setManualPhase: (p) => { setAuto(false); setPhase(p); localStorage.setItem("uiAuto","0"); },
    enableAuto: () => { setAuto(true); localStorage.setItem("uiAuto","1"); },
  }), [phase, auto]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useThemePhase = () => useContext(ThemeCtx);
