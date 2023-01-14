import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ShowListings = () => {
  const id = 1;
  const [listings, setListings] = useState();

  const fetchData = async () => {
    const resp = await fetch(`/api/home/user/${id}`);
    const data = await resp.json();
    setListings(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const loaded = () => {
    return (
      <div className="abnb-list-container abnb-list-main-cont">
        <h2 className="listing-title">Manage listings</h2>
        {
          listings.map((listing,idx) => {
            const addSplit = listing.address.split(','),
                  address = `${addSplit[0]}, ${addSplit[1]}`;
            
            return (
              <div className="d-flex" key={idx}>
                <div className="p-4">
                  <div className="abnb-card">
                    <Carousel indicators={false} 
                              interval={null} 
                              variant="dark" 
                              prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                              nextIcon={<FontAwesomeIcon icon={faAngleRight} />} 
                    fade>
                    {
                      listing.photos.map((photo,pidx) => (
                        <Carousel.Item key={pidx}>
                          <img src={photo} alt={address} />
                        </Carousel.Item>
                      ))
                    }
                    </Carousel>
                    
                    <div className="pt-3 pb-5" style={{fontSize:'11pt'}}>
                      <div className="d-flex">
                        <div className="w-100"><b>{address}</b></div>
                        <div style={{width:'60px'}}><i className="fa fa-star"></i> {listing.stars}</div>
                      </div>
                      <div style={{color:'#717171'}}>{listing.name}<br />Feb 19 - 24</div>
                      <b>${parseInt(listing.rate).toLocaleString("en-US")}</b> night
                    </div>
                  </div>
                </div>
                <div className="ms-3 mt-4">
                  What would you like to do?<br /><br />
                  <a href={`/manage/edit/${listing._id}`}>Edit</a><br />
                  <a href={`/listing/${listing._id}`}>Go to listing</a><br />
                  <a href={`/manage/delete/${listing._id}`}>Delete</a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return listings ? loaded() : <>Loading</>;
}

export default ShowListings
