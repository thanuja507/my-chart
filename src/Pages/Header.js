import React from 'react'
import '../styles.css'
import { Link } from 'react-router-dom'

function Header() {

    return (
      <div >
        <Link to='/'>
        <img src="mychart-logo.png" alt="logo" className = "logo"/>
        </Link>
        <img src = "mbc-icon.png" alt="logo" className="sm-logo"/>
        <Link to ='/logout'>
          <div className="logout">
            <span>
              <img src="exit-icon.png" alt="exit">
            </img></span>
            Log out
            </div>
        </Link>
      </div>
    );
  }
  
  export default Header;