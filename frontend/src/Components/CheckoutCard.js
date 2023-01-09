import React, {useState, useEffect} from 'react'
import { Button, Card, Dropdown }from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import * as Icons from 'react-icons/fa'

const CheckoutCard = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const [nights, setNights]= useState(null)
    const [price, setPrice]= useState(0);
    const [cleanFee, setCleanFee] = useState(null)

    const cleaningFee = Math.floor(Math.random() * (500 - 50 +1) + 50) + 1,
          sFee = Math.floor(Math.random() * (2000 - 50 +1) + 50) + 1;
    const serviceFee = .03;

    const calculateNumberOfDays = () => {
      if(startDate && endDate){
        return differenceInDays(endDate, startDate)
      }
    }
    const amountOfStay = () => {
       return props.price * calculateNumberOfDays();
    }
    const amountOfCleaning = () => {
       return cleaningFee * calculateNumberOfDays();
    }
    const amountOfService = () => {
       return serviceFee * amountOfStay();
    }
    const calculateStay = () => {
        return amountOfStay() + amountOfService()
    }

    useEffect(()=> {
      setNights(calculateNumberOfDays())
      setPrice(calculateStay())

    }, [])
    
    

  return (
    <>
    {/* <Card>
        <Card.Body>
            <h3>${props.price} night</h3>
            <div>
            <Icons.FaStar size={15}/>
            {props.stars}
            {props.review} reviews
            </div>
            <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start date"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        placeholderText="End date"
      />
      <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
       Number of guests
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Adults
        <Button variant="outline-dark"
         onClick={() => setAdults(adults - 1)} disabled={adults <= 0}>-</Button>
        <span>{adults}</span>
        <Button  variant="outline-dark" 
        onClick={() => setAdults(adults+ 1)} disabled={adults >= 9}>+
        </Button>
        </Dropdown.Item>
        <br />
        <Dropdown.Item >Children
        <Button variant="outline-dark"
        onClick={() => setChildren(children - 1)} disabled={children <= 0}>-
        </Button>
        <span>{children}</span>
        <Button variant="outline-dark"
         onClick={() => setChildren(children + 1)} disabled={children >= 9}>+
         </Button>
         </Dropdown.Item>
         <br />
         <Dropdown.Item >Infants
        <Button variant="outline-dark"
        onClick={() => setInfants(infants - 1)} disabled={infants <= 0}>-
        </Button>
        <span>{infants}</span>
        <Button variant="outline-dark"
         onClick={() => setChildren(infants + 1)} disabled={infants >= 9}>+
         </Button>
         </Dropdown.Item>
         <br />
         <Dropdown.Item >pets
        <Button variant="outline-dark"
        onClick={() => setPets(pets - 1)} disabled={pets <= 0}>-
        </Button>
        <span>{pets}</span>
        <Button variant="outline-dark"
         onClick={() => setPets(pets + 1)} disabled={pets >= 9}>+
         </Button>
         </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Button variant='danger' size='lg'> Reserve</Button>
    <p>You won't be charged yet</p>
    <br/>
    <span>${props.price} X </span><span>{calculateNumberOfDays()}nights</span>
    <span>${amountOfStay()}</span>
    <br/>
    <span>Cleaning fee</span>
    <span>${cleaningFee}</span>
    <br/>
    <span>Service fee</span>
    <span>${amountOfService().toFixed(2)}</span>
        </Card.Body>
        <Card.Footer>
            <h3>Total before taxes</h3>
            <div>${price.toFixed(2)}</div>
        </Card.Footer>

    </Card> */}
      <div className="calendar-sticky">
        <div className="info-calendar">
          <div className="d-flex">
            <div className="w-50">
              <span className="info-price">${parseInt(props.price).toLocaleString("en-US")}</span> night
            </div>
            <div className="w-50 text-right"><a href="#" style={{color:'#717171',fontSize:'10pt',fontFamily:'Cereal Header'}}>2 Reviews</a></div>
          </div>
          <div className="info-checkin mt-4">
            <div className="d-flex" id="info-checkin" style={{borderBottom:'1px solid #cacaca'}}>
              <div style={{borderRight:'1px solid #cacaca'}}>
                <span className="cereal-header" style={{fontSize:'8pt'}}>CHECK-IN</span><br />
                1/30/2023
              </div>
              <div>
                <span className="cereal-header" style={{fontSize:'8pt'}}>CHECKOUT</span><br />
                2/4/2023
              </div>
            </div>
            <div style={{padding:'10px'}}>
              <span className="cereal-header" style={{fontSize:'8pt'}}>GUESTS</span><br />
              1 guest
            </div>
          </div>
          <div>
            <button className="reserve-btn">Reserve</button>
          </div>
          <div className="text-center p-2" style={{fontSize:'10.8pt'}}>
            You won't be charged yet
          </div>
          <div>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">${parseInt(props.price).toLocaleString("en-US")} x 5 nights</a></div>
              <div className="w-50 text-right">${(parseInt(props.price)*5).toLocaleString("en-US")}</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">Cleaning fee</a></div>
              <div className="w-50 text-right">${cleaningFee.toLocaleString("en-US")}</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-2"><a href="#">Service fee</a></div>
              <div className="w-50 text-right">${sFee.toLocaleString("en-US")}</div>
            </div>
          </div>
          <div className="pt-2 pb-3" style={{borderTop:'1px solid #efefef'}}>
            <div className="d-flex">
              <div className="w-50"><span className="cereal-header">Total before taxes</span></div>
              <div className="w-50 text-right"><span className="cereal-header">${((parseInt(props.price)*5)+cleaningFee+sFee).toLocaleString("en-US")}</span></div>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div className="abnb-whitebox position-sticky mt-3">
          <div className="d-flex">
            <div className="w-100"><b>Good price. &nbsp; </b> Your dates are $90 less than the avg. nightly rate over the last 3 months.</div>
            <div className="pl-5 d-flex align-items-center">
            <svg viewBox="0 0 48 48" 
                 xmlns="http://www.w3.org/2000/svg" 
                 aria-hidden="true" 
                 role="presentation" 
                 focusable="false" 
                 style={{display:'block',height:'32px',width:'32px',fill:'rgb(227, 28, 95)',stroke:'currentcolor'}}>
              <g stroke="none">
                <path d="M25.55 1a5 5 0 0 1 3.344 1.282l.192.182 17.207 17.208a3 3 0 0 1 .135 4.098l-.135.144-18.379 18.379a3.001 3.001 0 0 1-3.32.63l-6.42 3.81c-1.296.768-2.948.452-3.894-.736l-.115-.153-.118-.186L2.094 25.046a5 5 0 0 1-.53-3.7l3.435-14.01L5 6a5 5 0 0 1 4.783-4.995L10 1h15.55zM5 15.733l-1.494 6.09a3 3 0 0 0 .219 2.034l.1.186 11.93 20.574.07.112a1 1 0 0 0 1.328.283l5.797-3.441L6.464 25.086a5 5 0 0 1-1.457-3.272L5 21.55v-5.817zM25.55 3H10a3 3 0 0 0-2.995 2.824L7 6v15.55a3 3 0 0 0 .743 1.977l.136.144L25.086 40.88a1 1 0 0 0 1.32.083l.094-.083L44.88 22.5a1 1 0 0 0 .083-1.32l-.083-.094L27.67 3.879A3 3 0 0 0 25.55 3zM14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                <path d="M25.556 5H10a1 1 0 0 0-.993.883L9 6v15.556a1 1 0 0 0 .206.608l.087.1 16.505 16.505 16.971-16.971L26.263 5.293a1 1 0 0 0-.575-.284L25.556 5z" style={{fillOpacity:'.2'}}></path>
              </g>
            </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutCard;

