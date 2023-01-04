import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Amenities = () => {
  return (
    <div className='amenities-container'>
        <div>
            <FontAwesomeIcon icon="fa-thin fa-car" />
        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-mug-hot" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-wifi" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-lock" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-trash" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-bath" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-gamepad" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-bed-front" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-solar-panel" />

        </div>
        <div>
        <FontAwesomeIcon icon="fa-thin fa-martini-glass-citrus" />

        </div>
    </div>
  )
}

export default Amenities