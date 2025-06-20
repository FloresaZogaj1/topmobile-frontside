import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../CartContext"; // nëse ke CartContext

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Vendos këtë funksion këtu ose importo nga komponentët e tu
function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 18px #eee",
        background: "#fff",
        padding: 16,
        margin: "16px 0",
        display: "flex",
        gap: 24,
        alignItems: "center"
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: 110, height: 100, objectFit: "contain", borderRadius: 8, background: "#fafbfc" }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#023047", marginBottom: 6 }}>{product.name}</div>
        <div style={{ color: "#555", marginBottom: 10 }}>{product.desc}</div>
        <div style={{ fontWeight: 700, color: "#ff8000", fontSize: 19 }}>{product.price} €</div>
      </div>
      {addToCart && (
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 18px",
            background: "#023047",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Shto në Shportë 🛒
        </button>
      )}
    </div>
  );
}

const Search = () => {
  const query = useQuery().get("query") || "";
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query) return;
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(
          data.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.desc && product.desc.toLowerCase().includes(query.toLowerCase()))
          )
        );
      });
  }, [query]);

  if (!query) return <div style={{ padding: 50 }}>Shkruani diçka për të kërkuar!</div>;
  if (products.length === 0) return <div style={{ padding: 50 }}>Nuk u gjetën produkte për “{query}”!</div>;

  return (
    <div style={{ maxWidth: 900, margin: "60px auto" }}>
      <h2>
        Rezultatet për: <span style={{ color: "#ff8000" }}>{query}</span>
      </h2>
      <div>
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Search;
