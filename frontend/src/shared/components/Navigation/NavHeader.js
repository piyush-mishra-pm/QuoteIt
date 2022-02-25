import React from 'react';

import './NavHeader.css';

function Header (props){
    return (
        <header className="nav-header">
            {props.children}
        </header>
    );
}

export default Header;