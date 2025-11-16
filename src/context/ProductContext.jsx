import React, { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts.js";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const value = useProducts();
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return ctx;
}
