import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Box, IconButton, Paper, TextField, Button, Chip, Avatar, useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import { persona } from "./persona";

const LS_KEY = "tm_chat_history";
const LS_REMEMBER = "tm_chat_remember";

function useLocalHistory() {
  const [remember, setRemember] = useState(() => localStorage.getItem(LS_REMEMBER) === "1");
  const [history, setHistory] = useState(() => {
    if (!remember) return [];
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
  });
  useEffect(() => {
    if (remember) localStorage.setItem(LS_KEY, JSON.stringify(history));
  }, [history, remember]);
  return { history, setHistory, remember, setRemember };
}

function CharacterHead({ speaking }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: speaking ? [0, -2, 2, 0] : 0 }}
      transition={{ duration: speaking ? 0.6 : 0.25, repeat: speaking ? Infinity : 0 }}
      className="flex items-center gap-2"
      style={{ pointerEvents: "none" }}
    >
      <Avatar src={persona.avatar} alt={persona.name} sx={{ width: 36, height: 36 }} />
      <span style={{ color: persona.brandColors.text, fontFamily: persona.font, fontWeight: 600 }}>
        {persona.name}
      </span>
    </motion.div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { history, setHistory, remember, setRemember } = useLocalHistory();
  const listRef = useRef(null);

  // Breakpoints për responsive
  const isXs = useMediaQuery("(max-width:480px)");
  const isSm = useMediaQuery("(max-width:900px)");

  const systemGreeting = useMemo(() => ({
    role: "assistant",
    content: `Përshëndetje! Unë jam ${persona.name}, asistent virtual i ${persona.brand}. Si mund të ndihmoj?`
  }), []);

  useEffect(() => {
    if (open && history.length === 0) setHistory([systemGreeting]);
  }, [open]); // eslint-disable-line

  useEffect(() => {
    listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [history, loading, open]);

  const push = (msg) => setHistory((h) => [...h, msg]);

  async function routeLocal(message) {
    const q = message.toLowerCase();
    if (/orari|hapur|mbyllur/.test(q)) return `Orari ynë: Hënë–Shtunë 09:00–20:00. 👌`;
    if (/lokacion|ku jeni|adresa/.test(q)) return `Na gjeni tek Bulevardi Dëshmorët e Kombit, Prishtina 10000 .Mund të dërgoj edhe lokacion me një klik.`;
    if (/garanc/.test(q)) return `Garancia standarde është 12 muaj për pajisje të reja. Për shërbime/servis ofrojmë garanci pune 30–90 ditë sipas rastit.`;
    if (/kontak|njeri|human|whats/.test(q)) return `Po, mund të flasësh me një agjent: WhatsApp +383 044 723 123, ose thirrje direkte: 044 723 123.`;
    if (/stok|cmim|iphone|samsung|pixel|pro max/.test(q)) return `Për disponueshmëri live të produkteve, mund të kërkoj për ty. Më shkruaj modelin dhe ngjyrën.`;
    return null;
  }

  async function askLLM(message) {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-10) })
    });
    if (!res.ok) throw new Error("LLM error");
    const data = await res.json();
    return data.reply;
  }

  async function onSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    push({ role: "user", content: text });
    setLoading(true);
    try {
      const local = await routeLocal(text);
      const reply = local ?? await askLLM(text);
      push({ role: "assistant", content: reply });
    } catch (e) {
      push({ role: "assistant", content: "Na fal, pati një problem me përgjigjen. Provo përsëri pak më vonë." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FAB – respekton safe-area në iOS */}
      <IconButton
        aria-label="Chat"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: "max(20px, env(safe-area-inset-right))",
          bottom: "max(20px, env(safe-area-inset-bottom))",
          zIndex: 1000,
          bgcolor: persona.brandColors.accent, color: "#000",
          boxShadow: 6,
          "&:hover": { bgcolor: persona.brandColors.accentSoft }
        }}
      >
        <ChatIcon />
      </IconButton>

      {open && (
        <Paper
          role="dialog"
          aria-label="Asistenti i Top Mobile"
          elevation={10}
          sx={{
            position: "fixed",
            zIndex: 1100,
            // Pozicionimi: në mobile qendër & më i madh; në desktop i ankoruar sipas FAB
            right: isSm ? "50%" : "20px",
            bottom: isSm ? "50%" : "90px",
            transform: isSm ? "translate(50%, 50%)" : "none",
            width: isXs ? "92vw" : isSm ? 420 : 380,
            height: isXs ? "min(86vh, 640px)" : isSm ? "min(82vh, 680px)" : 520,
            maxHeight: "96vh",
            borderRadius: isSm ? 3 : 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: persona.font,
            bgcolor: "#111519",
            boxShadow: "0 16px 48px rgba(0,0,0,.35)"
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.25,
              px: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: persona.brandColors.bg,
              borderBottom: "1px solid #1b2027",
              position: "sticky",
              top: 0,
              zIndex: 2
            }}
          >
            <CharacterHead speaking={loading} />
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              aria-label="Mbyll"
            >
              <CloseIcon sx={{ color: "#9aa4b2" }} />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: isXs ? 1.25 : 2,
              gap: 1.25,
              display: "flex",
              flexDirection: "column",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {history.map((m, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: isXs ? "92%" : "85%",
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: m.role === "user" ? "#1f2630" : "#0e141b",
                  color: persona.brandColors.text,
                  border: m.role === "assistant"
                    ? `1px solid ${persona.brandColors.accent}22`
                    : "1px solid #1f2a35",
                  fontSize: isXs ? "0.95rem" : "1rem",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap"
                }}
              >
                {m.content}
              </Box>
            ))}
            {loading && (
              <Chip
                size="small"
                label="Duke menduar…"
                sx={{ alignSelf: "flex-start", bgcolor: "#0e141b", color: "#9aa4b2" }}
              />
            )}
          </Box>

          {/* Quick Replies */}
          <Box
            sx={{
              px: 1.5,
              pb: 1,
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1
            }}
          >
            {persona.quickReplies.map((q, idx) => (
              <Chip
                key={idx}
                label={q}
                onClick={() => setInput(q)}
                sx={{
                  bgcolor: "#161c24",
                  color: "#cbd5e1",
                  fontSize: isXs ? "0.8rem" : "0.85rem",
                  height: isXs ? 26 : 28
                }}
              />
            ))}
          </Box>

          {/* Input – anti “keyboard push” për mobile */}
          <Box
            sx={{
              p: 1.25,
              display: "flex",
              gap: 1,
              borderTop: "1px solid #1b2027",
              position: "sticky",
              bottom: 0,
              bgcolor: "#111519"
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Shkruaj pyetjen…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? onSend() : null)}
              InputProps={{
                sx: {
                  color: "#e7e9ee",
                  fontSize: isXs ? "0.95rem" : "1rem",
                  bgcolor: "#0e141b",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1f2a35" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2a3947" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: persona.brandColors.accent
                  }
                }
              }}
            />
            <IconButton onClick={onSend} disabled={loading} aria-label="Dërgo">
              <SendIcon sx={{ color: persona.brandColors.accent }} />
            </IconButton>
          </Box>

          {/* Footer toggles */}
          <Box
            sx={{
              p: 1,
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#0e141b",
              fontSize: isXs ? 11.5 : 12
            }}
          >
            <label style={{ color: "#9aa4b2" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => {
                  const v = e.target.checked;
                  localStorage.setItem(LS_REMEMBER, v ? "1" : "0");
                  if (!v) localStorage.removeItem(LS_KEY);
                  setRemember(v);
                }}
              />{" "}
              Ruaj bisedën në këtë pajisje
            </label>
            <Button
              size="small"
              variant="text"
              onClick={() => window.open("https://wa.me/383044723123", "_blank")}
              sx={{ color: persona.brandColors.accent, minWidth: 0, px: 1 }}
            >
              Njeri 👤
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
}
