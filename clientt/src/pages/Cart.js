import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Paper } from "@mui/material";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from "../CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, p) => sum + (p.price * p.qty), 0);

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        mt: 7,
        background: "#fff",
        borderRadius: 4,
        boxShadow: "0 8px 34px #0001",
        p: { xs: 2.5, md: 5 },
      }}
    >
      <Typography variant="h4" mb={4} align="center" fontWeight={700} color="#232e42">
        Shporta juaj
      </Typography>

      {cart.length === 0 ? (
        <Box textAlign="center" sx={{ my: 6 }}>
          <Typography fontWeight={600} color="#888" fontSize={19} mb={2}>Shporta është bosh.</Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="warning"
            sx={{ fontWeight: 600, borderRadius: 2, px: 4, fontSize: 16, boxShadow: 0 }}
          >
            Shko te produktet
          </Button>
        </Box>
      ) : (
        <>
          <Paper elevation={0} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f7f7f7" }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Produkt</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>Sasia</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>Çmimi</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          width={38}
                          style={{ borderRadius: 6, marginRight: 13, verticalAlign: "middle" }}
                        />
                      )}
                      {item.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 500 }}>{item.qty}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 500 }}>
                      {Number(item.price).toLocaleString()} €
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                        sx={{ minWidth: 0, p: "3px", borderRadius: 2 }}
                        title="Largo produktin"
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
            <Typography fontWeight={700} fontSize={21} color="#21706c" sx={{ mt: { xs: 2, md: 0 } }}>
              Totali: {total.toLocaleString()} €
            </Typography>
            <Box>
              <Button
                onClick={clearCart}
                color="error"
                variant="outlined"
                sx={{ mr: 2, fontWeight: 600, borderRadius: 2, px: 3 }}
              >
                Pastro Shportën
              </Button>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="success"
                endIcon={<ShoppingCartCheckoutIcon />}
                sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}
              >
                Vazhdo në Porosi
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
