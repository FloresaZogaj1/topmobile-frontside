// src/pages/AdminProducts.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  Button, TextField, IconButton, Dialog, DialogTitle, DialogActions, DialogContent,
  Toolbar, Divider
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { api } from "../api";

const colors = {
  bg: "#0b0b0b",
  surface: "#0f0f0f",
  card: "#111111",
  chip: "#151515",
  chipStroke: "#1e1e1e",
  stroke: "#1f1f1f",
  text: "#ffffff",
  muted: "#c9c9c9",
  accent: "#ff8000",
  accentHover: "#e67300",
  shadow: "0 18px 42px rgba(0,0,0,.35)"
};

function DropZone({ file, setFile, height = 120, id = "dz" }) {
  const [isOver, setIsOver] = useState(false);
  const onDragOver = (e) => { e.preventDefault(); setIsOver(true); };
  const onDragLeave = () => setIsOver(false);
  const onDrop = (e) => { e.preventDefault(); setIsOver(false); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith("image/")) setFile(f); };
  const onPick = (e) => { const f = e.target.files?.[0]; if (f && f.type.startsWith("image/")) setFile(f); };
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  return (
    <Box sx={{ gridColumn: "span 4" }}>
      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById(id)?.click()}
        sx={{
          border: "1.5px dashed",
          borderColor: isOver ? colors.accent : colors.chipStroke,
          bgcolor: isOver ? "#1a120a" : colors.chip,
          color: colors.muted,
          borderRadius: 2,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          textAlign: "center",
          px: 2,
          transition: "all .15s",
          boxShadow: isOver ? "0 0 0 4px rgba(255,128,0,.12)" : "none"
        }}
      >
        <div>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: .5, color: colors.text }}>
            drag & drop foton këtu
          </Typography>
          <Typography variant="caption" sx={{ color: colors.muted }}>
            ose kliko për ta zgjedhur nga kompjuteri
          </Typography>
        </div>
      </Box>

      <input id={id} type="file" accept="image/*" style={{ display: "none" }} onChange={onPick} />

      {preview && (
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <img src={preview} alt="preview" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, border: `1px solid ${colors.chipStroke}` }} />
          <Typography variant="caption" sx={{ color: colors.muted }}>{file?.name}</Typography>
          <Button size="small" onClick={() => setFile(null)} sx={{ color: colors.accent, fontWeight: 700 }}>Hiqe</Button>
        </Box>
      )}
    </Box>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [localFile, setLocalFile] = useState(null);

  const [editProduct, setEditProduct] = useState(null);
  const [editLocalFile, setEditLocalFile] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const refresh = async () => {
    try {
      const { data } = await api.get(`/api/products`); // backend në production ka /api prefix
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
  };

  useEffect(() => { refresh(); }, []);

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const { data } = await api.post(`/api/products/upload-image`, fd); // backend në production ka /api prefix
    return data.url;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image?.trim() || "";
      if (!imageUrl && localFile) imageUrl = await uploadImage(localFile);

      await api.post(`/api/products`, { // backend në production ka /api prefix
        name: form.name,
        price: parseFloat(form.price),
        description: form.description || "",
        image: imageUrl
      });

      setForm({ name: "", price: "", description: "", image: "" });
      setLocalFile(null);
      refresh();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Gabim gjatë shtimit");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/products/${deleteId}`); // backend në production ka /api prefix
      setDeleteId(null);
      refresh();
    } catch (err) {
      setDeleteId(null);
      alert(err?.response?.data?.message || err.message || "Gabim gjatë fshirjes");
    }
  };

  const startEdit = (p) => {
    setEditProduct({
      id: p.id,
      name: p.name || "",
      price: p.price || "",
      description: p.description || "",
      image: p.image || ""
    });
    setEditLocalFile(null);
  };

  const saveEdit = async () => {
    if (!editProduct) return;
    try {
      let imageUrl = editProduct.image?.trim() || "";
      if (editLocalFile) imageUrl = await uploadImage(editLocalFile);

      await api.put(`/api/products/${editProduct.id}`, { // backend në production ka /api prefix
        name: editProduct.name,
        price: parseFloat(editProduct.price),
        description: editProduct.description || "",
        image: imageUrl
      });

      setEditProduct(null);
      setEditLocalFile(null);
      refresh();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Gabim gjatë ruajtjes");
    }
  };

  const inputSx = {
    bgcolor: colors.chip,
    borderRadius: 2,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: colors.chipStroke },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: colors.accent },
    "& .MuiInputBase-input": { color: colors.text },
    "& .MuiInputLabel-root": { color: colors.muted },
    "& .MuiSvgIcon-root": { color: colors.muted },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: colors.accent },
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: { xs: 1.5, md: 2 }, color: colors.text }}>
      <Toolbar disableGutters sx={{ mb: 2, gap: 1, alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: .2 }}>Menaxho Produktet</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ color: colors.muted }}>{products?.length ?? 0} produkte</Typography>
      </Toolbar>

      <Paper sx={{ p: 2, mb: 3, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, background: colors.surface, border: `1px solid ${colors.stroke}`, borderRadius: 2, boxShadow: colors.shadow }} elevation={0}>
        <TextField label="Emri *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required sx={inputSx} />
        <TextField label="Çmimi *" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required sx={inputSx} />
        <TextField label="Përshkrimi" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} sx={inputSx} />
        <TextField label="Linku i Imazhit (opsional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." sx={inputSx} />
        <DropZone file={localFile} setFile={setLocalFile} height={130} id="dz-add" />
        <Button onClick={handleAdd} variant="contained" sx={{ gridColumn: "span 4", bgcolor: colors.accent, color: "#0b0b0b", px: 4, py: 1.2, borderRadius: 999, fontWeight: 900, "&:hover": { bgcolor: colors.accentHover } }}>
          SHTO
        </Button>
      </Paper>

      <Paper sx={{ borderRadius: 2, boxShadow: colors.shadow, border: `1px solid ${colors.stroke}`, background: colors.surface, overflow: "hidden" }} elevation={0}>
        <Box sx={{ px: 2, py: 1.2 }}>
          <Typography sx={{ fontWeight: 800, letterSpacing: .2 }}>Lista e produkteve</Typography>
        </Box>
        <Divider sx={{ borderColor: colors.stroke }} />
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ background: "#1a1a1a" }}>
              {["ID","Foto","Emri","Çmimi","Përshkrimi","Veprim"].map((h) => (
                <TableCell key={h} sx={{ color: colors.muted, fontWeight: 800, borderBottomColor: colors.stroke }} align={h === "Veprim" ? "center" : "left"}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} hover sx={{ "&:hover": { backgroundColor: "#141414" }, borderBottom: `1px dashed ${colors.stroke}` }}>
                <TableCell sx={{ color: colors.text }}>{p.id}</TableCell>
                <TableCell>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6, border: `1px solid ${colors.chipStroke}` }} />
                  ) : (
                    <div style={{ width: 50, height: 50, background: colors.chip, borderRadius: 6, border: `1px solid ${colors.chipStroke}` }} />
                  )}
                </TableCell>
                <TableCell sx={{ color: colors.text, fontWeight: 700 }}>{p.name}</TableCell>
                <TableCell sx={{ color: colors.accent, fontWeight: 800 }}>€{Number(p.price).toFixed(2)}</TableCell>
                <TableCell sx={{ color: colors.muted, maxWidth: 360, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={p.description}>{p.description}</TableCell>
                <TableCell align="center">
                  <IconButton sx={{ color: colors.text, border: `1px solid ${colors.chipStroke}`, mr: 1, "&:hover": { borderColor: colors.accent, background: "rgba(255,128,0,.1)" }, borderRadius: 2 }} onClick={() => startEdit(p)} aria-label={`Ndrysho ${p.name}`} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "#ff4d4d", border: `1px solid ${colors.chipStroke}`, "&:hover": { borderColor: "#ff4d4d33", background: "#2a1414" }, borderRadius: 2 }} onClick={() => setDeleteId(p.id)} aria-label={`Fshi ${p.name}`} size="small">
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ color: colors.muted, textAlign: "center", py: 4 }}>
                  S’ka produkte.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={!!editProduct} onClose={() => setEditProduct(null)} PaperProps={{ sx: { background: colors.surface, border: `1px solid ${colors.stroke}`, color: colors.text, borderRadius: 2, boxShadow: colors.shadow, minWidth: { xs: 360, sm: 540 } } }}>
        <DialogTitle sx={{ fontWeight: 800, pb: 1.2 }}>Ndrysho Produktin</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="dense" label="Emri" value={editProduct?.name || ""} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} sx={inputSx} />
          <TextField fullWidth margin="dense" label="Çmimi" type="number" value={editProduct?.price || ""} onChange={e => setEditProduct({ ...editProduct, price: e.target.value })} sx={inputSx} />
          <TextField fullWidth margin="dense" label="Përshkrimi" value={editProduct?.description || ""} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} sx={inputSx} />
          <TextField fullWidth margin="dense" label="Linku i Imazhit" value={editProduct?.image || ""} onChange={e => setEditProduct({ ...editProduct, image: e.target.value })} placeholder="Lëre bosh nëse po ngarkon file" sx={inputSx} />
          <Box sx={{ mt: 1 }}>
            <DropZone file={editLocalFile} setFile={setEditLocalFile} height={110} id="dz-edit" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button startIcon={<CloseIcon />} onClick={() => setEditProduct(null)} sx={{ color: colors.muted }}>Anulo</Button>
          <Button startIcon={<SaveIcon />} onClick={saveEdit} variant="contained" sx={{ bgcolor: colors.accent, color: "#0b0b0b", fontWeight: 900, borderRadius: 999, "&:hover": { bgcolor: colors.accentHover } }}>
            Ruaj
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} PaperProps={{ sx: { background: colors.surface, border: `1px solid ${colors.stroke}`, color: colors.text, borderRadius: 2, boxShadow: colors.shadow } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Je i sigurt që do ta fshish këtë produkt?</DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteId(null)} sx={{ color: colors.muted }}>Anulo</Button>
          <Button onClick={handleDelete} variant="contained" sx={{ bgcolor: colors.accent, color: "#0b0b0b", fontWeight: 900, borderRadius: 999, "&:hover": { bgcolor: colors.accentHover } }}>
            Fshi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
