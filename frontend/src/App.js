import React from "react"
import SearchBar from "Components/SearchBar"
import LandingPage from "Pages/LandingPage"
import {Routes, Route, useParams} from 'react-router-dom'
import './Assets/index.css'

export default function App() {
  const params = Object.keys(useParams()),
        paramCheck = params.length ? true : false,
        divClass = params.length ? 'abnb-list-container' : 'abnb-container';

  return(
    <>
      {
        !paramCheck && <SearchBar />
      }
      <div className={divClass}>
        {
          paramCheck && <SearchBar />
        }
        <Routes>
          <Route path='/' element= {<LandingPage />} />
        </Routes>
      </div>
    </>
  )
}
