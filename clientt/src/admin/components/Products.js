import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, IconButton, Divider, Snackbar, Alert, CircularProgress
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");


export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  };

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Emri kërkohet!";
    if (!form.price || form.price <= 0) err.price = "Çmimi duhet të jetë > 0";
    if (!form.category) err.category = "Kategoria kërkohet!";
    return err;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      let resp;
      if (editingId) {
        resp = await fetch(`${API_URL}/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        });
      } else {
        resp = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        });
      }
      if (resp.ok) {
        setSnackbar({ open: true, message: editingId ? "Produkti u përditësua!" : "Produkti u shtua me sukses!", severity: "success" });
        setForm({ name: "", price: "", description: "", category: "", image: "" });
        setEditingId(null);
        fetchProducts();
      } else {
        const data = await resp.json();
        setSnackbar({ open: true, message: data.error || "Gabim!", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Gabim në ruajtje!", severity: "error" });
    }
  };

  const handleEdit = p => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = async id => {
    if (window.confirm("A je i sigurt?")) {
      const resp = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        setSnackbar({ open: true, message: "Produkti u fshi me sukses!", severity: "success" });
        setProducts(products.filter(p => p.id !== id));
      } else {
        setSnackbar({ open: true, message: "Gabim në fshirje!", severity: "error" });
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress color="warning" size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 880, mx: "auto", mt: 4, mb: 6 }}>
      <Typography
        variant="h4"
        sx={{ color: "#ff8000", fontWeight: 700, mb: 4, letterSpacing: 1, textAlign: "center" }}
      >
        Produktet
      </Typography>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 5, background: "linear-gradient(120deg,#fff,#fff7ef 85%)", boxShadow: "0 6px 32px #ff80001c" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
          <TextField
            label="Emri"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Çmimi (€)"
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            error={!!errors.price}
            helperText={errors.price}
            sx={{ width: 120, background: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Përshkrimi"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            sx={{ flex: 1.5, minWidth: 160, background: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Kategoria"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            error={!!errors.category}
            helperText={errors.category}
            sx={{ width: 140, background: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Foto (link)"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            sx={{ width: 160, background: "#fff", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            color={editingId ? "warning" : "success"}
            type="submit"
            startIcon={editingId ? <EditIcon /> : <AddCircleOutlineIcon />}
            sx={{
              px: 2.5, py: 1.3, fontWeight: 700, fontSize: 16, borderRadius: 2,
              boxShadow: "0 2px 10px #023047", letterSpacing: 1
            }}
          >
            {editingId ? "Ruaj Ndryshimet" : "Shto Produkt"}
          </Button>
          {editingId && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => { setForm({ name: "", price: "", description: "", category: "", image: "" }); setEditingId(null); }}
              sx={{ fontWeight: 700, borderRadius: 2, px: 2.5, py: 1.3, ml: -1 }}
            >
              Anulo
            </Button>
          )}
        </form>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 5, boxShadow: "0 3px 20px #ff800012", background: "#fff", mb: 6 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="#50577a">
          Lista e Produkteve
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ width: "100%" }}>
          {products.map(p => (
            <ListItem
              key={p.id}
              sx={{
                mb: 2, borderRadius: 4, boxShadow: "0 2px 14px #ff80001a",
                background: "#fff9f3", alignItems: "flex-start"
              }}
              secondaryAction={
                <Box>
                  <IconButton onClick={() => handleEdit(p)} color="warning" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(p.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                {p.image && (
                  <Box
                    component="img"
                    src={p.image}
                    alt={p.name}
                    sx={{ width: 58, height: 58, borderRadius: 2, objectFit: "cover", mr: 2, border: "1px solid #ffe2ca" }}
                  />
                )}
                <Box>
                  <Typography fontWeight={700} fontSize={16} color="#ff8000">
                    {p.name} – {p.price}€
                  </Typography>
                  <Typography fontSize={14} color="#232e42">{p.description}</Typography>
                  <Typography fontSize={13} color="#999">{p.category}</Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
        {products.length === 0 &&
          <Typography color="#bbb" textAlign="center" py={5}>S’ka produkte për momentin.</Typography>
        }
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2600}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
