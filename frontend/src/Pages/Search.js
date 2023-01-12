import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom';

const Markers = (props) => {
  const { data } = props;
  const map = useMap();

  useEffect((e) => {
    if (data) {
      const location = [];
      data.map(home => {
        const lat = home.location.lat, long = home.location.long, latlng = [lat, long];
        (lat && long) && location.push(latlng)
      });
      const mapLoc = location.length > 0 ? location[0] : [0,0];
      map.setView(mapLoc, map.getZoom());
      location.length > 0 && map.fitBounds(location)
    }
  }, [data]);

  if (data) {
    const allMarkers = data.map((home, idx) => {

      if (idx < 16) {
        let lat = home.location.lat ? home.location.lat : 1,
            long = home.location.long ? home.location.long : 1,
            coordinates = [lat, long];
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
          checkJson = await check.json();

    setTotal(checkJson.length);
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
    const pageList = pageArr.map((i,idx) => (
      <span key={idx}>
        {
          pageNum == idx+1 ? idx+1 : <a onClick={() => {navigate(`/search/${query}/${idx+1}`); window.scrollTo({top: 100, bottom: 0, behavior: 'smooth'})}} style={{cursor:'pointer'}}>{idx+1}</a>
        }
        {
          idx !== pageArr.length-1 && <>&nbsp; | &nbsp;</>
        }
      </span>
    ));
    const lat = data[0].location.lat ? data[0].location.lat : 1,
          long = data[0].location.long ? data[0].location.long : 1,
          location = data ? [lat, long] : '';
    return (
      <div className="abnb-list-main-cont">
        <div className="search-results">
          <h1 className="listing-title">Search results</h1>
          <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        </div>
        <div className="d-flex w-100 justify-content-center mt-5 search-map-cont-wrapper">
          <div className="search-map-container">
            <MapContainer center={location} zoom={10} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markers data={data} />
            </MapContainer>
          </div>
        </div>
        <div className="abnb-main-cont mt-5" id="results">
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
