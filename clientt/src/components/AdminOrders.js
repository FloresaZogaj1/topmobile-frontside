import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [changingId, setChangingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/api/admin/orders`);
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      }
    })();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setChangingId(id);
    try {
      await api.put(`/api/admin/orders/${id}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: newStatus } : o)));
    } finally {
      setChangingId(null);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/admin/orders/${deleteId}`);
      setOrders(prev => prev.filter(o => o.id !== deleteId));
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h2>Porositë</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Klienti</th><th>Status</th><th>Veprime</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_name}</td>
              <td>
                <select
                  value={o.status || ""}
                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  disabled={changingId === o.id}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => setDeleteId(o.id)}>Fshij</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteId && (
        <div>
          <p>A je i sigurt që do ta fshish?</p>
          <button onClick={handleDelete}>Po</button>
          <button onClick={() => setDeleteId(null)}>Jo</button>
        </div>
      )}
    </div>
  );
}
