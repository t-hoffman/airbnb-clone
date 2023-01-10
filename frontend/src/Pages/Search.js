import React, { useEffect, useState } from 'react'

const Search = ({ query }) => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}`);
    const json = await resp.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  const loaded = () => {
    console.log('data',data)
    return (
      <div className="abnb-list-main-cont">
        {query}
      </div>
    )
  }

  if (data) {
    loaded();
  } else if (data && data.length === 0) {
    return <h1 className="listing-title">No results</h1>
  } else {
    return <h1 className="listing-title">Loading ...</h1>
  }
}

export default Search
