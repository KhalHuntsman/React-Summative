import React from "react";                                      // Import React for JSX
import { Routes, Route, NavLink } from "react-router-dom";      // Routing + navigation components
import HomePage from "./pages/HomePage.jsx";                    // Import individual page components
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function Header() {
  return (
    <header>                                                    {/* Site header */}
      <h1>D&D Core Shop</h1>                                    {/* Site title */}

      <div className="nav-links">                               {/* Navigation container */}
        <NavLink className="nav-link" to="/" end>               {/* "end" ensures only exact / matches */}
          Home
        </NavLink>

        <NavLink className="nav-link" to="/products">           {/* Products page link */}
          Products
        </NavLink>

        <NavLink className="nav-link" to="/admin">              {/* Admin panel link */}
          Admin
        </NavLink>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>                                                   {/* Footer container */}
      <p className="footer-text">
        © {new Date().getFullYear()} D&D Core Shop –            {/* Dynamic year */}
        Not an official Wizards of the Coast product. For       {/* Required disclaimer */}
        educational use only.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-container">                            {/* Main full-page wrapper */}
      <Header />                                                {/* Top navigation + branding */}

      <main className="main-content">                           {/* Main routed content area */}
        <Routes>                                                {/* Route configuration */}
          <Route path="/" element={<HomePage />} />             {/* Homepage */}
          <Route path="/products" element={<ProductsPage />} /> {/* Product list */}
          <Route path="/products/:id" element={<ProductDetails />} /> {/* Product details (dynamic ID) */}
          <Route path="/admin" element={<AdminPage />} />       {/* Admin panel */}
        </Routes>
      </main>

      <Footer />                                                {/* Footer at bottom */}
    </div>
  );
}
