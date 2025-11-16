import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState(null);

  // GET
  useEffect(() => {
    async function fetchProducts() {
      setStatus("loading");
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Fetched data:", data);

        // Handle both shapes:
        // 1) /products → array
        // 2) full JSON → { products: [...] }
        const normalized = Array.isArray(data) ? data : data.products;

        setProducts(normalized);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setStatus("error");
      }
    }

    fetchProducts();
  }, []);

  // POST
  async function createProduct(newProduct) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (!res.ok) throw new Error("Failed to create product");

    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    return created;
  }

  // PATCH
  async function updateProduct(id, updates) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });

    if (!res.ok) throw new Error("Failed to update product");

    const updated = await res.json();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    return updated;
  }

  // DELETE
  async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete product");

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    products,
    status,
    error,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
