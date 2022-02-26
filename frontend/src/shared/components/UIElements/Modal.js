import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

import './Modal.css';

function ModalOverlay (props) {
    /* 
    Can use :
    - custom style class names, 
    - custom inline styles, 
    - custom header and footer classes, and 
    - custom content classes. 
    */
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            {/*
                Form supports custom onSubmit event handlers:
                - If there are any onSubmit event handlers then form shall use it.
                - Else, form will atleast prevent eventDefault and would not cause page to reload. 
            */}
            <form
                onSubmit={
                    props.onSubmit
                        ? props.onSubmit
                        : event => event.preventDefault()
                }
            >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(
        content,
        document.getElementById('modal-hook')
    );
};

function Modal(props) {
    // Modal uses a backdrop and also plays animation on open/close.
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;