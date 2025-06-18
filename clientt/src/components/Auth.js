import React, { useState } from "react";

const Auth = ({ setLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/api/login" : "/api/register";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Gabim!");
      // Ruaj token dhe role
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role || "user");
        setLoggedIn(true);
      }
    } catch {
      setError("Gabim gjatë lidhjes me serverin.");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "70px auto", padding: 30, border: "1px solid #eee", borderRadius: 10 }}>
      <h2 style={{ color: "#ff8000" }}>{isLogin ? "Kyçu" : "Regjistrohu"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Emri"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Fjalëkalimi"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        {/* Checkbox për njoftime me email (vetëm te regjistrimi) */}
        {!isLogin && (
          <div style={{ marginBottom: 12 }}>
            <label>
              <input type="checkbox" name="newsletter" />
              &nbsp; Dua të marr njoftime për produktet e reja
            </label>
          </div>
        )}
        <button type="submit" style={{ background: "#ff8000", color: "#fff", border: "none", borderRadius: 6, width: "100%", padding: 10 }}>
          {isLogin ? "Kyçu" : "Regjistrohu"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
      <div style={{ marginTop: 18, textAlign: "center" }}>
        {isLogin ? (
          <span>Nuk ke llogari?{" "}
            <button style={{ color: "#ff8000", background: "none", border: "none", cursor: "pointer" }} onClick={() => setIsLogin(false)}>
              Regjistrohu!
            </button>
          </span>
        ) : (
          <span>Ke llogari?{" "}
            <button style={{ color: "#ff8000", background: "none", border: "none", cursor: "pointer" }} onClick={() => setIsLogin(true)}>
              Kyçu!
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Auth;
