import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icons from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Amenities = () => {
  return (
    <div className="list-info">
      <h1 className="listing-title">What this place offers</h1>
      <p className="pt-3"></p>
      <div className="d-flex">
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Mountain view</span>
        </div>
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Park view</span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Kitchen</span>
        </div>
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Wifi</span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Free parking on premises</span>
        </div>
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Private indoor pool - available all year, open 24 hours, heated</span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Pets allowed</span>
        </div>
        <div className="w-50 d-flex p-2">
          <span className="pl-3">TV with standard cable</span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Washer</span>
        </div>
        <div className="w-50 d-flex p-2">
          <span className="pl-3">Security cameras on property</span>
        </div>
      </div>
      <p>&nbsp;</p>
      <button className="abnb-button">Show all 39 amenities</button>
    </div>
  );
};

export default Amenities;
