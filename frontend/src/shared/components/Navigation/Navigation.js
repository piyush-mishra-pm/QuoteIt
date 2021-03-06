import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavHeader from './NavHeader';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import NavLinks from './NavLinks';

import './Navigation.css';

function Navigation(props) {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    // Opens Side drawer.
    function openSideDrawerHandler(){
        setSideDrawerOpen(true);
    }

    // Closes Side drawer.
    function closeSideDrawerHandler(){
        setSideDrawerOpen(false);
    }

    return (
        <React.Fragment>
            {sideDrawerOpen && <Backdrop onClick={closeSideDrawerHandler} />}
            <SideDrawer show={sideDrawerOpen} onClick={closeSideDrawerHandler}>
                <nav className="navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <NavHeader>
                <button className="navigation__menu-btn" onClick={openSideDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h2 className="navigation__title">
                    <Link to="/">Quote-It</Link>
                </h2>
                <nav className="navigation__header-nav">
                    <NavLinks />
                </nav>
            </NavHeader>
        </React.Fragment>
    );
}

export default Navigation;