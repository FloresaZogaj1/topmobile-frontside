import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-card">
          <div className="cart-empty-emoji">🛒</div>
          <div className="cart-empty-title">Shporta është bosh!</div>
          <button className="btn-accent" onClick={() => navigate("/products/iphone")}>
            Shfleto produktet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-card">
        <h2 className="cart-title">🛒 Shporta juaj</h2>

        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-name" title={item.name}>{item.name}</div>
                <div className="cart-item-meta">
                  <span className="cart-item-price">€{Number(item.price).toFixed(2)}</span>
                  <span className="cart-item-times"> × {item.quantity}</span>
                </div>
              </div>
              <div className="cart-item-actions">
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Largo ${item.name} nga shporta`}
                >
                  Largojeni
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-total">
          Total: <span>€{Number(total).toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button className="btn-outline" onClick={clearCart}>
            Pastro Shportën
          </button>
          <button className="btn-accent" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
