import React, { useState, useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SkeletonCards from "./Skeleton";
import Skeleton from 'react-loading-skeleton'

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
    return info.map((house, idx) => (<Card house={house} data={props.data} key={idx} idx={idx} />))
  };

  const loading = () => {
    return <SkeletonCards num={50} skeleton={true} />;
  };

  useEffect(() => {
    props.type === 'search' ? setInfo(props.data) : fetchHouses();
  }, [props.data]);


  return info ? loaded() : loading();
};

const Card = ({ house, idx }) => {
  const [skeleton, setSkeleton] = useState(true)

  const addSplit = house.address.split(','),
        address = `${addSplit[0]}, ${addSplit[1]}`,
        name = house.name.length > 37 ? house.name.slice(0, 37)+'...' : house.name,
        photos = house.photos

  const showPhotos = photos.map((photo,pidx) => (
    <Carousel.Item key={pidx}>
      <Link to={`/listing/${house._id}`}>
        <img src={photo} 
              alt={house.address} 
              key={house._id+pidx} 
              loading="lazy"
        /></Link>
    </Carousel.Item>
  ))

  useEffect(() => {
    const time = (idx * 75) + 250
    const timer = setTimeout(() => {
      setSkeleton(false)
    }, time)

    return () => clearTimeout(timer)
  }, [])
  
  const showSkeleton = skeleton ? '' : 'd-none',
        showCard = skeleton ? 'd-none' : ''

  return (
    <div className="abnb-card pb-5">
      <Skeleton duration={2} height={285} width={300} className={showSkeleton} />
      <Carousel indicators={false} 
                interval={null} 
                variant="dark" 
                prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                nextIcon={<FontAwesomeIcon icon={faAngleRight} />} 
                className={showCard}
                fade
      >
        {showPhotos}
      </Carousel>
      <div className={`pt-3 ${showSkeleton}`}>
        <Skeleton width={`100%`} height="25px" className="mt-2" />
        <Skeleton width={`60%`} height="25px" className="mt-3" />
        <Skeleton width={`35%`} height="25px" className="mt-3" />
      </div>
      <div className={showCard}>
        <div className="pt-3 d-flex">
          <div className={`w-100 ${showCard}`}><b>{address}</b></div>
          {house.stars ? <div style={{width:'60px'}}><i className="fa fa-star"></i> {house.stars}</div> : ''}
        </div>
        <div style={{color:'#717171'}} className={showCard}>
          <span style={{whiteSpace:'nowrap'}}>{name}</span><br />Feb 19 - 24</div>
        <b className={showCard}>${parseInt(house.rate).toLocaleString("en-US")}</b> night
      </div>
    </div>
  )
}

export default Cards;