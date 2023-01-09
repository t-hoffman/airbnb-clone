import React from 'react'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";


const ListingMap = (props) => {
  return (
    <div className="list-info">
      <h1 className="listing-title">Where you’ll be</h1>
      <p></p>
      {props.address}
      <p>&nbsp;</p>
      <img src="./map.png" className="w-100" />
    </div>
  )
}

export default ListingMap