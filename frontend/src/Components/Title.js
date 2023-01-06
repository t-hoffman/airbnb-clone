import React from "react";

//Title of listing page (under header)

const Title = (props) => {

    return (
      <div className="container">
        <h1>{props.name}</h1>
        <span>
         
        </span>
        <span>{}</span>
        <span>{}</span>
      </div>
    );
  };



export default Title;
