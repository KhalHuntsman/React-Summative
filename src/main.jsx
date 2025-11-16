import React from "react";                                      // Core React library
import ReactDOM from "react-dom/client";                        // React 18+ root API
import { BrowserRouter } from "react-router-dom";               // Enables client-side routing
import App from "./App.jsx";                                    // Main application component
import { ProductProvider } from "./context/ProductContext.jsx"; // Global product state provider
import "./styles/global.css";                                   // Global CSS styles

// Create a React 18 root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>                                            {/* Helps detect common issues in dev mode */}
    <BrowserRouter>                                             {/* Wrap app in router so <Link> and routes work */}
      <ProductProvider>                                         {/* Provide product data + CRUD context to entire app */}
        <App />                                                 {/* Main app content */}
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
