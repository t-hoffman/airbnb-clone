import React, { useState } from "react";
import Chart from "./Chart";
import { Modal } from "react-bootstrap";

const Reviews = ({ data }) => {
  const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allReviews = data.reviews.map((review, idx) => <ReviewCard review={review} idx={idx} modal={true} />);
  if (data.reviews.length > 0) {
    return (
      <div className="list-info" id="reviews">
        <h1 className="listing-title">
          <i className="fa fa-star" style={{fontSize:'11pt',marginRight:'10px'}}></i>{data.stars} {data.reviews.length} reviews</h1>
        <Chart ratings={data.reviews} />
        <div className="d-block mt-5 w-100">
        {
          data.reviews.map((review, idx) => <ReviewCard review={review} idx={idx} handleShow={handleShow} />)
        }
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>{allReviews}</Modal.Body>
        </Modal>
      </div>
    )
  }
}

const ReviewCard = (props) => {
  let comments = props.review.comments;
  const { handleShow } = props;

  if (props.review.comments.length > 200 && !props.modal) {
    comments = props.review.comments.slice(0, 200) + '...';
  }

  return (
    <div className="d-inline-block align-top w-50" key={props.idx}>
      <div className="w-100 mb-5" style={{paddingRight:'100px',fontSize:'13pt'}}>
        <div className="d-flex">
          <div className="review-img" style={{backgroundImage: `url(${props.review.author.photo})`}}></div>
          <div className="pl-3"><span className="cereal-header">{props.review.author.name}</span><br /><span style={{fontSize:'10pt'}}>{props.review.date}</span></div>
        </div>
        <div className="pt-3">
          <div>{comments}</div>
          {
            props.review.comments.length > 200 && !props.modal ? 
              <a onClick={handleShow} style={{textDecoration:'underline',cursor:'pointer'}}>Show more</a> 
              : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Reviews