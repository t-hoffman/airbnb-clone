import React, { useEffect, useState } from 'react'
import Cards from 'Components/Cards';
import { useParams } from 'react-router-dom';

const Search = (props) => {
  const { query, page } = useParams();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const pageNum = page ? page : 1;

  const countTotal = async () => {
    const check = await fetch(`/home/location/${query}`);
    const checkJson = await check.json();
    const totalCount = checkJson.length;
    
    setTotal(totalCount);
  }

  const fetchData = async () => {
    const resp = await fetch(`/home/location/${query}?limit=3&page=${pageNum}`);
    const json = await resp.json();
    setData(json);
  }

  useEffect(() => {
    setData(null);
    fetchData();
    countTotal();
  }, [query]);

  const loaded = () => {

    const pageCount = Math.floor(total/3);
    console.log(pageCount);
    const pageArr = new Array(pageCount).fill('');
    const pageList = pageArr.map((i,idx) => { return <a href={`/search/${query}/${idx+1}`}>{idx+1}</a>  });

    return (
      <div className="abnb-list-main-cont">
        <h1 className="listing-title">Search results</h1>
        <span style={{fontSize:'10pt'}}>Query: '{query}'</span>
        <div className="abnb-main-cont mt-5">
          <div className="main-list">
            <Cards data={data} /> 
          </div>
          <div className="text-center mt-3">
            Pages | {pageList}
          </div>
        </div>
      </div>
    )
  }

  if (data && data.length > 0) {
    return loaded();
  } else if (data && data.length === 0) {
    return (
      <div className="abnb-list-main-cont text-align-center">
        <h1 className="listing-title">Sorry, there are no results.  Please try again.</h1>
      </div>
    )
  } else {
    return (
      <div className="abnb-list-main-cont text-align-center">
        <h1 className="listing-title">Loading ...</h1>
      </div>
    )
  }
}

export default Search
