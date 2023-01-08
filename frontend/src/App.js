import React from "react";
import SearchBar from "Components/SearchBar";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import './Assets/index.css'

import { Routes, Route, useParams } from "react-router-dom";

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

    const params = Object.keys(useParams()),
          paramCheck = params.length ? true : false,
          divClass = params.length ? 'abnb-list-container' : 'abnb-container';

  return (
    <>
    {
        !paramCheck && <SearchBar />
    }
    <div className={divClass}>
    {
      paramCheck && <SearchBar />
    }
    {/* This is the sign in button div */}
    <div id="signInDiv"></div>
    {/* This means that our user acutally has full user attributes. Which means we havea  user that is logged in. So we put log out button inside this conditional */}
    { Object.keys(user).length != 0 && 
    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
    }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<ListingPage />} />
      </Routes>
    </div>
    </>
  );
}
