import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductReviews from "../components/ProductReviews"; // Importo komponentin e review-ve

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        // Nëse produkti ka review nga backend, i merr ato. Nëse jo, shfaq default.
        setReviews(
          Array.isArray(data.reviews) && data.reviews.length > 0
            ? data.reviews
            : [
                {
                  name: "Ardian",
                  stars: 5,
                  comment: "Shumë i kënaqur me produktin, shërbim i shpejtë!",
                  date: "03.06.2025"
                },
                {
                  name: "Sara",
                  stars: 4,
                  comment: "Telefoni ishte origjinal, por vonoi pak dërgesa.",
                  date: "01.06.2025"
                }
              ]
        );
      });
  }, [id]);

  // Kur shtohet review i ri nga useri
  const handleAddReview = (review) => {
    setReviews(prev => [review, ...prev]);
    // Shtesë: Mund të bësh edhe POST te backend këtu nëse do të ruash në DB
  };

  if (!product) return <div style={{ textAlign: "center", marginTop: 80 }}>Duke u ngarkuar...</div>;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "60px auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px #0001",
        padding: 42,
        textAlign: "center",
        position: "relative",
      }}
    >
      <img
        src={`https://via.placeholder.com/170x170?text=${encodeURIComponent(product.name)}`}
        alt={product.name}
        style={{
          width: 170,
          height: 170,
          objectFit: "cover",
          borderRadius: 14,
          marginBottom: 26,
          border: "1px solid #eee",
          boxShadow: "0 2px 12px #0001",
        }}
      />
      <h2 style={{ fontWeight: 700, marginBottom: 12 }}>{product.name}</h2>
      <div style={{ color: "#555", marginBottom: 18 }}>{product.description}</div>
      <div style={{ fontWeight: 600, fontSize: 21, color: "#21706c", marginBottom: 28 }}>
        Çmimi: {Number(product.price).toLocaleString()} €
      </div>
      <button
        style={{
          background: "#21706c",
          color: "#fff",
          border: "none",
          padding: "13px 34px",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: 1,
          cursor: "pointer",
          transition: "background 0.2s",
          boxShadow: "0 2px 8px #21706c22",
        }}
        onClick={() => addToCart(product)}
      >
        Shto në Shportë
      </button>
      <br />
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#21706c",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: 22,
          textDecoration: "underline",
        }}
      >
        &larr; Kthehu te produktet
      </button>

      {/* Komponenti i Review-ve */}
      <ProductReviews reviews={reviews} onAddReview={handleAddReview} />
    </div>
  );
};

export default ProductDetails;
