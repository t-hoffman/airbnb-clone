import React from "react";
import { useState, useEffect } from "react";

const Reviews = (props) => {
  
  return (
    <>
      <div className="w-50 mb-4 review-block" style={{paddingRight:'100px',fontSize:'13pt'}}>
        <div className="d-flex">
          <div className="review-img" style={{backgroundImage: `url(${props.photo})`}}></div>
          <div className="pl-3"><span className="cereal-header">{props.name}</span><br /><span style={{fontSize:'10pt'}}>{props.date}</span></div>
        </div>
        <div className="pt-3">
          <p>{props.comments} {props.idx}</p>
          <a href="#">Show more</a>
        </div>
      </div>
    </>
  )
}

export default Reviews