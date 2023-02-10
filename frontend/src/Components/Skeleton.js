import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

const SkeletonCards = ({ num }) => {

  return Array(num).fill().map((i, idx) => (
    <div className="abnb-card pb-5" key={idx}>   
      <Skeleton duration={2} height={285} width={300} />
      <div className="pt-3">
      <Skeleton width={`100%`} height="25px" className="mt-2" />
      <Skeleton width={`60%`} height="25px" className="mt-3" />
      <Skeleton width={`35%`} height="25px" className="mt-3" />
      </div>
    </div>
  ))
}

export default SkeletonCards
