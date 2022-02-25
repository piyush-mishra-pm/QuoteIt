import React from 'react';
import { Link } from 'react-router-dom';

import NavHeader from './NavHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLinks';

import './Navigation.css';

function Navigation(props) {
    return (
        <React.Fragment>
            <SideDrawer>
                <nav className="navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <NavHeader>
                <button className="navigation__menu-btn">
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="navigation__title">
                    <Link to="/">Your Quotes</Link>
                </h1>
                <nav className="navigation__header-nav">
                    <NavLinks />
                </nav>
            </NavHeader>
        </React.Fragment>
    );
}

export default Navigation;