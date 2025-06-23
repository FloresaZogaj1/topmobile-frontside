import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch("https://topmobile-backside-production.up.railway.app/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          onLogin(data.username);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError("Gabim në lidhje me serverin");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "40px auto" }}>
      <h3>Kyçu në Top Mobile</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="password"
        placeholder="Fjalëkalimi"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <button type="submit" disabled={isLoading} style={{ width: "100%" }}>
        {isLoading ? "Duke u kyçur..." : "Kyçu"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
