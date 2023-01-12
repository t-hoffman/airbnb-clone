import React, { useState } from "react";
import * as Icons from 'react-icons/fa'
import {FiShare} from 'react-icons/fi'
import ListingPhotos from "./ListingPhotos";

const Title = (props) => {
  const { listing } = props,
        { name, stars, address } = props.listing,
                         reviews = props.listing.reviews.length;

  const [sendShow, setSendShow] = useState(false);
  const handleClick = () => { setSendShow(!sendShow) }

  return (
    <>
      <div className="d-flex">
        <div className="w-100" style={{fontSize:'12pt'}}>
          <h1 className="listing-title" style={{fontSize:'20pt'}}>{name}</h1>
          <Icons.FaStar size={16} /> &nbsp; <b>{stars} &nbsp; · &nbsp;</b> 
          {reviews ? <><a href="#reviews">{reviews} reviews</a> &nbsp; &nbsp;</> : ''}
          <a href="#where">{address}</a>
        </div>
        <div className="text-right"><FiShare /> &nbsp; <a href="#">Share</a> &nbsp; &nbsp;</div>
        <div className="text-right" style={{width:'100px'}}><Icons.FaRegHeart/> &nbsp; <a href="#">Save</a></div>
      </div>
      <div className="list-photos" onClick={handleClick}>
        <div className="main-photo" style={{backgroundImage: `url(${listing.photos[0]})`}}></div>
        <div className="smaller-photos">
          <div className="d-flex h-50" style={{marginBottom:'3px'}}>
            <div className="small-column" style={{backgroundImage: `url(${listing.photos[1]})`}}></div>
            <div className="small-column" style={{backgroundImage: `url(${listing.photos[2]})`}}></div>
          </div>
          <div className="d-flex h-50">
            <div className="small-column" style={{backgroundImage: `url(${listing.photos[3]})`}}></div>
            <div className="small-column" style={{backgroundImage: `url(${listing.photos[4]})`}}>
              <ListingPhotos photos={listing.photos} sendShow={sendShow} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;