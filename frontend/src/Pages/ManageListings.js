import React, { useEffect, useState } from 'react'
import ListingForm from 'Components/ListingForm';
import ShowListings from 'Components/ShowListings';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

const DeleteListing = () => {
  const { id } = useParams();
  
  const deleteById = async () => {
    try {
      const deletedListing = await fetch(`https://air-bnb-clone-backend.herokuapp.com/home/${id}`, { method: 'DELETE' });
      console.log(deletedListing)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    deleteById();
  }, []);

  return (
    <div className="abnb-list-container abnb-list-main-cont">
      <h2 className="listing-title mb-4">Successfully deleted listing</h2>
      <a href="/manage/">Click here</a> to manage listings
    </div>
  )
}

const ManageListings = () => {

  return (
  <Routes>
    <Route path="/" element={<ShowListings />} />
    <Route path="/add/" element={<ListingForm type="add" />} />
    <Route path="/edit/:id" element={<ListingForm type="edit" />} />
    <Route path="/delete/:id" element={<DeleteListing />} />
  </Routes>
  )
}

export default ManageListings
