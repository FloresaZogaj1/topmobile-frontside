import { useState, useEffect } from "react";
import { api } from "../api"; // api.js i yti me baseURL + Bearer token

export function useXP() {
  const [state, setState] = useState({
    totalXP: 0,
    level: 1,
    cur: 0,
    needed: 500,
    rewards: [],
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    api.get('/gamify/me')
      .then(r => {
        if (!mounted) return;
        setState({ ...r.data, loading: false });
      })
      .catch(() => setState(s => ({ ...s, loading: false })));
    return () => { mounted = false; };
  }, []);

  const sendEvent = async (type, points = 5, meta = {}) => {
    const r = await api.post('/gamify/event', { type, points, meta });
    setState(s => ({ ...s, ...r.data }));
    return r.data;
  };

  return { ...state, sendEvent };
}
