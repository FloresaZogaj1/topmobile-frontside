import React, { useEffect, useState, useMemo } from "react";
import { api } from "../api";
import {
  Box,
  Typography,
  Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Chip, Select, MenuItem, Tooltip, Stack,
  TextField, InputAdornment, CircularProgress,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ open: false, msg: "", severity: "success" });
  const [confirm, setConfirm] = useState(null); // { type: 'delete'|'block', id, name }

  const accent = "var(--accent, #ff8000)";
  const cardBg = "rgba(255,255,255,0.98)";

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/admin/users`); // backend në production ka /api prefix
        if (alive) setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) {
          setUsers([]);
          setToast({ open: true, msg: "S’u ngarkuan përdoruesit.", severity: "error" });
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, [reload]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;
    return users.filter(u =>
      String(u.id).includes(s) ||
      (u.name || "").toLowerCase().includes(s) ||
      (u.email || "").toLowerCase().includes(s) ||
      (u.role || "").toLowerCase().includes(s)
    );
  }, [users, q]);

  const doReload = () => setReload(x => x + 1);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`); // Hequr /api prefix
      setToast({ open: true, msg: "Përdoruesi u fshi.", severity: "success" });
      doReload();
    } catch {
      setToast({ open: true, msg: "S’u fshi dot përdoruesi.", severity: "error" });
    }
  };

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role }); // Hequr /api prefix
      setToast({ open: true, msg: "Roli u ndryshua.", severity: "success" });
      doReload();
    } catch {
      setToast({ open: true, msg: "S’u ndryshua roli.", severity: "error" });
    }
  };

  const blockUser = async (id) => {
    try {
      await api.put(`/admin/users/${id}/block`); // Hequr /api prefix
      setToast({ open: true, msg: "Statusi u përditësua.", severity: "success" });
      doReload();
    } catch {
      setToast({ open: true, msg: "S’u përditësua statusi.", severity: "error" });
    }
  };

  const RoleChip = ({ role }) =>
    role === "admin" ? (
      <Chip icon={<ShieldIcon />} label="Admin" sx={{ bgcolor: "rgba(255,128,0,0.15)", color: accent, fontWeight: 700 }} />
    ) : (
      <Chip icon={<PersonIcon />} label="User" variant="outlined" />
    );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} gap={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#eae6dd", textShadow: "0 1px 0 rgba(0,0,0,0.5)" }}>
            Përdoruesit
          </Typography>
        </Stack>
        <TextField
          size="small"
          placeholder="Kërko (emër, email, rol, ID)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 280,
            "& .MuiOutlinedInput-root": { bgcolor: "#1b1b1b", color: "#f1f1f1", borderRadius: 999 },
            "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
          }}
        />
      </Stack>

      {/* Card container */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: cardBg,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        {/* top accent bar */}
        <Box sx={{ height: 4, bgcolor: accent }} />

        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={6}>
            <CircularProgress />
          </Stack>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 880 }}>
              <TableHead>
                <TableRow>
                  {["ID", "Emri", "Email", "Roli", "Veprime"].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 800, color: "#333" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography color="text.secondary">Nuk u gjet asnjë përdorues.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u.id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>{u.id}</TableCell>
                      <TableCell>{u.name || "-"}</TableCell>
                      <TableCell>{u.email || "-"}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <RoleChip role={u.role} />
                          <Select
                            size="small"
                            value={u.role || "user"}
                            onChange={(e) => changeRole(u.id, e.target.value)}
                            sx={{
                              ml: 1,
                              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.1)" },
                              borderRadius: 2,
                              minWidth: 120,
                            }}
                          >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                          </Select>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Blloko / Çblloko">
                            <IconButton
                              onClick={() => setConfirm({ type: "block", id: u.id, name: u.name || u.email })}
                              sx={{ color: "#111", bgcolor: "rgba(255,128,0,0.15)", "&:hover": { bgcolor: "rgba(255,128,0,0.25)" } }}
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Fshij">
                            <IconButton
                              onClick={() => setConfirm({ type: "delete", id: u.id, name: u.name || u.email })}
                              sx={{
                                color: "#b00020",
                                "&:hover": { bgcolor: "rgba(176,0,32,0.08)" },
                              }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>

      {/* Confirm dialog */}
      <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
        <DialogTitle>
          {confirm?.type === "delete" ? "Konfirmo fshirjen" : "Ndrysho statusin e aksesit"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirm?.type === "delete"
              ? <>Dëshiron ta fshish përgjithmonë përdoruesin <b>{confirm?.name}</b>?</>
              : <>Dëshiron të bllokosh/çbllokosh përdoruesin <b>{confirm?.name}</b>?</>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(null)}>Anulo</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: accent, "&:hover": { bgcolor: "#ffa24d" } }}
            onClick={async () => {
              if (!confirm) return;
              const { type, id } = confirm;
              setConfirm(null);
              if (type === "delete") await deleteUser(id);
              else await blockUser(id);
            }}
          >
            Po, vazhdo
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2800}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
