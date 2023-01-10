import React, { useState } from 'react'
import AddForm from 'Components/AddForm';
import ShowListings from 'Components/ShowListings';
import { Route, Routes } from 'react-router-dom';

const AddListing = () => {
  return (
  <Routes>
    <Route path="/add/" element={<AddForm />} />
    <Route path="/" element={<ShowListings />} />
  </Routes>
  )
}

export default AddListing
