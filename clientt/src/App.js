import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavbarModern";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsIphone from "./pages/ProductsIphone";
import ProductsSamsung from "./pages/ProductsSamsung";
import ProductsGiftCard from "./pages/ProductsGiftCard";
import ProductsAccessories from "./pages/ProductsAccessories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import ProductsLists from "./components/ProductsLists";
import Search from "./pages/Search";
import Kushtet from './pages/Kushtet';
import { CartProvider } from "./CartContext";
import AddProduct from "./AddProduct";
import SherbimetMenu from "./pages/SherbimetMenu";
import Mirembajtja from "./pages/Mirembajtja";
import PjeseTelefona from "./pages/PjeseTelefona";
import PjesePlaystation from "./pages/PjesePlaystation";
import ServisiPerkrahja from "./pages/ServisiPerkrahja";
import AsistencaMobile from "./pages/AsistencaMobile";
import { AuthProvider } from "./AuthContext";
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./components/AdminUsers";
import AdminProducts from "./components/AdminProducts";
import AdminStats from "./components/AdminStats";
import AdminOrders from "./components/AdminOrders";
import AdminWelcome from "./components/AdminWelcome";
import AdminRoute from "./components/AdminRoute";
import Warranty from "./pages/Warranty";
import PrivateRoute from "./components/PrivateRoute";
import AdminCustomerWarranties from "./components/AdminCustomerWarranties";
import AdminWarrantyDetails from "./pages/AdminWarrantyDetails";
import AuthSuccess from "./pages/AuthSuccess";
import Privacy from "./pages/Privacy";
import Term from "./pages/Term";
import Warranties from "./pages/Warranties";
import ChatbotWidget from "./assistant/ChatbotWidget";
import AdminKontratat from "./pages/AdminKontratat";
import AdminKontrateView from "./pages/AdminKontrateView";
import AboutUs from "./pages/AboutUs";
import Category from "./pages/Category";
import Contact from "./pages/Contact";

function Profile() {
  return <div>Profili i mbrojtur (vetëm i kyçur)</div>;
}

function TokenHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate("/profile");
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <TokenHandler />
          <Navbar />
          <ChatbotWidget/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            {/* ✅ redirect i vetëm për Fujifilm */}
            <Route path="/products/fujifilm" element={<Navigate to="/category/fujifilm" replace />} />

            {/* Detaj produkti */}
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Seksione të tjera të produkteve */}
            <Route path="/products/iphone" element={<ProductsIphone />} />
            <Route path="/products/samsung" element={<ProductsSamsung />} />
            <Route path="/products/accessories" element={<ProductsAccessories />} />
            <Route path="/products" element={<Products />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/products-list" element={<ProductsLists />} />
            <Route path="/search" element={<Search />} />
            <Route path="/terms" element={<Kushtet />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/sherbimet" element={<SherbimetMenu />} />

            {/* ✅ faqja e kategorive */}
            <Route path="/category/:slug" element={<Category />} />

            <Route path="/sherbimet/telefona" element={<PjeseTelefona />} />
            <Route path="/sherbimet/playstation" element={<PjesePlaystation />} />
            <Route path="/sherbimet/servisi" element={<ServisiPerkrahja />} />
            <Route path="/sherbimet/asistenca" element={<AsistencaMobile />} />
            <Route path="/gift-cards" element={<ProductsGiftCard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/term" element={<Term />} />
            <Route path="/warranties" element={<Warranties />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* ADMIN PANEL */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminWelcome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="kontratat" element={<AdminKontratat />} />
              <Route path="kontratat/:id" element={<AdminKontrateView />} />
            </Route>

            <Route
              path="/sherbimet/mirembajtja"
              element={
                <AdminRoute>
                  <Mirembajtja />
                </AdminRoute>
              }
            />

            <Route path="/warranty" element={<Warranty />} />
            <Route
              path="/admin/customer-warranties"
              element={
                <AdminRoute>
                  <AdminCustomerWarranties />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/customer-warranties/:id"
              element={
                <AdminRoute>
                  <AdminWarrantyDetails />
                </AdminRoute>
              }
            />
          </Routes>

          <Footer />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
