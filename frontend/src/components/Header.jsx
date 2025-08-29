import React, {useState, useEffect} from 'react';
import { getZones } from '../services/FareService';
import './Header.css'

const Header = ({title}) => {    
    return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-title">
          {title}
        </div>
        <div className="navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/get-card">Get Card</a>
        </div>
      </nav>
    </header>
    )
}

export default Header;