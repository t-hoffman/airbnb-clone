import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ListingForm = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    location: '',
    lat: '',
    long: '',
    type: '',
    numGuests: '',
    rate: '',
    rating: '',
    photos: '',
    hostName: '',
    about: '',
    hostPhoto: '',
    superHost: false
  });

  const fetchData = async () => {
    const response = await fetch(`/home/${id}`);
    const data = await response.json();
    let photoString = '';
    for (let photo of data.photos) {
      photoString += photo + '\n';
    }

    const formData = {
      title: data.name,
      location: data.address,
      lat: data.location.lat,
      long: data.location.long,
      type: data.roomType,
      numGuests: data.numberOfGuests,
      rate: data.rate,
      rating: data.stars,
      photos: photoString,
      hostName: data.host.name,
      about: data.host.about,
      hostPhoto: data.host.photo,
      superHost: data.host.isSuperHost
    }

    setForm(formData);
  }

  useEffect(() => {
    if (id && type === 'edit') {
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const handleSubmit = async () => {
    const splitPhotos = form.photos.split('\n'),
          superHostBoolean = form.superHost === 'true' ? true : false;
    
    const photosArr = [];
    if (splitPhotos && splitPhotos.length > 0) {
      for (let photo of splitPhotos) {
        if (photo) photosArr.push(photo)
      }
    }

    const body = {
      userId: 1,
      name: form.title,
      address: form.location,
      location: {
          lat: form.lat,
          long: form.long
      },
      numberOfGuests: form.numGuests,
      rate: form.rate,
      roomType: form.type,
      stars: form.rating,
      url: null,
      photos: photosArr,
      host: {
          name: form.hostName,
          about: form.about,
          photo: form.hostPhoto,
          isSuperHost: superHostBoolean
      }
    }
    if (type === 'add') {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
        const addListing = await fetch(`/home/`, options);
        
        navigate('/manage/');
      } catch (error) {
        console.error(error)
      }
    } else if (type === 'edit') {
      try {
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
        const editListing = await fetch(`/home/${id}`, options);
        
        navigate('/manage/');
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="abnb-list-container abnb-list-main-cont">
      <h1 className="listing-title" style={{fontSize:'20pt'}}>Add your listing</h1>
      <div className="abnb-form mt-5">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Title</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.title} id="title" placeholder="Oceanfront Laguna property ..." />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Location</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.location} id="location" placeholder="Laguna Beach, California, United States" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Latitude</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.lat} id="lat" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Longitude</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.long} id="long" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Listing type</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.type} id="type" placeholder="Entire home ..." />
            </div>
          </div>
        </div>
      </div>
      <div className="abnb-form">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Number of guests</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.numGuests} id="numGuests" placeholder="" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Nightly rate</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.rate} id="rate" placeholder="" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title"><i className="fa fa-star"></i> &nbsp; Rating</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.rating} id="rating" placeholder="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form-block w-100">
          <div className="d-flex input-surround">
            <div className="form-title">
              Photos<br />
              <span style={{fontWeight:'normal',fontSize:'10pt'}}>URL to photos separated on each line.</span>
            </div>
            <div className="form-input"><textarea onChange={handleChange} value={form.photos} id="photos" /></div>
          </div>
        </div>
      </div>
      <div className="abnb-form">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Host name</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.hostName} id="hostName" placeholder="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form-block w-100">
          <div className="d-flex input-surround">
            <div className="form-title">About</div>
            <div className="form-input"><textarea onChange={handleChange} value={form.about} id="about" /></div>
          </div>
        </div>
      </div>
      <div className="abnb-form">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Photo</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.hostPhoto} id="hostPhoto" placeholder="" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Super host:</div>
            <div className="form-input">
              <select onChange={handleChange} value={form.superHost} id="superHost">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-100 pr-5 text-right">
          <button type="submit" className="abnb-reserve-btn" style={{width:'fit-content'}} onClick={handleSubmit}>Submit your listing</button>
        </div>
     </div>
    </div>
  )
}

export default ListingForm
