import React from 'react';

import photoIcon from '../../assets/images/photoLogo.png';
import './navbar.css'; 

function Navbar(){
    return (
        <>
            <nav className="header">
                <img src= {photoIcon} alt="photo"/>
                <span>PhotoFolio</span>
            </nav>
        </>
    )
}
export default Navbar;