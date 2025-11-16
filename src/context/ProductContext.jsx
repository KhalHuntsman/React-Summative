import React, { createContext, useContext } from "react";      // Import React and hooks for creating and consuming context
import { useProducts } from "../hooks/useProducts.js";          // Custom hook that fetches/handles product data

// Create a new Context object that will hold product-related state
const ProductContext = createContext();

// Provider component that wraps part of the app and supplies product data/functions
export function ProductProvider({ children }) {
  const value = useProducts();                                  // Get product state + actions from custom hook

  return (
    <ProductContext.Provider value={value}>                     // Pass the value into context so descendants can access it
      {children}                                                // Render any nested components inside the provider
    </ProductContext.Provider>
  );
}

// Custom hook to read from ProductContext
export function useProductContext() {
  const ctx = useContext(ProductContext);                       // Access the nearest ProductContext value

  if (!ctx) {                                                   // If undefined, the hook is being used outside the provider
    throw new Error("useProductContext must be used inside ProductProvider");
  }

  return ctx;                                                   // Return the context value to the caller
}
