import React, {useState, useEffect} from 'react'
import { Button, Card, Dropdown }from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import './CheckoutCard.css'


const CheckoutCard = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const [nights, setNights]= useState(null)
    const [amountOfStay, setAmountOfStay] = useState(null);
    const [amountOfService, setAmountOfService] = useState(null);
    const [total, setTotal] = useState(null);

    

    const cleaningFee = Math.floor(Math.random() * (500 - 50 +1) + 50) + 1;
    const serviceFee = .03;

    useEffect(() => {
      const calculateNumberOfDays = () => {
        if (startDate && endDate) {
          return differenceInDays(endDate, startDate);
        }
      };
  
      const calculateAmountOfStay = () => {
        return props.price * calculateNumberOfDays();
      };
  
      const calculateAmountOfService = () => {
        return serviceFee * calculateAmountOfStay();
      };
  
      const calculateTotal = () => {
        return calculateAmountOfStay() + calculateAmountOfService();
      };
  
      setNights(calculateNumberOfDays());
      setAmountOfStay(calculateAmountOfStay());
      setAmountOfService(calculateAmountOfService().toFixed(2));
      setTotal(calculateTotal());
    }, [startDate, endDate, props.price]);
  return (
    <>
      <div className="calendar-sticky">
        <div className="info-calendar">
          <div className="d-flex">
            <div className="w-50">
              <span className="info-price">${parseInt(props.price).toLocaleString("en-US")}</span> night
            </div>
            <div className="w-50 text-right">
              <a href="#reviews" style={{fontSize:'10pt',fontFamily:'Cereal Header',color:'#717171'}}>
                {props.review} Reviews
              </a>
            </div>
          </div>
          <div className="info-checkin mt-4">
            <div className="d-flex w-100" style={{borderBottom:'1px solid #cacaca'}}>
              <div className="p-3" style={{borderRight:'1px solid #cacaca'}}>
                <span className="cereal-header" style={{fontSize:'8pt'}}>CHECK-IN</span><br />
                <DatePicker
                className='my-date-picker'
                   selected={startDate}
                  onChange={date => setStartDate(date)}
                  startDate={startDate}
                   endDate={endDate}
                  placeholderText="Start date" />
              </div>
              <div className="p-3">
                <span className="cereal-header" style={{fontSize:'8pt'}}>CHECKOUT</span><br />
                <DatePicker
                className='my-date-picker'
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="End date"
                  />
              </div>
            </div>
            
            <div style={{padding:'10px'}}>
              <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" style={{width:'100%',fontSize:'8pt',fontWeight:'bold'}}>
       GUESTS
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
            </div>
          </div>
          <div>
            <button className="abnb-reserve-btn">Reserve</button>
          </div>
          <div className="text-center p-2" style={{fontSize:'10.8pt'}}>
            You won't be charged yet
          </div>
          {nights && (
            <>
          <div className="mb-2">
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">${parseInt(props.price).toLocaleString("en-US")} x {nights} nights</a></div>
              <div className="w-50 text-right">${Math.ceil(amountOfStay).toLocaleString("en-US")}</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">Cleaning fee</a></div>
              <div className="w-50 text-right">${cleaningFee.toLocaleString("en-US")}</div>
            </div>
            <div className="d-flex">
              <div className="w-50 pb-3"><a href="#">Service fee</a></div>
              <div className="w-50 text-right">${Math.ceil(amountOfService).toLocaleString("en-US")}</div>
            </div>
          </div>
          <div className="pt-3 pb-3" style={{borderTop:'1.5px solid #efefef'}}>
            <div className="d-flex">
              <div className="w-50"><span className="cereal-header">Total before taxes</span></div>
              <div className="w-50 text-right"><span className="cereal-header">${Math.ceil(total).toLocaleString("en-US")}</span></div>
            </div>
          </div>
          </> )}
        </div>
        <div>&nbsp;</div>
        <div className="abnb-whitebox position-sticky mt-3">
          <div className="d-flex">
            <div className="w-100"><b>Good price. &nbsp; </b> Your dates are $90 less than the avg. nightly rate over the last 3 months.</div>
            <div className="pl-5 d-flex align-items-center">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',height:'32px',width:'32px',fill:'rgb(227, 28, 95)',stroke:'currentcolor'}}><g stroke="none"><path d="M25.55 1a5 5 0 0 1 3.344 1.282l.192.182 17.207 17.208a3 3 0 0 1 .135 4.098l-.135.144-18.379 18.379a3.001 3.001 0 0 1-3.32.63l-6.42 3.81c-1.296.768-2.948.452-3.894-.736l-.115-.153-.118-.186L2.094 25.046a5 5 0 0 1-.53-3.7l3.435-14.01L5 6a5 5 0 0 1 4.783-4.995L10 1h15.55zM5 15.733l-1.494 6.09a3 3 0 0 0 .219 2.034l.1.186 11.93 20.574.07.112a1 1 0 0 0 1.328.283l5.797-3.441L6.464 25.086a5 5 0 0 1-1.457-3.272L5 21.55v-5.817zM25.55 3H10a3 3 0 0 0-2.995 2.824L7 6v15.55a3 3 0 0 0 .743 1.977l.136.144L25.086 40.88a1 1 0 0 0 1.32.083l.094-.083L44.88 22.5a1 1 0 0 0 .083-1.32l-.083-.094L27.67 3.879A3 3 0 0 0 25.55 3zM14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path><path d="M25.556 5H10a1 1 0 0 0-.993.883L9 6v15.556a1 1 0 0 0 .206.608l.087.1 16.505 16.505 16.971-16.971L26.263 5.293a1 1 0 0 0-.575-.284L25.556 5z" style={{fillOpacity:'.2'}}></path></g></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutCard;

