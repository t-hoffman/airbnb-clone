import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "Components/Title";


const ListingPage = () => {
    const { id } = useParams();
 
    const [listing, setListing] = useState(null);
  
    const getListing = async () => {
      try {
        const res = await fetch(`/home/${id}`);
        const fetchedListing = await res.json();
        console.log(fetchedListing)
        setListing(fetchedListing);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getListing();
    }, [id]);
  
    const loaded = () => {
      return (
        <div>
          <h1>< Title name={listing.name}/></h1>

        </div>
      );
    };
  
    const loading = () => {
      <div>Loading. . .</div>;
    };
  
    return listing ? loaded() : loading();
  };
  
 
export default ListingPage