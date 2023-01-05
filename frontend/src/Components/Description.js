import React from "react";
import { useState, useEffect } from "react";

const Description = () => {
  const [info, setInfo] = useState();

  const fetchInfo = async () => {
    try {
      const res = await fetch("");
      const data = await res.json();
      setInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const loaded = () => {
    return (
      <div>
        <p>{info}</p>
      </div>
    );
  };

  const loading = () => {
    <div>Loading. . .</div>;
  };

  return info ? loaded() : loading();
};

export default Description;
