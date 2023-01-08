import React from 'react'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";


const ListingMap = (props) => {
  return (
    <div class="list-info">
      <h1 class="listing-title">Where you’ll be</h1>
      <p></p>
      {props.address}
      <p>&nbsp;</p>
      <img src="./map.png" class="w-100" />
    </div>
  )
}

export default ListingMap