import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cards from 'Components/Cards';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Search = ({ query }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}`);
    const json = await resp.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  const loaded = () => {
    console.log(data)
    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title mb-0">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="abnb-main-cont mt-5">
          <div className="main-list">
          {
            data.map((house, idx) => {
              const addSplit = house.address.split(','),
              address = `${addSplit[0]}, ${addSplit[1]}`,
              name = house.name.length > 37 ? house.name.slice(0, 37)+'...' : house.name,
              photos = house.photos.splice(0,20);
              return (
                <div className="abnb-card" key={idx}>
                  <Carousel indicators={false} 
                            interval={null} 
                            variant="dark" 
                            prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                            nextIcon={<FontAwesomeIcon icon={faAngleRight} />} 
                  fade>
                  {
                    photos.map((photo,pidx) => (
                      <Carousel.Item key={pidx}>
                        <Link to={`/listing/${house._id}`}><img src={photo} alt={address} /></Link>
                      </Carousel.Item>
                    ))
                  }
                  </Carousel>
                  
                  <div className="pt-3 pb-5">
                    <div className="d-flex">
                      <div className="w-100"><b>{address}</b></div>
                      <div style={{width:'60px'}}><i className="fa fa-star"></i> {house.stars}</div>
                    </div>
                    <div style={{color:'#717171'}}>{name}<br />Feb 19 - 24</div>
                    <b>${parseInt(house.rate).toLocaleString("en-US")}</b> night
                  </div>
                </div>
              )
            })
          }  
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
