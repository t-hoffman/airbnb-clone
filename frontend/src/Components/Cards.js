import React, { useState, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cards = (props) => {
  const [info, setInfo] = useState();

  const fetchHouses = async () => {
    try {
      const rand = [Math.floor(Math.random() * (18 - 1 +1)) + 1, 17];
      const skewed = rand[Math.floor(Math.random() * (1 - 0 +1))];
      const random = props.omg ? 17 : Math.floor(Math.random() * (18 - 1 +1)) + 1;
      const res = await fetch(`/api/home/limit?limit=50&page=${random}`);
      const data = await res.json();

      setInfo(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const loaded = () => {
    return info.map((house, idx) => {
      return <Card house={house} data={props.data} key={idx} />
    });
  };

  useEffect(() => {
    props.data ? setInfo(props.data) : fetchHouses();
  }, [props.data]);

  const loading = () => {
    return <h2>Loading. . .</h2>;
  };

  return info ? loaded() : loading();
};

const Card = ({ house, data }) => {
  const [loaded, setLoaded] = useState(false);

  const addSplit = house.address.split(','),
        address = `${addSplit[0]}, ${addSplit[1]}`,
        name = house.name.length > 37 ? house.name.slice(0, 37)+'...' : house.name,
        photos = house.photos,
        searchStyle = data ? {width: '23%', marginRight: '25px'} : {};

  const onLoadImage = (idx) => {
    // idx === photos.length-1 && setLoaded(true)
    idx === 4 && setLoaded(true);
  }

  const showPhotos = photos.map((photo,pidx) => {
    return (
      <Carousel.Item key={pidx}>
        <Link to={`/listing/${house._id}`}>
          <img src={photo} 
               alt={house.address} 
               key={house._id+pidx} 
               onLoad={() => onLoadImage(pidx)}
               onError={() => onLoadImage(pidx)}
          /></Link>
      </Carousel.Item>
    )
  })
  
  const cardDisplay = loaded ? {display:'block'} : {display:'none'};
  const loadingDisplay = loaded ? {display:'none'} : {display:'block'};
  console.log('x')
  return (
    <div className="abnb-card" style={searchStyle}>   
      <div style={cardDisplay}>
        <Carousel indicators={false} 
                  interval={null} 
                  variant="dark" 
                  prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                  nextIcon={<FontAwesomeIcon icon={faAngleRight} />} 
        fade>
        {showPhotos}
        </Carousel>
        <div className="pt-3 pb-5">
          <div className="d-flex">
            <div className="w-100"><b>{address}</b></div>
            {house.stars ? <div style={{width:'60px'}}><i className="fa fa-star"></i> {house.stars}</div> : ''}
          </div>
          <div style={{color:'#717171'}}>{name}<br />Feb 19 - 24</div>
          <b>${parseInt(house.rate).toLocaleString("en-US")}</b> night
        </div>
      </div>
      {!loaded && <Loading style={loadingDisplay} />}
    </div>
  )
}

const Loading = ({ style }) => {
  return (
    <>
      <div className="loading-car-cont"></div>
      <div className="pt-3 pb-5">
        <div className="loading-bar mt-2">&nbsp;</div>
        <div className="loading-bar mt-2" style={{width:'60%'}}></div>
        <div className="loading-bar mt-2" style={{width:'35%'}}></div>
      </div>  
    </>
  )
}

export default Cards;