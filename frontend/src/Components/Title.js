import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa'

//Title of listing page (under header)

const Title = () => {
  const [info, setInfo] = useState();

  const { idx } = useParams();

  const fetchInfo = async () => {
    try {
      const res = await fetch("");
      const data = await res.json();
      setInfo(); //Need to insert data into setInfo
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const loaded = () => {
    return (
      <div key={idx} className="container">
        <h1>{info.name}</h1>
        <span>
          <Icons.FaStar /> {info.stars}
        </span>
        <span>{info.review}</span>
        <span>{info.address}</span>
      </div>
    );
  };

  const loading = () => {
    <div>Loading . . .</div>;
  };

  return info ? loaded() : loading();
};

export default Title;

