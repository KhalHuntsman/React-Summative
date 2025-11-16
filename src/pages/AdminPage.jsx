import React from "react";                                      // Import React (needed for JSX)
import { useRef, useState } from "react";                       // useRef for input focus, useState for form state
import { useProductContext } from "../context/ProductContext.jsx"; // Pull CRUD functions + products from context

// Base empty form state for creating a new product
const emptyForm = {
  name: "",
  category: "Book",
  price: "",
  description: "",
  stock: ""
};

export default function AdminPage() {
  // Destructure context values: the product list + CRUD functions
  const { products, createProduct, updateProduct, deleteProduct } =
    useProductContext();

  const [form, setForm] = useState(emptyForm);                 // Controlled form input state
  const [editingId, setEditingId] = useState(null);            // Track which product is being edited (null = new)
  const [saving, setSaving] = useState(false);                 // Disable form while saving
  const nameInputRef = useRef(null);                           // Reference to the name <input> for auto-focus

  function handleChange(e) {
    const { name, value } = e.target;                          // Extract input name + value
    setForm((prev) => ({ ...prev, [name]: value }));           // Update corresponding field in form state
  }

  function startCreate() {
    setEditingId(null);                                        // Switch to "create" mode
    setForm(emptyForm);                                        // Reset form fields
    setTimeout(() => nameInputRef.current?.focus(), 0);        // Focus the name input after render
  }

  function startEdit(product) {
    setEditingId(product.id);                                  // Set edit mode for this ID
    setForm({                                                  // Populate form with product data
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock
    });
    setTimeout(() => nameInputRef.current?.focus(), 0);        // Focus name input after form fills
  }

  async function handleSubmit(e) {
    e.preventDefault();                                        // Prevent page reload
    setSaving(true);                                           // Disable actions while saving

    // Convert form values into proper payload format
    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),                               // Convert string → number
      description: form.description,
      stock: Number(form.stock)                                // Convert string → number
    };

    try {
      if (editingId) {
        // PATCH existing product
        await updateProduct(editingId, payload);
      } else {
        // POST new product
        await createProduct(payload);
      }

      setForm(emptyForm);                                      // Reset form after saving
      setEditingId(null);                                      // Exit edit mode

    } catch (err) {
      console.error(err);
      alert("Error saving product. See console for details."); // User-friendly error message

    } finally {
      setSaving(false);                                        // Re-enable buttons
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;       // Confirm deletion

    try {
      await deleteProduct(id);                                 // Perform DELETE and update context
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");                        // Simplified error handling
    }
  }

  return (
    <section>
      <h2 className="page-title">Admin – Manage Products</h2>   {/* Page heading */}

      {/* Form for creating or editing a product */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            ref={nameInputRef}                                 // Auto-focus target
            name="name"
            value={form.name}                                  // Controlled input
            onChange={handleChange}
            required                                            // Must enter a name
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Book">Book</option>                 // Example categories
            <option value="Dice">Dice</option>
          </select>
        </label>

        <label>
          Price
          <input
            type="number"
            step="0.01"                                         // Currency-friendly decimals
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

        <label style={{ gridColumn: "1 / -1" }}>               {/* Full-width field */}
          Description
          <textarea
            name="description"
            rows="2"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        {/* Action buttons */}
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.5rem" }}>
          <button className="button" type="submit" disabled={saving}>
            {saving
              ? "Saving..."                                     // Loading state
              : editingId
              ? "Update Product (PATCH)"                        // If editing
              : "Create Product (POST)"}                        // If creating
          </button>

          <button
            className="button secondary"
            type="button"
            onClick={startCreate}                               // Reset form
          >
            New Product
          </button>
        </div>
      </form>

      {/* Product table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cat.</th>                                       {/* Abbreviated for layout */}
            <th>Price</th>
            <th>Stock</th>
            <th style={{ width: "150px" }}>Actions</th>         {/* Fixed width */}
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (                               // Render each product row
            <tr key={p.id}>                                     {/* Must include unique key */}
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>                    {/* Format as currency */}
              <td>{p.stock}</td>

              <td>
                <button
                  className="button"
                  type="button"
                  onClick={() => startEdit(p)}                 // Load into form
                >
                  Edit
                </button>{" "}
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => handleDelete(p.id)}            // Delete product
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
