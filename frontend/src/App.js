import React from "react"
import LandingPage from "Pages/LandingPage"
import {Routes, Route} from 'react-router-dom'


export default function App() {
  return( <>
<Routes>
<Route path='/' element= {<LandingPage />} />
</Routes>
  </>
)
}
