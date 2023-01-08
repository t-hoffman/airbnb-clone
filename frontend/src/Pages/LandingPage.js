import React from 'react'
import Cards from 'Components/Cards'
import Amenities from 'Components/Amenities'

const LandingPage = () => {
  return (
    <div className="abnb-container">
      <div className="abnb-icons">
        <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" />
        <img src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" />
        <img src="https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg" />
        <img src="https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg" />
        <img src="https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg" />
        <img src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg" />
        <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" />
        <img src="https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg" />
        <img src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" />
        <img src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" />
      </div>
      <div className="abnb-main-cont">
        <div className="main-list">
          <Cards />
        </div>
      </div>
    </div>
  )
}

export default LandingPage