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

    const cleaningFee = 50;
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
          <p>
            <button className="reserve-btn">Reserve</button>
          </p>
          <p className="text-center p-2" style={{fontSize:'10.8pt'}}>
            You won't be charged yet
          </p>
          <p>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">${parseInt(props.price).toLocaleString("en-US")} x 5 nights</a></div>
              <div className="w-50 text-right">${(parseInt(props.price)*5).toLocaleString("en-US")}</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">Cleaning fee</a></div>
              <div className="w-50 text-right">$450</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-2"><a href="#">Service fee</a></div>
              <div className="w-50 text-right">$1,865</div>
            </div>
          </p>
          <p className="pt-2" style={{borderTop:'1px solid #efefef'}}>
            <div className="d-flex">
              <div className="w-50"><span className="cereal-header">Total before taxes</span></div>
              <div className="w-50 text-right"><span className="cereal-header">${((parseInt(props.price)*5)+450+1865).toLocaleString("en-US")}</span></div>
            </div>
          </p>
        </div>
        <p>&nbsp;</p>
        <div className="abnb-whitebox position-sticky">
          <div className="d-flex">
            <div className="w-100"><b>Good price. &nbsp; </b> Your dates are $90 less than the avg. nightly rate over the last 3 months.</div>
            <div className="pl-5"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutCard;

