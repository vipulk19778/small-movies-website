import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div style={{ display: "flex", padding: "0.5" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#3f51b5" }}>
        <h1>Movies App</h1>
      </Link>

      <Link
        to="/favourites"
        style={{ textDecoration: "none", color: "#3f51b5" }}
      >
        <h2 style={{ marginLeft: "2rem", marginTop: "1rem" }}>Favourites</h2>
      </Link>
    </div>
  );
};
