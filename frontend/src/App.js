import React from "react";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import { Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<ListingPage />} />
      </Routes>
    </>
  );
}
