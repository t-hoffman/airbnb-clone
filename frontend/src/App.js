import React, { useState } from "react";
import SearchBar from "Components/SearchBar";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import ManageListings from "Pages/ManageListings";
import Search from "Pages/Search";
import Layout from "Layout/Layout";
import { Routes, Route } from "react-router-dom";
import "./Assets/index.css";
import GoogleLogin from "Components/GoogleLogin";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/manage/*" element={<ManageListings />} />
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}
