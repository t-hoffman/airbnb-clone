import React from 'react'
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

const Listing = () => {
    const [info, setInfo] = useState([])

    const fetchInfo = async () => {
        const res = await fetch('')
        const data = await res.json()
        setInfo(data)
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    const loaded = () => {
        return info.map((data) => (
            <div>
                
            </div>
        ))
    }

  return (
    <div>Listing</div>
  )
}

export default Listing