import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useParams } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Link } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [multipleMarkers, setMutipleMarkers] = useState(null)

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=50`);
    const json = await resp.json();
    setData(json);
  }

  const getMarkers = () => {
    if (data) {
      const allMarkers = data.map((home, idx) => {
        if (idx < 20) {
          let coordinates = [home.location.lat, home.location.long];
          return (<Marker key={idx} position={coordinates} >
            <Popup><Link to={`/listing/${home._id}`}><img style={{ width: '100%' }} src={home.photos[0]} /></Link>
              <br />
              {home.name}</Popup>
          </Marker>)

        }
      })
      setMutipleMarkers(allMarkers)
    }
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    getMarkers()
  }, [data]);

  const loaded = () => {
    console.log(data)
    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="abnb-main-cont mt-5">
          <div className="main-list">
            <Cards data={data} /> 
            <MapContainer center={data ? [data[0].location.lat, data[0].location.long] : ''} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {multipleMarkers}

          </MapContainer>
          </div>
          <div className="text-center mt-3">
            Pages | 1 2 3 4
          </div>
        </div>
      </div>
    )
  }

  if (data) {
    return loaded();
  } else if (data && data.length === 0) {
    return <h1 className="listing-title">No results</h1>
  } else {
    return <h1 className="listing-title">Loading ...</h1>
  }
}

export default Search
