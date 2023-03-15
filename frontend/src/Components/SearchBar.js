import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const divClass = pathname === '/' || pathname === '/omg' ? 'abnb-navbar-full' : 'abnb-1200',
        rightPadding = pathname === '/' || pathname === '/omg' ? 'pr-5 nav-right' : 'nav-right pr-0';

  const handleChange = (e) => { setQuery(e.target.value) }
  const handleClick  = (e) => { 
    e.preventDefault();
    setQuery('');
    navigate(`/search/${query}`); 
  }

  const loaded = () => {
    return (
      <div className="abnb-navbar">
        <div className={divClass}>
          <div className="pl-5 logo"><h1><a href="/"><span style={{color:'#000'}}>a</span>bnb</a></h1></div>
          <div className="abnb-search justify-content-center">
            <form onSubmit={handleClick} className="w-100 d-flex justify-content-center">
            <div className="abnb-search-input pl-4">
              <input type="text" value={query} onChange={handleChange} />
              <span className="sbutton" onClick={handleClick}>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',fill:'none',height:'12px',width:'12px',stroke:'currentcolor',strokeWidth:'5.33333',overflow:'visible'}}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
              </span>
            </div>
            </form>
          </div>
          <div className={rightPadding}>
            <div className="right">
              <a href="/manage/add"style={{fontSize:'10pt'}}>Abnb your home</a> &nbsp; | &nbsp; <a href="/manage/" className="pr-4" style={{fontSize:'10pt'}}>Manage</a> <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return loaded();
}

export default SearchBar
