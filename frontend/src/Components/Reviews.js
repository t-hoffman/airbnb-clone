import React from "react";
import { useState, useEffect } from "react";

const Reviews = ({ data }) => {console.log(data)
  return data.map((review, idx) => (
      <div className="d-inline-block align-top w-50" key={idx}>
        <div className="w-100 mb-5" style={{paddingRight:'100px',fontSize:'13pt'}}>
          <div className="d-flex">
            <div className="review-img" style={{backgroundImage: `url(${review.author.photo})`}}></div>
            <div className="pl-3"><span className="cereal-header">{review.author.name}</span><br /><span style={{fontSize:'10pt'}}>{review.date}</span></div>
          </div>
          <div className="pt-3">
            <div>{review.comments}</div>
            {/* <a href="#">Show more</a> */}
          </div>
        </div>
      </div>
  ))
}

export default Reviews