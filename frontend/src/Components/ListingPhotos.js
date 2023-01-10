import { Modal } from 'react-bootstrap'
import { useState } from 'react'

const ListingPhotos = (props) => {
  const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pics = props.photos.map((pic, idx) => (
    <img src={pic} alt='images of home' width={463} height={300} key={idx} />
  ))

  return (
    <>
    <button className="more-photos" onClick={handleShow}><i className="fas fa-grip-vertical"></i> &nbsp; Show all photos</button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>All photos</Modal.Title>
      </Modal.Header>
      <Modal.Body>{pics}</Modal.Body>
    </Modal>
  </>
  )
}

export default ListingPhotos

 


