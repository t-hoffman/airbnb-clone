import React from "react";
import { useState, useEffect } from "react";


const Description = (props) => {
 
  const [listing, setListing] = useState();

  const getListing = async () => {
    try {
      const res = await fetch('/public/descriptionData.json');
      const fetchedListing = await res.json();
      setListing(fetchedListing);
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
