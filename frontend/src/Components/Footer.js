import React from 'react'
import * as Icons from 'react-icons/fa'

const Footer = () => {
  return (
    <>
    <div className='left-side-of-footer'>
        <p><Icons.FaCopyright /> CommandoLando,Inc.</p>
        <div>.</div>
        <p>Terms</p>
        <div>.</div>
        <p>Sitemap</p>
        <div>.</div>
        <p>Privacy</p>
        <div>.</div>
        <p>Your Privacy Choices</p>
        <div>.</div>
        <p>Destinations</p>
    </div>
    <div className='right-side-of-footer'>
        <p><Icons.FaGlobe /> English (US)</p>
        <p>$ USD</p>
        <p>Support & Resources</p>
    </div>
    </>
  )
}

export default Footer