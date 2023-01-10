import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ListingForm = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: 1,
    name: '',
    address: '',
    location: {
        lat: '',
        long: ''
    },
    numberOfGuests: '',
    rate: '',
    roomType: '',
    stars: '',
    url: null,
    photos: '',
    host: {
        name: '',
        about: '',
        photo: '',
        isSuperHost: false
    }
  });
  
  const fetchData = async () => {
    const response = await fetch(`/home/${id}`),
          data = await response.json();
    let photosString = '';
    for (let pic of data.photos) {
      photosString += pic + '\n'
    }
    data.photos = photosString;
    delete data.reviews;
    delete data._id;
    delete data.__v;

    setForm(data);
  }

  useEffect(() => {
    if (id && type === 'edit') {
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    const input = e.target.id;

    if (input === 'lat' || input === 'long') {
      setForm({...form, location: { ...form.location, [input]: e.target.value }});
    } else if (input === 'hostName' || input === 'about' || input === 'hostPhoto' || input === 'isSuperHost') {
      const hostInput = {hostName: 'name', hostPhoto: 'photo', isSuperHost: 'isSuperHost', about: 'about'}
      setForm({...form, host: { ...form.host, [hostInput[input]]: e.target.value }});
    } else {
      setForm({...form, [input]: e.target.value});
    }
  }

  const handleSubmit = async () => {
    const formCopy = {...form},
          photosArr = formCopy.photos.split('\n').filter(pic => { if(pic) { return pic } }),
          superBoolean = formCopy.host.isSuperHost === 'true' ? true : false,
          body = {...formCopy, photos: photosArr, host: { ...formCopy.host, isSuperHost: superBoolean }};

    if (type === 'add') {
      try {
        const addListing = await fetch(`/home/`, 
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

        navigate('/manage/');
      } catch (error) {
        console.error(error)
      }
    } else if (type === 'edit') {
      try {
        const editListing = await fetch(`/home/${id}`, 
        { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

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
              <input type="text" onChange={handleChange} value={form.name} id="name" placeholder="Oceanfront Laguna property ..." />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Location</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.address} id="address" placeholder="Laguna Beach, California, United States" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Latitude</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.location.lat} id="lat" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Longitude</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.location.long} id="long" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Listing type</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.roomType} id="roomType" placeholder="Entire home ..." />
            </div>
          </div>
        </div>
      </div>
      <div className="abnb-form">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Number of guests</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.numberOfGuests} id="numberOfGuests" placeholder="" />
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
              <input type="text" onChange={handleChange} value={form.stars} id="stars" placeholder="" />
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
              <input type="text" onChange={handleChange} value={form.host.name} id="hostName" placeholder="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form-block w-100">
          <div className="d-flex input-surround">
            <div className="form-title">About</div>
            <div className="form-input"><textarea onChange={handleChange} value={form.host.about} id="about" /></div>
          </div>
        </div>
      </div>
      <div className="abnb-form">
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Photo</div>
            <div className="form-input">
              <input type="text" onChange={handleChange} value={form.host.photo} id="hostPhoto" placeholder="" />
            </div>
          </div>
        </div>
        <div className="form-block">
          <div className="d-flex input-surround">
            <div className="form-title">Super host:</div>
            <div className="form-input">
              <select onChange={handleChange} value={form.host.isSuperHost} id="isSuperHost">
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
