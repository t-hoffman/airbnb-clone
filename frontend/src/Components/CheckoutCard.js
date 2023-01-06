import React, {useState} from 'react'
import { Button, Card, Dropdown }from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

const CheckoutCard = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

    const cleaningFee = 50;
    const serviceFee = 20;

    const calculateNumberOfDays = () => {
        return differenceInDays(endDate, startDate)
    }
    const amountOfStay = () => {
       return props.price * calculateNumberOfDays();
    }
    const amountOfCleaning = () => {
       return cleaningFee * calculateNumberOfDays();
    }
    const amountOfService = () => {
       return serviceFee * calculateNumberOfDays();
    }
    const calculateStay = () => {
        return amountOfStay() + amountOfCleaning() + amountOfService()
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h3>${props.price} night</h3>
            <div>
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
    <span>${props.price}X{calculateNumberOfDays()}nights</span>
    <span>${amountOfStay()}</span>
    <br/>
    <span>Cleaning fee</span>
    <span>${amountOfCleaning()}</span>
    <br/>
    <span>Service fee</span>
    <span>${amountOfService()}</span>
        </Card.Body>
        <Card.Footer>
            <h3>Total before taxes</h3>
            <div>${calculateStay()}</div>
        </Card.Footer>
    </Card>
    </>
  )
}

export default CheckoutCard;