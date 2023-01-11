import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=50`);
    const json = await resp.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  const loaded = () => {
    console.log(data)
    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="abnb-main-cont mt-5">
          <div className="main-list">
            <Cards data={data} /> 
          </div>
          <div className="text-center mt-3">
            Pages | 1 2 3 4
          </div>
        </div>
      </div>
    )
  }

  if (data) {
    return loaded();
  } else if (data && data.length === 0) {
    return <h1 className="listing-title">No results</h1>
  } else {
    return <h1 className="listing-title">Loading ...</h1>
  }
}

export default Search
