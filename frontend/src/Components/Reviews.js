import React, { useState, useEffect } from "react";


const Reviews = (props) => {
   
  return (
    <>
    <div>{props.name}</div>
    <img src={props.photo} />
    <div>{props.date}</div>
    <div>{props.comments}</div>
    </>
  )
}

export default Reviews