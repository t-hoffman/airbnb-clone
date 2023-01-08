import React from "react";
import { useState, useEffect } from "react";

const Reviews = (props) => {
  
  return (
    <div className="d-inline-block align-top w-50">
      <div className="w-100 mb-5" style={{paddingRight:'100px',fontSize:'13pt'}}>
        <div className="d-flex">
          <div className="review-img" style={{backgroundImage: `url(${props.photo})`}}></div>
          <div className="pl-3"><span className="cereal-header">{props.name}</span><br /><span style={{fontSize:'10pt'}}>{props.date}</span></div>
        </div>
        <div className="pt-3">
          <p>{props.comments}</p>
          {/* <a href="#">Show more</a> */}
        </div>
      </div>
    </div>
  )
}

export default Reviews