import React from "react";
import { useRef, useState } from "react";
import { useProductContext } from "../context/ProductContext.jsx";

const emptyForm = {
  name: "",
  category: "Book",
  price: "",
  description: "",
  stock: ""
};

export default function AdminPage() {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProductContext();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const nameInputRef = useRef(null); // useRef requirement

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock
    });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      stock: Number(form.stock)
    };

    try {
      if (editingId) {
        // PATCH
        await updateProduct(editingId, payload);
      } else {
        // POST
        await createProduct(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving product. See console for details.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  }

  return (
    <section>
      <h2 className="page-title">Admin – Manage Products</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            ref={nameInputRef}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Book">Book</option>
            <option value="Dice">Dice</option>
          </select>
        </label>

        <label>
          Price
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Description
          <textarea
            name="description"
            rows="2"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.5rem" }}>
          <button className="button" type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
              ? "Update Product (PATCH)"
              : "Create Product (POST)"}
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={startCreate}
          >
            New Product
          </button>
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cat.</th>
            <th>Price</th>
            <th>Stock</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="button"
                  type="button"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>{" "}
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
