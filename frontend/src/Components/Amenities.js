import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icons from 'react-icons/fa'

const Amenities = () => {
  return (
    <div className="amenities-container">
      <div>
        <Icons.FaCar /> Parking
      </div>
        <div>
          <Icons.FaMugHot /> Coffee
        </div>
        <div>
          <Icons.FaWifi /> Wifi
        </div>
        <div>
          <Icons.FaLock /> Alarm System
        </div>
        <div>
          <Icons.FaTrash /> Trash Services
        </div>
        <div>
          <Icons.FaBath /> Bath Tub & Shower
        </div>
        <div>
          <Icons.FaGamepad /> Video Games
        </div>
        <div>
          <Icons.FaBed /> California King Bed
        </div>
        <div>
          <Icons.FaSolarPanel /> Solar
        </div>
        <div>
          <Icons.FaGlassMartini /> Beverages
        </div>
    </div>
  );
};

export default Amenities;
