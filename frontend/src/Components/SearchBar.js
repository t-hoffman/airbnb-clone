import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  const params = window.location.pathname === '/';
  const navClass = params ? 'abnb-navbar' : 'abnb-navbar justify-content-center';
  const divClass = params ? 'w-100 p-0' : 'abnb-1200';

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
