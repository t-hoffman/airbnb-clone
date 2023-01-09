
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './ListingMap.css'

const ListingMap = (props) => {
  const coordinates =[ props.lat, props.long ]
  console.log(coordinates)
console.log(props)
  return (
    <div className="list-info">
      <h2 className="listing-title">Location</h2>
      <div className="mb-4 mt-3" style={{fontSize:'13pt'}}>{props.address}</div>
   <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker  position={coordinates} >
    <Popup>
      Exact location provided after booking
    </Popup>
  </Marker>
</MapContainer>
</div>
  )
}

export default ListingMap