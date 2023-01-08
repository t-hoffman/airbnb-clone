import React from 'react'
// import ChartBar from './ChartBar'
import './Chart.css'


//Mapping through data and pushing each rating customers left, into their own arrays
const Chart = (props) => {
  const data = props.ratings
  const home = []
  const cleanliness = []
  const checkIn = []
  const accuracy = []
  const location = [];
  const value = []
  data.map((label, idx) => {
 
    home.push(label.ratings.home)
    cleanliness.push(label.ratings.cleanliness)
    checkIn.push(label.ratings.checkin)
    accuracy.push(label.ratings.accuracy)
    location.push(label.ratings.location)
    value.push(label.ratings.value)
})
  //getting the overall average by adding all of the elements inside the array, and then filtering out all elements that are 0 and dividing by the length.

  const homeRating = home.reduce((a, b) => a + b, 0) / home.filter(rating => rating >= 1).length;
  const cleanlinessRating = cleanliness.reduce((a, b) => a + b, 0) / cleanliness.filter(rating => rating >= 1).length;
  const checkInRating = checkIn.reduce((a, b) => a + b, 0) / checkIn.filter(rating => rating >= 1).length;
  const accuracyRating = accuracy.reduce((a, b) => a + b, 0) / accuracy.filter(rating => rating > 0).length;
  const locationRating = location.reduce((a, b) => a + b, 0) / location.filter(rating => rating > 0).length;
  const valueRating = value.reduce((a, b) => a + b, 0) / value.filter(rating => rating > 0).length;

  //create an array of objects to map through, to create each bar for the chart.
  const avgRating= [
    {label:'home', value: homeRating.toFixed(1)},
    {label:'cleanliness', value:cleanlinessRating.toFixed(1)},
    {label:'checkIn' , value:checkInRating.toFixed(1)},
    {label:'accuracy', value:accuracyRating.toFixed(1)},
    {label:'location', value:locationRating.toFixed(1)},
    {label:'value' , value: valueRating.toFixed(1)}
]

    console.log(cleanlinessRating)
  
  console.log(cleanliness)
  return (
    <div className='chart'>
      {avgRating.map(item => (
        <div key={item.label} className="bar-container">
          {console.log(item.label)}
          <span className='label'>{item.label}</span>
          <span className='bar' style={{width: `${item.value *20}%`}} />
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default Chart