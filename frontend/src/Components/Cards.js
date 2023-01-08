import React, { useState, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cards = () => {
  const [info, setInfo] = useState();

  
  const fetchHouses = async () => {
    try {
      const ran1 = Math.floor(Math.random() * (13 - 1 +1)) + 1;
      const res = await fetch(`/home/limit/50/${ran1}`);
      const data = await res.json();
      console.log(data)
      setInfo(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const loaded = () => {
    return info.map((house, idx) => {
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
                <Link to={`/${house._id}`}><img src={photo} alt={address} /></Link>
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
    });
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const loading = () => {
    return <h2>Loading. . .</h2>;
  };

  return info ? loaded() : loading();
};

export default Cards;
