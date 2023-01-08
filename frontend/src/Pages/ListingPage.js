import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "Components/Title";
import Amenities from "Components/Amenities";
import Description from "Components/Description";
import CheckoutCard from "Components/CheckoutCard";
import Reviews from "Components/Reviews";
import Chart from "Components/Chart";
import ListingMap from "Components/ListingMap";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListingPage = () => {
    const { id } = useParams();
 
    const [listing, setListing] = useState(null);

    const getListing = async () => {
      try {
        const res = await fetch(`/home/${id}`);
        const fetchedListing = await res.json();
        setListing(fetchedListing);
        console.log()
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getListing();
    }, [id]);

    const loaded = () => {
      return (
        <div className="abnb-list-container">
          <div className="abnb-list-main-cont" style={{fontSize: '11pt'}}>
            <Title name={listing.name} stars={listing.stars} review={listing.reviews.length} address={listing.address} />
            <div className="list-photos">
              <div className="main-photo" style={{backgroundImage: `url(${listing.photos[0]})`}}></div>
              <div className="smaller-photos">
                <div className="d-flex h-50" style={{marginBottom:'3px'}}>
                  <div className="small-column" style={{backgroundImage: `url(${listing.photos[1]})`}}></div>
                  <div className="small-column" style={{backgroundImage: `url(${listing.photos[2]})`}}></div>
                </div>
                <div className="d-flex h-50">
                  <div className="small-column" style={{backgroundImage: `url(${listing.photos[3]})`}}></div>
                  <div className="small-column" style={{backgroundImage: `url(${listing.photos[4]})`}}>
                    <button className="more-photos"><i className="fas fa-grip-vertical"></i> &nbsp; Show all photos</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="abnb-list-main-cont">
            <div className="d-flex">
              <div className="list-info-left">
                <div className="list-info">
                  <div className="d-flex">
                    <div className="w-100">
                      <h1 className="listing-title">{listing.roomType} hosted by {listing.host.name}</h1>
                      8 guests &nbsp; · &nbsp;
                      4 bedrooms &nbsp; · &nbsp;
                      4 beds &nbsp; · &nbsp;
                      5 baths
                    </div>
                    <div>
                      <div className="host-img" style={{backgroundImage: `url(${listing.host.photo})`}}>
                        <div className="super-host-icon"><FontAwesomeIcon icon={faMedal} /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-info">
                  <div className="d-flex">
                    <div className="pr-4">
                      <FontAwesomeIcon icon={faMedal} style={{fontSize:'14pt'}} />
                    </div>
                    <div className="w-100">
                      <b>Fieldtrip is a Superhost
                      </b><br />
                      <span style={{fontSize:'10pt',color:'#717171'}}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                    </div>
                  </div>
                </div>
                <div className="list-info"><img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" width="125px" style={{marginBottom:'20px'}} /><br />
                  Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.<br /><br />
                  <a href="#">Learn more</a>
                </div>
                <Description />
                <div className="list-info">
                  <h1 className="listing-title">Where you’ll sleep</h1>
                  <div className="d-flex pt-3">
                    <div className="abnb-whitebox mr-4 w-100">
                      <div className="pt-4"><b>Bedroom 1</b></div>
                      <div className="pt-2" style={{fontSize:'11pt'}}>1 king bed</div>
                    </div>
                    <div className="abnb-whitebox mr-4 w-100">
                      <div className="pt-4"><b>Bedroom 2</b></div>
                      <div className="pt-2" style={{fontSize:'11pt'}}>1 king bed</div>
                    </div>
                    <div className="abnb-whitebox mr-4 w-100">
                      <div className="pt-4"><b>Bedroom 3</b></div>
                      <div className="pt-2" style={{fontSize:'11pt'}}>1 king bed</div>
                    </div>
                  </div>
                </div>
                <Amenities />
              </div>
              <div className="list-info-right">
                <CheckoutCard price={listing.rate} stars={listing.stars} review={listing.reviews.length} />
              </div>
            </div>
            <div className="list-info">
              <h1 className="listing-title"><i className="fa fa-star" style={{fontSize:'11pt',marginRight:'10px'}}></i>{listing.stars} · {listing.reviews.length} reviews</h1>
              <Chart ratings={listing.reviews} />
              <div className="d-block mt-5 w-100">
              {
                listing.reviews.map((review, idx) => (
                  <Reviews 
                    key={idx}
                    idx={idx}
                    name={review.author.name} 
                    photo={review.author.photo} 
                    date={review.date}
                    comments={review.comments}
                    ratings={review.ratings}
                  />
                ))
              }
              </div>
          </div>
          <ListingMap address={listing.address} />
          <div className="list-info">
            <div className="d-flex">
              <div style={{width:'55%'}}>
                <div className="d-flex">
                  <div className="host-img" style={{backgroundImage: `url(${listing.host.photo})`}}>
                    <div className="super-host-icon"><FontAwesomeIcon icon={faMedal} /></div>
                  </div>
                  <div className="d-flex flex-column justify-content-center pl-3">
                    <div className="listing-title">Hosted by {listing.host.name}</div>
                    <div className="mt-2" style={{fontSize:'10pt',color:'#717171'}}>Joined in March 2016</div>
                  </div>
                </div>
                <div className="d-flex pt-4">
                  <i className="fa fa-star"></i>
                  &nbsp; 1,552 Reviews &nbsp; &nbsp; &nbsp;
                  <i className="fa fa-shield"></i>
                  &nbsp; Identity verified &nbsp; &nbsp; &nbsp;
                  <FontAwesomeIcon icon={faMedal} />
                  &nbsp; Superhost
                </div>
                <div className="pt-4">
                  <p>Fieldtrip (@stayfieldtrip) is a boutique hospitality brand elevating the short term rental experience. We design, develop, curate, and professionally operate a portfolio of design- ... <a href="#">read more</a></p>
                </div>
              </div>
              <div className="pl-5" style={{width:'30%'}}>
                <p>Language: English</p>
                <p>Response rate: 100%</p>
                <p className="pt-2">Response time: within an hour</p>
                <p className="pt-2">
                  <button className="abnb-button">Contact Host</button>
                </p>
                <div className="d-flex pt-3">
                  <div className="d-flex align-items-center pr-3"></div>
                  <div style={{fontSize:'10pt'}}>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    };
  
    const loading = () => {
      <div>Loading. . .</div>;
    };
  
    return listing ? loaded() : loading();
  };
  
 
export default ListingPage