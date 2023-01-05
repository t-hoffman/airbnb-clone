import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Reviews = () => {
    const [review, setReview] = useState();


    const fetchReview = async () => {
        try {
          const res = await fetch('../practiceData.json');
          const data = await res.json();
          console.log(data)
          setInfo(data);
          
        } catch (error) {
          console.error(error);
        }
      };



  return (
    <div>Reviews</div>
  )
}

export default Reviews