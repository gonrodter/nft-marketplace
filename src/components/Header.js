import React from 'react';
import './Header.css';

const Header = () => { 

    return(
        <nav>
            <div className="logo">
                <h1 class="logo-text">NFT Marketplace</h1>
            </div>
            <ul className='nav-links'>
                <li>
                    <a href='#'>Marketplace</a>
                </li>
                <li>
                    <a href='#'>Mint</a>
                </li>
                <li>
                    <a href='#'>About</a>
                </li>
            </ul>
        </nav>
    )
}

export default Header;