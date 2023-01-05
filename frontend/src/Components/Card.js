import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = () => {
  const [info, setInfo] = useState();

  const fetchHouses = async () => {
    try {
      const res = await fetch("");
      const data = await res.json();
      setInfo(data.info);
    } catch (error) {
      console.error(error);
    }
  };

  const loaded = () => {
    return info.map((house, idx) => (
      <div key={idx} className="landing-cards">
        <Link to={`/${id}`}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={house.photo[0]} />
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

export default Card;
