import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        if (data.message) {
          setMessage(data.message);
          setUsername("");
          setPassword("");
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
      <h3>Regjistrohu në Top Mobile</h3>
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
        {isLoading ? "Duke u regjistruar..." : "Regjistrohu"}
      </button>
      {message && <div style={{ color: "green", marginTop: 8 }}>{message}</div>}
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default RegisterForm;
