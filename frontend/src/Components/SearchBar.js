import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  const params = useParams();
  const navClass = params.length ? 'abnb-navbar justify-content-center' : 'abnb-navbar';
  const divClass = params.length ? 'abnb-1200' : 'w-100 p-0';
console.log(params)
  return (
    <div className={navClass}>
    <div className={divClass}>
      <div className="pl-5"><h1>airbnb</h1></div>
      <div className="abnb-search">
        <div className="abnb-search-input w-100 pl-4">
          <input type="text" />
          <span className="sbutton"><i className="fa fa-search-plus"></i></span>
        </div>
      </div>
      <div className="justify-content-end pr-4">
        <div className="right">
          <b className="pr-4" style={{fontSize: '10pt'}}>Airbnb your home</b> <i className="fa fa-bars"></i>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SearchBar
