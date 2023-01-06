import React, { useState, useEffect } from "react";
import { Card, Carousel } from 'react-bootstrap';
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Cards = () => {
  const [info, setInfo] = useState();

  
  const fetchHouses = async () => {
    try {
      const res = await fetch('/home');
      const data = await res.json();
      console.log(data)
      setInfo(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const loaded = () => {
    return info.map((house, idx) => (
      <div key={idx} className="landing-cards">
        <Link to={`/${house._id}`}>
          <Card style={{ width: "18rem" }}>
          <Carousel>
      {house.photos.map((photo,idx) => (
        <Carousel.Item interval={3.6e+6}>
          <img
        key={idx}
        src={photo}
      />
      </Carousel.Item>
      ))}
  </Carousel>
            <Card.Body>
              <Card.Title>{house.address}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Number of guests {house.numberOfGuests}
              </ListGroup.Item>
              <ListGroup.Item>{house.rate}</ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <FontAwesomeIcon icon="fa-solid fa-star" /> {house.stars}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Link>
      </div>
    ));
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
