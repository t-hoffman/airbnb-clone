import React from "react";
import SearchBar from "Components/SearchBar";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import ManageListings from "Pages/ManageListings";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { Routes, Route } from "react-router-dom";
import './Assets/index.css'

export default function App() {
    const [user, setUser] = useState({})

  // res in this case is the JWT. Line 15 turns the unreadable code into an object. Line 17 will hide the button when logged in.
  function handleCallbackResponse(res) {
    console.log("Encoded JWT ID Token:" + res.credential);
    const userObject = jwt_decode(res.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true
  }

  // Using state as the cache so we put setUser in here. empty object is saying if user is an empty object there is no one signed in.
  function handleSignOut(e) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  //This is basically telling react that google does exist even though its not defined anywhere. So it will ignore errors having to do with defining google. Corilated with index.html in public.
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1001828599598-i7b8rjslqjkp8f3t46spopa3mu6n90b2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // This is whats rendering the google button and is also targetting out div as the button
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
    );

    // This line prompts u on page load in the upper right
    google.accounts.id.prompt()
  }, []);

  return (
    <>
      {/* This is the sign in button div */}
      <div id="signInDiv"></div>
      {/* This means that our user acutally has full user attributes. Which means we havea  user that is logged in. So we put log out button inside this conditional */}
      { Object.keys(user).length != 0 && 
      <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      <SearchBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<ListingPage />} />
        <Route path="/manage/*" element={<ManageListings />} />
      </Routes>
      <div className="main-footer">
        © 2023 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy Choices <svg style={{margin:'4px 8px 0 8px'}} width="26" height="12" fill="none"><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" fill="#fff"></rect><path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path><path d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5" stroke="#06F" style={{strokeLinecap:'round'}}></path><path d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5" stroke="#fff" style={{strokeLinecap:'round'}}></path><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" stroke="#06F"></rect></svg> · Destinations
        <div className="d-flex position-absolute" style={{right:'50px'}}>
          <div style={{marginTop:'2px'}}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',height:'16px',width:'16px',fill:'currentcolor'}}><path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path></svg></div>
          <div className="ml-2"><b>English (US)</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
          <b>$ &nbsp; USD</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <b>Support & resources</b>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',fill:'none',height:'16px',width:'16px',stroke:'currentcolor',strokeWidth:'4',overflow:'visible',margin:'3px 0 0 5px'}}><g fill="none"><path d="m4 20 11.2928932-11.29289322c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l11.2928932 11.29289322"></path></g></svg>
        </div>
      </div>
      </>
  );
}
