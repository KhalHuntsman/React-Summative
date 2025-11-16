import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h2 className="page-title">Welcome to D&D Core Shop</h2>
      <p>
        Stock up on the essentials for your next campaign. Grab the{" "}
        <strong>Player&apos;s Handbook</strong>,{" "}
        <strong>Dungeon Master&apos;s Guide</strong>,{" "}
        <strong>Monster Manual</strong>, and a handful of magical dice sets –
        all in one place.
      </p>
      <p>
        Browse our catalog or, if you&apos;re the shopkeeper for this lab,
        visit the admin panel to manage inventory.
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/products">
          <button className="button">Shop Products</button>
        </Link>
        <Link to="/admin">
          <button className="button secondary">Admin Panel</button>
        </Link>
      </div>
    </section>
  );
}
