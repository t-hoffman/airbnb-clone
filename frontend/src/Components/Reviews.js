import React from "react";


const Reviews = (props) => {

  return (
    <>
      <div>{props.name}</div>  
      <div>{props.photo}</div>  
      <div>{props.date}</div>  
      <div>{props.comments}</div>
    </>
  )
}

export default Reviews