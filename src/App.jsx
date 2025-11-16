import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function Header() {
  return (
    <header>
      <h1>D&D Core Shop</h1>
      <div className="nav-links">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/products">
          Products
        </NavLink>
        <NavLink className="nav-link" to="/admin">
          Admin
        </NavLink>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p className="footer-text">
        © {new Date().getFullYear()} D&D Core Shop – Not an official Wizards of
        the Coast product. For educational use only.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
