
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './ListingMap.css'

const ListingMap = (props) => {
  const coordinates =[ props.lat, props.long ]
  console.log(coordinates)

  return (
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
  )
}

export default ListingMap