import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom';


const Markers = (props) => {
  const { data } = props;
  const map = useMap();

  useEffect(() => {
    if (data) {
      const location = [data[0].location.lat, data[0].location.long];
      map.setView(location, map.getZoom());
    }
  }, [data]);

  if (data) {
    const allMarkers = data.map((home, idx) => {
      console.log(home)
      if (idx < 16) {
        let coordinates = [home.location.lat, home.location.long];
        return (
          <Marker position={coordinates} key={idx}>
            <Popup>
              <Link to={`/listing/${home._id}`}><img style={{ width: '100%' }} src={home.photos[0]} key={idx} /></Link><br />
              <h6>{home.name}</h6>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 'auto' }} >
                  <div style={{ width: '60px' }}><i className="fa fa-star"></i> {home.stars}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span>${home.rate}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      }
    })

    return allMarkers;
  }
}

const Search = (props) => {
  const { query, page } = useParams();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const pageNum = page ? page : 1,
        pageLimit = 16,
        navigate = useNavigate();

  const countTotal = async () => {
    const check = await fetch(`/home/location/${query}`),
          checkJson = await check.json(),
          totalCount = checkJson.length;

    setTotal(totalCount);
  }

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=${pageLimit}&page=${pageNum}`);
    const json = await resp.json();
    setData(json);
  }

  useEffect(() => {
    countTotal();
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [pageNum, query]);
  
  const loaded = () => {
    const pageCount = Math.ceil(total/pageLimit);
    const pageArr = new Array(pageCount).fill('');
    const pageList = pageArr.map((i,idx) => { 
      return (
        <span key={idx}>
          <a onClick={() => {navigate(`/search/${query}/${idx+1}`)}} style={{cursor:'pointer'}}>{idx+1}</a> 
          {
            idx !== pageArr.length-1 && <>&nbsp; | &nbsp;</>
          }
        </span>
      )
    });
    const location = data ? [data[0].location.lat, data[0].location.long] : '';
    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="d-flex w-100 justify-content-center mt-5">
          <div className="map-container">
            <MapContainer center={location} zoom={10} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markers data={data} />
            </MapContainer>
          </div>
        </div>
        <div className="abnb-main-cont mt-5">
          <div className="text-center mb-3 pb-4" style={{borderBottom:'1px solid #efefef'}}>
            Pages: &nbsp; &nbsp; {pageList}
          </div>
          <div className="main-list mt-5">
            <Cards data={data} /> 
          </div>
          <div className="text-center mt-3 pt-4" style={{borderTop:'1px solid #efefef'}}>
            Pages: &nbsp; &nbsp; {pageList}
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
