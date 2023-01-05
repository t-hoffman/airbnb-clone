import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

//Photos for listing page

const ImageCards = () => {
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
      <div key={idx} className="photo-container">
        {info.photos}
      </div>
    );
  };

  const loading = () => {
    <div>Loading. . .</div>;
  };

  return info ? loaded() : loading();
};

export default ImageCards;
