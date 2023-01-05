import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

//Photos for listing page

const ImageCards = () => {
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
    <div key={idx} className='photo-container'>
        {info.photos}
    </div>
  )
}

export default ImageCards