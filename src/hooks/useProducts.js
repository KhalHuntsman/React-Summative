import { useEffect, useState } from "react";                     // React hooks for local state and lifecycle effects

const API_URL = "http://localhost:3001/products";               // Base URL for the products API

export function useProducts() {
  const [products, setProducts] = useState([]);                 // Store list of products
  const [status, setStatus] = useState("idle");                 // Track current request state
  const [error, setError] = useState(null);                     // Track error messages

  // GET — fetch all products on mount
  useEffect(() => {
    async function fetchProducts() {
      setStatus("loading");                                     // Indicate request has started

      try {
        const res = await fetch(API_URL);                       // Perform GET request
        if (!res.ok) throw new Error("Failed to fetch products"); // Handle non-200 responses

        const data = await res.json();                          // Parse JSON response
        console.log("Fetched data:", data);                     // Debug log

        // Normalizes API shape:
        // - If API returns an array → use it
        // - If API returns { products: [...] } → extract array
        const normalized = Array.isArray(data) ? data : data.products;

        setProducts(normalized);                                // Save products to state
        setStatus("success");                                   // Mark request successful
      } catch (err) {
        console.error(err);                                     // Log error for debugging
        setError(err.message);                                  // Store human-readable error
        setStatus("error");                                     // Mark request failed
      }
    }

    fetchProducts();                                             // Invoke fetch on component mount
  }, []);                                                        // Empty dependency array → run once

  // POST — create a new product
  async function createProduct(newProduct) {
    const res = await fetch(API_URL, {
      method: "POST",                                            // POST creates new record
      headers: { "Content-Type": "application/json" },           // Tell server JSON is being sent
      body: JSON.stringify(newProduct)                           // Convert JS object → JSON string
    });

    if (!res.ok) throw new Error("Failed to create product");    // Handle bad response

    const created = await res.json();                            // Parse newly created item
    setProducts((prev) => [...prev, created]);                   // Append new item to state
    return created;                                              // Return created product to caller
  }

  // PATCH — update an existing product
  async function updateProduct(id, updates) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",                                           // PATCH updates only changed fields
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)                              // Send only the updated fields
    });

    if (!res.ok) throw new Error("Failed to update product");

    const updated = await res.json();                            // Parse updated item
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))               // Replace the old product with the updated one
    );
    return updated;
  }

  // DELETE — remove a product
  async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"                                           // DELETE removes resource
    });

    if (!res.ok) throw new Error("Failed to delete product");

    setProducts((prev) => prev.filter((p) => p.id !== id));      // Remove deleted item from state
  }

  // Expose state + CRUD functions
  return {
    products,                                                    // List of products
    status,                                                      // Loading/error/success state
    error,                                                       // Error message if applicable
    createProduct,                                               // POST method
    updateProduct,                                               // PATCH method
    deleteProduct                                                // DELETE method
  };
}
