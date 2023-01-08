import React from "react";
import * as Icons from 'react-icons/fa'
import {FiShare} from 'react-icons/fi'

//Title of listing page (under header)

const Title = (props) => {

    return (
      <div className="container">
        <h1>{props.name}</h1>
        <div><Icons.FaStar size={20} />{props.stars}</div>
        <div>{props.review}reviews</div>
        <div>{props.address}</div>
        <div><FiShare /> Share</div>
        <div><Icons.FaRegHeart/> Save</div>
      </div>
    );
  };



export default Title;
