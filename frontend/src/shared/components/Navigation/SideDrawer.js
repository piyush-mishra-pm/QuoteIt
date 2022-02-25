import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

function SideDrawer(props) {

    const content = (
        /* Animation for Side Drawer sliding in and out */
        <CSSTransition
            in={props.show}
            timeout={250}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            {/* props.onClick explains what happens when some link is clicked on aside menu. 
              As of now it just closes the side drawer nav menu. */}
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById('side-drawer-hook')
    );
}

export default SideDrawer;
