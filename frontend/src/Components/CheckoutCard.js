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
    <Card>
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

    </Card>
    </>
  )
}

export default CheckoutCard;

