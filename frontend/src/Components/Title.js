import React from "react";
import * as Icons from 'react-icons/fa'
import {FiShare} from 'react-icons/fi'

//Title of listing page (under header)

const Title = (props) => {

    return (
      <div className="d-flex">
        <div className="w-100">
          <h1 className="listing-title mt-4">{props.name}</h1>
          <Icons.FaStar size={16} /> &nbsp; <b>{props.stars} &nbsp; · &nbsp;</b> 
          <a href="#">{props.review} reviews</a> &nbsp; &nbsp; 
          <a href="">{props.address}</a>
        </div>
        <div className="text-right pt-5"><FiShare /> &nbsp; <a href="">Share</a> &nbsp; &nbsp;</div>
        <div className="text-right pt-5" style={{width:'100px'}}><Icons.FaRegHeart/> &nbsp; <a href="">Save</a></div>
      </div>
    );
  };



export default Title;
