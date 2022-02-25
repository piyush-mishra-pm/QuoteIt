import React from 'react';
import { Link } from 'react-router-dom';

import NavHeader from './NavHeader';

import './Navigation.css';

function Navigation(props) {
    return (
        <NavHeader>
            <button className="navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="navigation__title">
                <Link to="/">Your Quotes</Link>
            </h1>
            <nav>Nav Links</nav>
        </NavHeader>
    );
}

export default Navigation;