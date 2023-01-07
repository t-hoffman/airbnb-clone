import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "Components/Title";
import Amenities from "Components/Amenities";
import Description from "Components/Description";
import CheckoutCard from "Components/CheckoutCard";
import Reviews from "Components/Reviews";

const ListingPage = () => {
    const { id } = useParams();
 
    const [listing, setListing] = useState(null);

    const getListing = async () => {
      try {
        const res = await fetch(`/home/${id}`);
        const fetchedListing = await res.json();
        setListing(fetchedListing);
        console.log()
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
          <h1>< Title name={listing.name} stars={listing.stars} review={listing.reviews.length} address={listing.address} /></h1>
          <br />
          <img src={listing.photos[0]} />
          <img src={listing.photos[1]} />
          <img src={listing.photos[2]} />
          <img src={listing.photos[3]} />
          <img src={listing.photos[4]} />
          <button>show all photos</button>
          <br />
          <h3>{listing.roomType} hosted by {listing.host.name}</h3>
           <img src={listing.host.photo} />
           <Amenities />
           <Description />
           <CheckoutCard price={listing.rate} stars={listing.stars} review={listing.reviews.length} />
            
        </div>
      );
    };
  
    const loading = () => {
      <div>Loading. . .</div>;
    };
  
    return listing ? loaded() : loading();
  };
  
 
export default ListingPage