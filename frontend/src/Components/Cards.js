import React, { useState, useEffect } from "react";
import { Card, Carousel } from 'react-bootstrap';
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Cards = () => {
  const [info, setInfo] = useState();

  
  const fetchHouses = async () => {
    try {
      const ran1 = Math.floor(Math.random() * (45 - 25) + 25);
      const ran2 = Math.floor(Math.random() * (15 - 1) + 1);
      const res = await fetch(`/home/limit/${ran1}/${ran2}`);
      const data = await res.json();
      console.log(data)
      setInfo(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const loaded = () => {
    return info.map((house, idx) => {
      const addSplit = house.address.split(',');
      const address = `${addSplit[0]}, ${addSplit[1]}`;
      const name = house.name.length > 37 ? house.name.slice(0, 37)+'...' : house.name;
      return (
        <div className="abnb-card">
          <Carousel indicators={false} interval={null}>
            {house.photos.map((photo,pidx) => (
              <Carousel.Item>
                <img src={photo} alt={address} />
            </Carousel.Item>
            ))}
          </Carousel>
          
          <div className="pt-3 pb-5">
            <div className="d-flex">
              <div className="w-100"><b>{address}</b></div>
              <div style={{width:'60px'}}><i className="fa fa-star"></i> {house.stars}</div>
            </div>
            <div style={{color:'#717171'}}>{name}<br />Feb 19 - 24</div>
            <b>${house.rate}</b> night
          </div>
        </div>
      )
      // <Card>
      //   <Carousel>
      //     {house.photos.map((photo,pidx) => (
      //       <Carousel.Item interval={3.6e+6}>
      //         <img src={photo} alt={house.address} />
      //     </Carousel.Item>
      //     ))}
      //   </Carousel>
      //   <Card.Body>
      //     <Card.Title>{house.address}</Card.Title>
      //   </Card.Body>
      //   <ListGroup className="list-group-flush">
      //     <ListGroup.Item>
      //       Number of guests {house.numberOfGuests}
      //     </ListGroup.Item>
      //     <ListGroup.Item>{house.rate}</ListGroup.Item>
      //   </ListGroup>
      //   <ListGroup>
      //     <ListGroup.Item>
      //       <i className="fa fa-star"></i> {house.stars}
      //     </ListGroup.Item>
      //   </ListGroup>
      // </Card>
    });
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const loading = () => {
    <div>Loading. . .</div>;
  };

  return info ? loaded() : loading();
};

export default Cards;
