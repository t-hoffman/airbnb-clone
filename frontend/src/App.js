import React from "react";
import SearchBar from "Components/SearchBar";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import ManageListings from "Pages/ManageListings";
import Layout from "Layout/Layout";
import { Routes, Route } from "react-router-dom";
import './Assets/index.css'
import GoogleLogin from "Components/GoogleLogin";

export default function App() {

  return (
    <Layout>
      <GoogleLogin />
      <SearchBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<ListingPage />} />
        <Route path="/manage/*" element={<ManageListings />} />
      </Routes>
    </Layout>
  );
}
