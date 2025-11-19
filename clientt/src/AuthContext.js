import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

function readTokenFromStorage() {
  return localStorage.getItem("tm_token") || localStorage.getItem("token") || null;
}

function decodeJwt(token) {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json); // { sub, email, role, name, iat, exp, ... }
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readTokenFromStorage());
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Vendos token në të DY emrat + user në storage
  const setTokenAndUser = useCallback((newToken, userObj) => {
    if (newToken) {
      localStorage.setItem("tm_token", newToken);
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("tm_token");
      localStorage.removeItem("token");
      setToken(null);
    }
    if (userObj) {
      localStorage.setItem("user", JSON.stringify(userObj));
      if (userObj.name) localStorage.setItem("tm_user_name", userObj.name);
      setUser(userObj);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("tm_user_name");
      setUser(null);
    }
  }, []);

  // Login klasik (me email/fjalëkalim) – e ke përdorur tashmë
  const login = (newToken, userObj) => {
    setTokenAndUser(newToken, userObj);
  };

  // Login nga GOOGLE: na vjen vetëm token -> dekodo dhe ndërto user
  const loginWithToken = (newToken) => {
    const p = decodeJwt(newToken);
    const u = p
      ? { id: p.sub, email: p.email, role: p.role || "user", name: p.name || "" }
      : null;
    setTokenAndUser(newToken, u);
  };

  const logout = () => setTokenAndUser(null, null);

  // Bootstrap pas refresh-it: nëse s’ka “user” por ka token, dekodo token-in
  useEffect(() => {
    if (token && !user) {
      const p = decodeJwt(token);
      if (p) {
        setUser({ id: p.sub, email: p.email, role: p.role || "user", name: p.name || "" });
      }
    }
  }, [token, user]);

  const loggedIn = !!token; // mjafton token-i

  return (
    <AuthContext.Provider value={{ token, user, login, loginWithToken, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
