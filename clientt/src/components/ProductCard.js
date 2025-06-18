import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl || "https://via.placeholder.com/200x150"} alt={product.name} className="product-image" />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <b style={{ color: "#009688" }}>Çmimi: {product.price} €</b>
    {/* <button>Shiko Detajet</button> */}
  </div>
);

export default ProductCard;
