
import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", image: "" });
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(res.ok ? "Produkti u shtua!" : data.error || "Gabim!");
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "40px auto" }}>
      <input name="name" placeholder="Emri" onChange={handleChange} value={form.name} required /><br />
      <input name="price" placeholder="Çmimi" type="number" onChange={handleChange} value={form.price} required /><br />
      <input name="description" placeholder="Përshkrimi" onChange={handleChange} value={form.description} /><br />
      <input name="category" placeholder="Kategoria" onChange={handleChange} value={form.category} /><br />
      <input name="image" placeholder="Linku i fotos" onChange={handleChange} value={form.image} /><br />
      <button type="submit">Shto Produktin</button>
      <div style={{ color: "green" }}>{message}</div>
    </form>
  );
}
