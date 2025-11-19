// src/components/ProductCard.jsx
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="image-wrapper">
      <img
        src={product.imageUrl || "https://via.placeholder.com/260x180"}
        alt={product.name}
        className="product-image"
        loading="lazy"
      />
    </div>
    <h3 className="product-title">{product.name}</h3>
    <p className="product-desc">{product.description}</p>
    <div className="product-price">€{Number(product.price).toFixed(2)}</div>
    {/* <button className="product-btn">Shiko Detajet</button> */}
  </div>
);

export default ProductCard;
