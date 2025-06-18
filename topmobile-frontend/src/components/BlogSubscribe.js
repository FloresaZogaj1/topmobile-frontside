// src/components/BlogSubscribe.js
import React, { useState } from "react";
import emailjs from "emailjs-com";

const SERVICE_ID = "service_i2uwkx9";
const TEMPLATE_ID = "template_dnhtncv";
const USER_ID = "vX2EgJzsAvbwFwO94"; // ose public key

const BlogSubscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError("");

    // Përgatit variablat sipas emrave në template (p.sh. user_email)
    const templateParams = { user_email: email };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(
        (result) => {
          setSubscribed(true);
          setEmail("");
        },
        (error) => {
          setError("Diçka shkoi keq. Provo përsëri!");
        }
      );
  };

  return (
    <div style={{
      maxWidth: 550,
      margin: "64px auto 0 auto",
      padding: "32px 34px",
      borderRadius: 16,
      boxShadow: "0 2px 14px #ff80001b",
      background: "#fff8f3",
      border: "1px solid #ffe1c2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h3 style={{
        fontWeight: 700,
        color: "#ff8000",
        fontSize: 22,
        marginBottom: 10,
        letterSpacing: 0.2
      }}>
        Abonohu në Blogun Top Mobile
      </h3>
      <p style={{
        color: "#222",
        fontSize: 15,
        marginBottom: 28,
        textAlign: "center"
      }}>
        Merr artikuj të rinj, oferta dhe këshilla praktike direkt në email.<br />
        Pa spam – vetëm përmbajtje me vlerë!
      </p>
      {!subscribed ? (
        <form onSubmit={handleSubscribe} style={{
          display: "flex",
          width: "100%",
          gap: 10,
          maxWidth: 400
        }}>
          <input
            type="email"
            required
            placeholder="Shkruaj emailin tuaj"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ffbe7c",
              fontSize: 15,
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              background: "#ff8000",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              padding: "10px 24px",
              fontSize: 15,
              cursor: "pointer",
              transition: "background 0.14s"
            }}
          >
            Abonohu
          </button>
        </form>
      ) : (
        <div style={{
          color: "#0db06b",
          fontWeight: 600,
          fontSize: 16,
          marginTop: 8
        }}>
          Faleminderit! Do të marrësh lajmet e fundit së shpejti në email. 📬
        </div>
      )}
      {error && <div style={{ color: "#f00", marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default BlogSubscribe;
