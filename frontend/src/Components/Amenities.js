import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icons from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Amenities = () => {
  return (
    <div className="amenities-container">
      <div>
        <Icons.FaCar /> Parking
      </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-mug-hot" /> Coffee
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-wifi" /> Wifi
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-lock" /> Alarm System
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-trash" /> Trash Services
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-bath" /> Bath Tub & Shower
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-gamepad" /> Video Games
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-bed-front" /> California King Bed
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-solar-panel" /> Solar
        </div>
        <div>
          <FontAwesomeIcon icon="fa-thin fa-martini-glass-citrus" /> Beverages
        </div>
    </div>
  );
};

export default Amenities;
