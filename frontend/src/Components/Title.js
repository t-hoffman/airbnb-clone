import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

//Title of listing page (under header)

const Title = () => {
    const [info, setInfo] = useState()

    const { idx } = useParams()
    
    const fetchInfo = async () => {
        try {
            const res = await fetch('')
            const data = await res.json()
            setInfo()//Need to insert data into setInfo
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchInfo()
    },[])

  return (
    <div key={idx} className="container">
        <h1>{info.name}</h1>
        <span>{info.stars}</span>
        <span>{info.review}</span>
        <span>{info.address}</span>
    </div>
  )
}

export default Title