import React from "react";
import { useState, useEffect } from "react";


const Description = () => {
 
  const [listing, setListing] = useState();

  const randomIndex = () => {
   return Math.floor(Math.random() * 16)
  }

  const getListing = async () => {
    try {
      const res = await fetch('../descriptionData.json');
      const fetchedListing = await res.json();
      setListing(fetchedListing[randomIndex()]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>{listing.description}</h1>
      </div>
    );
  };

  const loading = () => {
    <div>Loading. . .</div>;
  };

  return listing ? loaded() : loading();
};

export default Description;
