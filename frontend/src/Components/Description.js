import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Description = (props) => {

 const { id } = useParams();
 
  const [listing, setListing] = useState();

  const getListing = async () => {
    try {
      const res = await fetch(`/${id}`);
      const fetchedListing = await res.json();
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
        <h1>{listing.name}</h1>
      </div>
    );
  };

  const loading = () => {
    <div>Loading. . .</div>;
  };

  return listing ? loaded() : loading();
};

export default Description;
