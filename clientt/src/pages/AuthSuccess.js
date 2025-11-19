import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const token = p.get("token");
    const name = p.get("name") || "";

    if (token) {
      localStorage.setItem("tm_token", token);
      localStorage.setItem("token", token);
      if (name) localStorage.setItem("tm_user_name", name);
    }

    // Hard redirect për të pastruar çdo komponent të mbetur në DOM
    window.location.replace("/");
  }, []);

  // Mos shfaq asgjë gjatë tranzicionit
  return null;
}
