import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "../components/PayPalButton";
import { useCart } from "../CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + (p.price * p.qty), 0);

  const handlePayPalSuccess = (order) => {
    setSubmitted(true);
    clearCart();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = {
        customerName: name,
        phone,
        address,
        items: cart,
        total
      };
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      if (res.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        alert("Gabim gjatë dërgimit të porosisë!");
      }
    } catch {
      alert("Gabim në lidhje!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center", background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px #0001", padding: 44 }}>
        <h2>Porosia u dërgua me sukses!</h2>
        <p>Stafi do ju kontaktoj për konfirmim.</p>
        <button
          style={{ background: "#21706c", color: "#fff", border: "none", padding: "10px 32px", borderRadius: 7, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/products")}
        >
          Kthehu te produktet
        </button>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center", background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px #0001", padding: 44 }}>
        <h2>Shporta bosh</h2>
        <button
          style={{ background: "#21706c", color: "#fff", border: "none", padding: "10px 32px", borderRadius: 7, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/products")}
        >
          Kthehu te produktet
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px #0001", padding: 44 }}>
      <h2 style={{ marginBottom: 32, textAlign: "center" }}>Finalizo Porosinë</h2>
      <ul style={{ paddingLeft: 18, marginBottom: 20 }}>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} × {item.qty} – <b>{Number(item.price * item.qty).toLocaleString()} €</b>
          </li>
        ))}
      </ul>
      <div style={{ fontWeight: 600, marginBottom: 26, color: "#21706c" }}>Totali: {total.toLocaleString()} €</div>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ marginBottom: 34 }}>
        <input
          type="text"
          placeholder="Emri & Mbiemri"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginBottom: 16, width: "100%", padding: 12, borderRadius: 7, border: "1px solid #ccc" }}
        />
        <input
          type="tel"
          placeholder="Numri i telefonit"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          pattern="^\+?\d{8,}$"
          style={{ marginBottom: 16, width: "100%", padding: 12, borderRadius: 7, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Adresa"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          style={{ marginBottom: 26, width: "100%", padding: 12, borderRadius: 7, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#21706c",
            color: "#fff",
            border: "none",
            padding: "12px 34px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: 1,
            cursor: "pointer",
            boxShadow: "0 2px 8px #21706c22",
            minWidth: 140,
          }}
        >
          {loading ? "Duke dërguar..." : "Dërgo Porosinë"}
        </button>
      </form>

      <div style={{ textAlign: "center", margin: "16px 0 0 0" }}>
        <div style={{ marginBottom: 10, fontWeight: 600, color: "#888" }}>Ose paguaj direkt me PayPal</div>
        <PayPalButton total={total} onSuccess={handlePayPalSuccess} />
      </div>
    </div>
  );
};

export default Checkout;
