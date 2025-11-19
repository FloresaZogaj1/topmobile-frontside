import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Duhet të kyçesh!");
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/orders/user`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include"   // KJO ESHTE E RENDESISHME!
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
        else setMessage(data.message || "Gabim në marrje të porosive");
        setLoading(false);
      })
      .catch(() => {
        setMessage("Gabim gjatë kërkesës!");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (message) return <div>{message}</div>;
  if (!orders.length) return <div>S'ka porosi të regjistruara.</div>;

  return (
    <div>
      <h2>Porositë e mia</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <b>Porosia #{order.id}</b> | Totali: <b>{order.total} €</b> | {order.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
