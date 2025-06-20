
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së produkteve:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Po ngarkohen produktet...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Produktet</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "20px", borderBottom: "1px solid #eee" }}>
            <b>{p.name}</b> – {p.price}€
            <div>{p.description}</div>
            {p.image && (
              <div>
                <img src={p.image} alt={p.name} width={120} />
              </div>
            )}
            <div style={{ color: "#888", fontSize: "13px" }}>{p.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
