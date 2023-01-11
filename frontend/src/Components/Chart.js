import React from 'react'



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
    {label:'Home', value: homeRating.toFixed(1)},
    {label:'Cleanliness', value:cleanlinessRating.toFixed(1)},
    {label:'CheckIn' , value:checkInRating.toFixed(1)},
    {label:'Accuracy', value:accuracyRating.toFixed(1)},
    {label:'Location', value:locationRating.toFixed(1)},
    {label:'Value' , value: valueRating.toFixed(1)}
  ]
  
  return (<>
    {/* <div className='chart'> */}
    <div className="d-block mt-5">
      {avgRating.map((item,idx) => (
        // <div key={item.label} className="bar-container">
        //   {console.log(item.label)}
        //   <span className='label'>{item.label}</span>
        //   <span className='bar' style={{width: `${item.value *20}%`}} />
        //   <div>{item.value}</div>
        // </div>
        <div className="d-inline-block w-50" key={idx}>
          <div className="d-flex mb-3" style={{paddingRight:'125px'}}>
            <div className="w-100 d-flex align-items-end">{item.label}</div>
            <div className="d-flex text-right">
              <div className="d-flex">
                <div className="w-100 d-flex align-items-center">
                  <div className="rating-light">
                    <div className="rating-dark" style={{width: `${item.value *20}%`}}></div>
                  </div>
                </div>
                <div className="text-right d-flex align-items-center ml-2" style={{fontSize:'10pt'}}><b>{item.value !== 'NaN' ? item.value : '0.0'}</b></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Chart