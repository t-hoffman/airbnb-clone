import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { pathname } = useLocation();
  const navClass = pathname === '/' ? 'abnb-navbar' : 'abnb-navbar justify-content-center',
        divClass = pathname === '/' ? 'w-100 p-0' : 'abnb-1200',
        rightPadding = pathname === '/' ? 'justify-content-end pr-5' : 'justify-content-end pr-0';

  const loaded = () => {
    return (
      <div className={navClass}>
        <div className={divClass}>
          <div className="pl-5 logo"><h1><a href="/">airbnb</a></h1></div>
          <div className="abnb-search">
            <div className="abnb-search-input pl-4" style={{width:'300px'}}>
              <input type="text" />
              <span className="sbutton">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display:'block',fill:'none',height:'12px',width:'12px',stroke:'currentcolor',strokeWidth:'5.33333',overflow:'visible'}}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
              </span>
            </div>
          </div>
          <div className={rightPadding}>
            <div className="right">
              <a href="/add" className="pr-4" style={{fontSize: '10pt'}}>Airbnb your home</a> <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return loaded();
}

export default SearchBar
