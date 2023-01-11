import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useParams } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Link } from 'react-router-dom';

const Search = (props) => {
  const { query, page } = useParams();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const pageNum = page ? page : 1;

  const countTotal = async () => {
    const check = await fetch(`/home/location/${query}`);
    const checkJson = await check.json();
    const totalCount = checkJson.length;
    
    setTotal(totalCount);
  }
  const [multipleMarkers, setMutipleMarkers] = useState(null)

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=3&page=${pageNum}`);
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
    setData(null);
    fetchData();
    countTotal();
  }, [query]);

  useEffect(() => {
    getMarkers()
  }, [data]);

  const loaded = () => {

    const pageCount = Math.floor(total/3);
    console.log(pageCount);
    const pageArr = new Array(pageCount).fill('');
    const pageList = pageArr.map((i,idx) => { return <a href={`/search/${query}/${idx+1}`}>{idx+1}</a>  });

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
            Pages | {pageList}
          </div>
        </div>
      </div>
    )
  }

  if (data && data.length > 0) {
    return loaded();
  } else if (data && data.length === 0) {
    return (
      <div className="abnb-list-main-cont text-align-center">
        <h1 className="listing-title">Sorry, there are no results.  Please try again.</h1>
      </div>
    )
  } else {
    return (
      <div className="abnb-list-main-cont text-align-center">
        <h1 className="listing-title">Loading ...</h1>
      </div>
    )
  }
}

export default Search
