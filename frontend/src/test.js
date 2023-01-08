import React from 'react'
import { useParams } from 'react-router-dom'

function Test () {
  const params = useParams();
  console.log(params)
}

export default Test
