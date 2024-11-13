import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import URLForm from "./components/URLForm";
import ShortenedURL from "./components/ShortenedURL";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import logo from "./images/logo.svg";
import api from "./utils/axios";

const App = () => {
  const [urls, setUrls] = useState([]);

  const onDelete = async (shortCode) => {
    try {
      await api.delete(`/shortlinks/${shortCode}`);
      toast.error("Link deleted successfully.");
      fetchShortLinks();
    } catch (error) {
      console.error("Error fetching shortlinks:", error);
    }
  };

  const fetchShortLinks = async () => {
    try {
      const response = await api.get("/shortlinks");
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching shortlinks:", error);
    }
  };
  useEffect(() => {
    fetchShortLinks();
  }, []);

  const handleShorten = (newUrl) => {
    fetchShortLinks();
  };

  return (
    <div className="app">
      <ToastContainer />

      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <h2 className="url-list-title">My shortened URLs</h2>
        <ShortenedURL urls={urls} onDelete={onDelete} />
      </aside>
      <main className="main-content">
        <h2 className="form-title">URL Shortener</h2>
        <URLForm onShorten={handleShorten} />
      </main>
    </div>
  );
};

export default App;
