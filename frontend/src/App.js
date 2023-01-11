import React, { useState } from "react";
import SearchBar from "Components/SearchBar";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import ManageListings from "Pages/ManageListings";
import Search from "Pages/Search";
import Layout from "Layout/Layout";
import { Routes, Route } from "react-router-dom";
import './Assets/index.css'
import GoogleLogin from "Components/GoogleLogin";

export default function App() {
  const [query, setQuery] = useState();
  
  return (
    <Layout>
      <SearchBar onSearch={setQuery} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/search" element={<Search query={query} />} />
        <Route path="/manage/*" element={<ManageListings />} />
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}
