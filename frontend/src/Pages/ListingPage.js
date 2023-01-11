import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "Components/Title";
import Amenities from "Components/Amenities";
import Description from "Components/Description";
import CheckoutCard from "Components/CheckoutCard";
import Reviews from "Components/Reviews";
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
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getListing();
    }, [id]);
  
      
    const loaded = () => {
      const bedrooms = Math.floor((Math.random() * (6 - 1 +1))+1),
            whereSleep = new Array(bedrooms).fill(''),
            hostMedal = listing.host.isSuperHost ? 'block' : 'none';
      
      return (
      <>
        <div className="abnb-list-main-cont" style={{fontSize: '11pt'}}>
          <Title listing={listing} />
        </div>
        <div className="abnb-list-main-cont">
          <div className="d-flex">
            <div className="list-info-left">
              <div className="list-info">
                <div className="d-flex">
                  <div className="w-100">
                    <h1 className="listing-title">{listing.roomType} hosted by {listing.host.name}</h1>
                    {Math.floor((Math.random() * (10 - 1 +1))+1)} guests &nbsp; · &nbsp;
                    {bedrooms} bedrooms &nbsp; · &nbsp;
                    {Math.floor((Math.random() * (6 - 1 +1))+1)} beds &nbsp; · &nbsp;
                    {Math.floor((Math.random() * (6 - 1 +1))+1)} baths
                  </div>
                  <div>
                    <div className="host-img" style={{backgroundImage: `url(${listing.host.photo})`}}>
                    {
                      listing.host.isSuperHost ? 
                      <div className="super-host-icon"><svg viewBox="0 0 14 24" role="presentation" aria-hidden="true" focusable="false" style={{height:'24px',width:'24px',display:'block',fill:'currentcolor'}}><path d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823" fill="#fff"></path><path d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z" fill="#ffb400"></path><path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f"></path><path d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z" fill="#484848"></path></svg></div> : ''
                    }
                    </div>
                  </div>
                </div>
              </div>
              {
                listing.host.isSuperHost ? (
                  <div className="list-info">
                    <div className="d-flex">
                      <div className="pr-4">
                        <FontAwesomeIcon icon={faMedal} style={{fontSize:'14pt',display:{hostMedal}}} />
                      </div>
                      <div className="w-100">
                        <b>Fieldtrip is a Superhost
                        </b><br />
                        <span style={{fontSize:'10pt',color:'#717171'}}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                      </div>
                    </div>
                  </div>
                ) : ''
              }
              <div className="list-info"><img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" width="125px" style={{marginBottom:'20px'}} /><br />
                Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.<br /><br />
                <a href="#">Learn more</a>
              </div>
              <Description />
              <div className="list-info">
                <h1 className="listing-title">Where you’ll sleep</h1>
                <div className="d-block pt-3 w-100">
                  {
                    whereSleep.map((i,idx) => (
                      <div className="abnb-whitebox d-inline-block mr-3 mb-3" style={{width:'30%'}} key={idx}>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',height:'24px',width:'24px',fill:'currentcolor'}}><path d="M28 2a2 2 0 0 1 1.995 1.85L30 4l-.001 9.836 1.847 5.54a3 3 0 0 1 .115.468l.03.24.009.24V30h-2v-2H2v2H0v-9.675a3 3 0 0 1 .087-.717l.067-.232 1.845-5.537L2 4a2 2 0 0 1 1.697-1.977l.154-.018L4 2zm1.999 20H2l-.001 3.999h28zm-1.387-6H3.387l-1.333 4h27.891zM28 4H4l-.001 10H6v-4a2 2 0 0 1 1.85-1.995L8 8h16a2 2 0 0 1 1.995 1.85L26 10v4h1.999zm-13 6H8v4h7zm9 0h-7v4h7z"></path></svg>
                        <div className="pt-4"><b>Bedroom {idx+1}</b></div>
                        <div className="pt-2" style={{fontSize:'11pt'}}>1 king bed</div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <Amenities />
            </div>
            <div className="list-info-right">
              <CheckoutCard price={listing.rate} stars={listing.stars} review={listing.reviews.length} />
            </div>
          </div>
          <Reviews data={listing} />
          <ListingMap address={listing.address} lat={listing.location.lat} long={listing.location.long} />
          <div className="list-info">
            <div className="d-flex">
              <div style={{width:'55%'}}>
                <div className="d-flex">
                  <div className="host-img" style={{backgroundImage: `url(${listing.host.photo})`}}>
                  {
                    listing.host.isSuperHost ? 
                    <div className="super-host-icon"><svg viewBox="0 0 14 24" role="presentation" aria-hidden="true" focusable="false" style={{height:'24px',width:'24px',display:'block',fill:'currentcolor'}}><path d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823" fill="#fff"></path><path d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z" fill="#ffb400"></path><path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f"></path><path d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z" fill="#484848"></path></svg></div> : ''
                  }
                  </div>
                  <div className="d-flex flex-column justify-content-center pl-3">
                    <div className="listing-title">Hosted by {listing.host.name}</div>
                    <div style={{fontSize:'10pt',color:'#717171'}}>Joined in March 2016</div>
                  </div>
                </div>
                <div className="d-flex pt-4">
                  <i className="fa fa-star"></i>
                  &nbsp; {(Math.floor(Math.random() * (2500 - 1 +1))+1).toLocaleString("en-US")} Reviews &nbsp; &nbsp; &nbsp;
                  <i className="fa fa-shield"></i>
                  &nbsp; Identity verified &nbsp; &nbsp; &nbsp;
                  {listing.host.isSuperHost ? <><FontAwesomeIcon icon={faMedal} /> &nbsp; Superhost</> : ''}
                </div>
                <div className="pt-4">
                  <div>{listing.host.about}</div>
                </div>
              </div>
              <div className="pl-5" style={{width:'30%'}}>
                <div>Language: English</div>
                <div className="pt-2">Response rate: 100%</div>
                <div className="pt-2">Response time: within an hour</div>
                <div className="pt-3">
                  <button className="abnb-button">Contact Host</button>
                </div>
                <div className="d-flex pt-3">
                  <div className="d-flex align-items-center pr-3">
                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',height:'24px',width:'24px',fill:'rgb(227, 28, 95)',stroke:'currentcolor'}}><g><g stroke="none"><path d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z" style={{fillOpacity:'.2'}}></path><path d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z"></path></g><path d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z" fill="none" style={{strokeWidth:'2'}}></path></g></svg>
                  </div>
                  <div style={{fontSize:'10pt'}}>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      );
    };
  
    const loading = () => {
      <div>Loading. . .</div>;
    };
  
    return listing ? loaded() : loading();
  };
  
 
export default ListingPage