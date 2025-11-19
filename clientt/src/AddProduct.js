import React, { useMemo, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function DropZone({ file, setFile }) {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = (e) => { e.preventDefault(); setIsOver(true); };
  const onDragLeave = () => setIsOver(false);
  const onDrop = (e) => {
    e.preventDefault(); setIsOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) setFile(f);
  };
  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith("image/")) setFile(f);
  };

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById("fileinpadp")?.click()}
        style={{
          border: "2px dashed " + (isOver ? "#ff8000" : "#c9c9c9"),
          background: isOver ? "#fff7f0" : "#fafafa",
          borderRadius: 10,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          textAlign: "center",
          padding: 10
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Zdrag & drop foton këtu</div>
          <div style={{ fontSize: 11, color: "#666" }}>ose kliko për ta zgjedhur</div>
        </div>
      </div>
      <input id="fileinpadp" type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
      {preview && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={preview} alt="preview" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }} />
          <span style={{ fontSize: 12, color: "#666" }}>{file?.name}</span>
          <button type="button" onClick={() => setFile(null)} style={{ fontSize: 12 }}>Hiqe</button>
        </div>
      )}
    </div>
  );
}

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const uploadImage = async (f) => {
    const fd = new FormData();
    fd.append("image", f);
    const res = await fetch(`${API_URL}/api/products/upload-image`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      body: fd,
      credentials: "include",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Upload dështoi");
    }
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image?.trim() || "";
      if (!imageUrl && file) imageUrl = await uploadImage(file);

      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), image: imageUrl }),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage("Produkti u shtua!");
        setStatus("success");
        setForm({ name: "", price: "", description: "", image: "" });
        setFile(null);
      } else {
        setMessage(data.message || "Gabim!");
        setStatus("error");
      }
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "40px auto", display: "grid", gap: 10 }}>
      <input name="name" placeholder="Emri *" onChange={handleChange} value={form.name} required />
      <input name="price" placeholder="Çmimi *" type="number" onChange={handleChange} value={form.price} required />
      <input name="description" placeholder="Përshkrimi" onChange={handleChange} value={form.description} />
      <input name="image" placeholder="Linku i fotos (opsional)" onChange={handleChange} value={form.image} />
      <DropZone file={file} setFile={setFile} />
      <button type="submit">Shto Produktin</button>

      {message && (
        <div style={{ color: status === "success" ? "green" : "crimson" }}>
          {message}
        </div>
      )}
    </form>
  );
}
