import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <span><FontAwesomeIcon icon="fa-solid fa-star" /> {info.stars}</span>
        <span>{info.review}</span>
        <span>{info.address}</span>
    </div>
  )
}

export default Title