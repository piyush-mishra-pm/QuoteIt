import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

function NavLinks(props) {
    return (
        <ul className="nav-links-list">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u01/quotes">MY QUOTES</NavLink>
            </li>
            <li>
                <NavLink to="/quotes/new">ADD QUOTE</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;
