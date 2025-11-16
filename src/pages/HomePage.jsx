import React from "react";                                      // Import React for JSX
import { Link } from "react-router-dom";                        // Link provides client-side navigation

// Simple homepage component for the store
export default function HomePage() {
  return (
    <section>                                                   {/* Main section wrapper */}
      <h2 className="page-title">Welcome to D&D Core Shop</h2>  {/* Page heading */}

      <p>
        Stock up on the essentials for your next campaign. Grab the{" "} // {" "} prevents unwanted line breaks/spaces in JSX
        <strong>Player&apos;s Handbook</strong>,{" "}                     // &apos; escapes apostrophe safely
        <strong>Dungeon Master&apos;s Guide</strong>,{" "}
        <strong>Monster Manual</strong>, and a handful of magical dice sets –
        all in one place.
      </p>

      <p>
        Browse our catalog or, if you&apos;re the shopkeeper for this lab,
        visit the admin panel to manage inventory.                // Informational paragraph
      </p>

      {/* Action buttons */}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/products">                                    {/* Navigate to product list */}
          <button className="button">Shop Products</button>      {/* Primary CTA */}
        </Link>

        <Link to="/admin">                                       {/* Navigate to admin page */}
          <button className="button secondary">Admin Panel</button>
        </Link>
      </div>
    </section>
  );
}
