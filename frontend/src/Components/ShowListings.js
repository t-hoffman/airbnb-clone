import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ShowListings = () => {
  const id = '63bca6b270a0a06f835bf5db';
  const [listings, setListings] = useState();

  const fetchData = async () => {
    const resp = await fetch(`/home/${id}`);
    const data = await resp.json();
    setListings(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const loaded = () => {
    const addSplit = listings.address.split(','),
          address = `${addSplit[0]}, ${addSplit[1]}`;

    return (
      <div className="abnb-list-container abnb-list-main-cont">
        <h2 className="listing-title">Success:</h2>
        <div className="d-flex">
          <div className="p-4">
            <div className="abnb-card">
              <Carousel indicators={false} 
                        interval={null} 
                        variant="dark" 
                        prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                        nextIcon={<FontAwesomeIcon icon={faAngleRight} />} 
              fade>
              {
                listings.photos.map((photo,pidx) => (
                  <Carousel.Item key={pidx}>
                    <Link to={`/${listings._id}`}><img src={photo} alt={address} /></Link>
                  </Carousel.Item>
                ))
              }
              </Carousel>
              
              <div className="pt-3 pb-5" style={{fontSize:'11pt'}}>
                <div className="d-flex">
                  <div className="w-100"><b>{address}</b></div>
                  <div style={{width:'60px'}}><i className="fa fa-star"></i> {listings.stars}</div>
                </div>
                <div style={{color:'#717171'}}>{listings.name}<br />Feb 19 - 24</div>
                <b>${parseInt(listings.rate).toLocaleString("en-US")}</b> night
              </div>
            </div>
          </div>
          <div className="ms-3 mt-4">
            What would you like to do?<br /><br />
            <a href={`/manage/edit/${listings._id}`}>Edit</a><br />
            <a href={`/${listings._id}`}>Go to listing</a><br />
            <a href={`/manage/delete/${listings.id}`}>Delete</a>
          </div>
        </div>
      </div>
    )
  }

  return listings ? loaded() : console.log(listings);
}

export default ShowListings
