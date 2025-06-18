import React, { useState } from "react";

// Komponent për të shfaqur yjet vizualisht
function StarRating({ value }) {
  return (
    <span style={{ color: "#ffc700" }}>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

// Komponenti kryesor për Review
const ProductReviews = ({ reviews, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const today = new Date();
    const date =
      today.toLocaleDateString("sq-AL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) || "";
    onAddReview({
      name,
      stars,
      comment,
      date,
    });
    setName("");
    setStars(5);
    setComment("");
    setShowForm(false);
  };

  return (
    <div style={{ marginTop: 40, textAlign: "left" }}>
      <h3 style={{ marginBottom: 14, color: "#ff8000" }}>Vlerësimet & Komentet</h3>
      <button
        style={{
          background: "#ff8000",
          color: "#fff",
          border: "none",
          borderRadius: 7,
          fontWeight: 600,
          padding: "7px 19px",
          cursor: "pointer",
          marginBottom: 20,
        }}
        onClick={() => setShowForm(f => !f)}
      >
        {showForm ? "Anulo" : "Shto Koment/Review"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <input
            placeholder="Emri juaj"
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #eee",
              width: "170px",
              marginRight: 10,
            }}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select
            value={stars}
            onChange={e => setStars(Number(e.target.value))}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #eee", marginRight: 10 }}
          >
            {[5, 4, 3, 2, 1].map(s => (
              <option value={s} key={s}>{s} yje</option>
            ))}
          </select>
          <br />
          <textarea
            placeholder="Shkruani përshtypjet tuaja..."
            style={{
              width: "100%",
              marginTop: 10,
              minHeight: 60,
              padding: 8,
              borderRadius: 6,
              border: "1px solid #eee",
            }}
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <br />
          <button
            type="submit"
            style={{
              background: "#21706c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              padding: "7px 22px",
              marginTop: 8,
              cursor: "pointer",
            }}
          >
            Publiko
          </button>
        </form>
      )}

      {/* Lista e review-ve */}
      <div>
        {(!reviews || reviews.length === 0) && (
          <div style={{ color: "#bbb", fontStyle: "italic", marginTop: 6 }}>
            Nuk ka ende vlerësime për këtë produkt.
          </div>
        )}
        {reviews && reviews.map((r, i) => (
          <div key={i} style={{
            borderBottom: "1px solid #eee",
            marginBottom: 18,
            paddingBottom: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <b style={{ color: "#21706c" }}>{r.name || "Anonim"}</b>
              <StarRating value={r.stars || 5} />
              <span style={{ color: "#aaa", fontSize: 13, marginLeft: 6 }}>{r.date}</span>
            </div>
            <div style={{ marginTop: 5, color: "#444" }}>{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
