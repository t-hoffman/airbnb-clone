import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "Components/Title";
import Amenities from "Components/Amenities";
import Description from "Components/Description";
import CheckoutCard from "Components/CheckoutCard";
import Reviews from "Components/Reviews";
import Chart from "Components/Chart";
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
        <div className="abnb-list-container">
          <div className="abnb-list-main-cont" style={{fontSize: '11pt',paddingRight:'40px'}}>
          <Title name={listing.name} stars={listing.stars} review={listing.reviews.length} address={listing.address} />
          <div className="list-photos">
            <div className="main-photo" style={{backgroundImage: `url(${listing.photos[0]})`}}></div>
            <div className="smaller-photos">
              <div className="d-flex h-50" style={{marginBottom:'3px'}}>
                <div className="small-column" style={{backgroundImage: `url(${listing.photos[1]})`}}></div>
                <div className="small-column" style={{backgroundImage: `url(${listing.photos[2]})`}}></div>
              </div>
              <div className="d-flex h-50">
                <div className="small-column" style={{backgroundImage: `url(${listing.photos[3]})`}}></div>
                <div className="small-column" style={{backgroundImage: `url(${listing.photos[4]})`}}>
                  <button className="more-photos"><i className="fas fa-grip-vertical"></i> &nbsp; Show all photos</button>
                </div>
              </div>
            </div>
          </div>
          <h3>{listing.roomType} hosted by {listing.host.name}</h3>
           <img src={listing.host.photo} />
           <Amenities />
           <Description />
           <CheckoutCard price={listing.rate} stars={listing.stars} review={listing.reviews.length} /> 
           {listing.reviews.map((review, idx) => (
            <Reviews key={idx}
            name={review.author.name} 
            photo={review.author.photo} 
            date={review.date}
            comments={review.comments}
            ratings={review.ratings}
            />
           ))}

          <Chart ratings={listing.reviews} />
          </div>
        </div>
      );
    };
  
    const loading = () => {
      <div>Loading. . .</div>;
    };
  
    return listing ? loaded() : loading();
  };
  
 
export default ListingPage