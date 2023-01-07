import React from "react";
import LandingPage from "Pages/LandingPage";
import ListingPage from "Pages/ListingPage";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"

import { Routes, Route } from "react-router-dom";

export default function App() {
    const [user, setUser] = useState({})

  //This is basically telling react that google does exist even though its not defined anywhere. So it will ignore errors having to do with defining google.
  function handleCallbackResponse(res) {
    console.log("Encoded JWT ID Token:" + res.credential);
    const userObject = jwt_decode(res.credential)
    console.log(userObject)
    document.getElementById("signInDiv").hidden = true
  }

  function handleSignOut(e) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1001828599598-i7b8rjslqjkp8f3t46spopa3mu6n90b2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt()
  }, []);

  return (
    <>
    <div id="signInDiv"></div>
    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<ListingPage />} />
      </Routes>
    </>
  );
}
