import React, { useState } from "react";
import api from "../utils/axios";
import { toast } from "react-toastify";

const expiryOptions = {
  "Add expiration date": "",
  "1 minute": "1",
  "5 minutes": "5",
  "30 minutes": "30",
  "1 hour": "60",
  "5 hours": "300",
};

const URLForm = ({ onShorten }) => {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expiry) {
      setError("Please select an expiry date.");
      return;
    }
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    try {
      const response = await api.post("/shortlinks", {
        originalUrl: url,
        expiry,
      });
      onShorten(response.data);
      setUrl("");
      setExpiry("");
      toast.success("Added successfully");
    } catch (error) {
      console.error("Error shortening URL", error);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <p className="error">{error}</p>

        <div className="url-form">
          <input
            type="text"
            placeholder="Paste the URL to be shortened"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select value={expiry} onChange={(e) => setExpiry(e.target.value)}>
            {Object.entries(expiryOptions).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button className="btn" type="submit">
          Shorten URL
        </button>
      </form>
    </div>
  );
};

export default URLForm;
