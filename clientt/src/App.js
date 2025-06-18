import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsIphone from "./pages/ProductsIphone";
import ProductsSamsung from "./pages/ProductsSamsung";
import ProductsGiftCard from "./pages/ProductsGiftCard";
import ProductDetails from "./pages/ProductDetails";
import ProductsAccessories from "./pages/ProductsAccessories";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import ProductsLists from "./components/ProductsLists";
import AdminPanel from "./components/AdminPanel";
import AdminOrders from "./AdminOrders";
import Search from "./pages/Search";
import Kushtet from './pages/Kushtet';
import { CartProvider } from "./CartContext";
import AddProduct from "./AddProduct";
import { Import } from "lucide-react";
import SherbimetMenu from "./pages/SherbimetMenu";
import Mirembajtja from "./pages/Mirembajtja";
import PjeseTelefona from "./pages/PjeseTelefona";
import PjesePlaystation from "./pages/PjesePlaystation";
import ServisiPerkrahja from "./pages/ServisiPerkrahja";
import AsistencaMobile from "./pages/AsistencaMobile";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productsdetails" element={<ProductDetails />} />
          <Route path="/products/iphone" element={<ProductsIphone />} />
          <Route path="/products/samsung" element={<ProductsSamsung />} />
          <Route path="/products/giftcard" element={<ProductsGiftCard />} />
          <Route path="/products/accessories" element={<ProductsAccessories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/products-list" element={<ProductsLists />} />
          <Route
  path="/admin"
  element={localStorage.getItem("role") === "admin" ? <AdminPanel /> : <Navigate to="/login" />}
/>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/terms" element={<Kushtet />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/sherbimet" element={<SherbimetMenu />} />
          <Route path="/sherbimet/mirembajtja" element={<Mirembajtja />} />
<Route path="/sherbimet/telefona" element={<PjeseTelefona />} />
<Route path="/sherbimet/playstation" element={<PjesePlaystation />} />
<Route path="/sherbimet/servisi" element={<ServisiPerkrahja />} />
<Route path="/sherbimet/asistenca" element={<AsistencaMobile />} />


        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
