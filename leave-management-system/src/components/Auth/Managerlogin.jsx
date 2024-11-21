// ManagerLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const [managerId, setManagerId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const staticManagerId = "54321"; // Static manager ID for validation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managerId === staticManagerId) {
      navigate("/manager-dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid Manager ID. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Manager Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="managerId">Enter Manager ID: </label>
          <input
            type="text"
            id="managerId"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            placeholder="Manager ID"
            style={{ padding: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default ManagerLogin;
