import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useNavigate, useParams } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Link } from 'react-router-dom';

const Search = (props) => {
  const { query, page } = useParams();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const pageNum = page ? page : 1;
  const pageLimit = 16;
  const navigate = useNavigate();

  const countTotal = async () => {
    const check = await fetch(`/home/location/${query}`);
    const checkJson = await check.json();
    const totalCount = checkJson.length;
    
    setTotal(totalCount);
  }
  const [multipleMarkers, setMutipleMarkers] = useState(null)

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=${pageLimit}&page=${pageNum}`);
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
    countTotal();
    getMarkers();
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const loaded = () => {

    const pageCount = Math.ceil(total/pageLimit);
    console.log('total',total,pageCount);
    const pageArr = new Array(pageCount).fill('');
    const pageList = pageArr.map((i,idx) => { 
      return (
        <>
          <a onClick={() => {navigate(`/search/${query}/${idx+1}`)}} key={idx} style={{cursor:'pointer'}}>{idx+1}</a> 
          {
            idx !== pageArr.length-1 && <>&nbsp; | &nbsp;</>
          }
        </>
      )
    });

    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="abnb-main-cont mt-5">
          <div className="main-list">
            <Cards data={data} /> 
          </div>
          <div className="text-center mt-3 pt-4" style={{borderTop:'1px solid #efefef'}}>
            Pages: &nbsp; &nbsp; {pageList}
          </div>
          <div className="mt-5">
            <MapContainer center={data ? [data[0].location.lat, data[0].location.long] : ''} zoom={10} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {multipleMarkers}

            </MapContainer>
          </div>
        </div>
      </div>
    )
  }

  if (data && data.length > 0 && total) {
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
