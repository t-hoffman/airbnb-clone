import React from "react";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import ManageListings from "Pages/ManageListings";
import Search from "Pages/Search";
import Layout from "Layout/Layout";
import NotFound from "Components/NotFound";
import { Routes, Route } from "react-router-dom";
import "./CSS/index.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/omg/" element={<LandingPage omg={true} />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/search/:query/:page" element={<Search />} />
        <Route path="/manage/*" element={<ManageListings />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
