import React from 'react';

import photoIcon from '../../assets/images/photoLogo.png';
import './navbar.css'; 

function Navbar(){
    return (
        <>
            <nav className="header">
                <a href='/'>
                    <img src= {photoIcon} alt="photo"/>
                    <span>PhotoFolio</span>
                </a>
            </nav>
        </>
    )
}
export default Navbar;