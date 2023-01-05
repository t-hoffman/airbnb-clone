import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const Cards = () => {
  const [info, setInfo] = useState();



  const fetchHouses = async () => {
    try {
      const res = await fetch('../practiceData.json');
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
        <Link to={`/${house.name}`}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={house.photos[0]} />
            <Card.Body>
              <Card.Title>{house.address}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Number of guests {house.numberOfGuests}</ListGroup.Item>
              <ListGroup.Item>{house.rate}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Link>
      </div>
    ));
  };

  useEffect(() => {
    fetchHouses()
  },[])

  const loading = () => {
    <div>Loading. . .</div>
  }

  return info ? loaded() : loading()
};

export default Cards;
