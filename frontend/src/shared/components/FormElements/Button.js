import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

/*
    A Generic Button component which can be used for:
    1. <a> tag buttons, 
    2. 'Link' buttons, and 
    3. normal buttons.
*/

function Button(props) {
    
    // Button wiith href (<a> tags):
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${
                    props.inverse && 'button--inverse'
                } ${props.danger && 'button--danger'}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }

    // Button with Links:
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${
                    props.inverse && 'button--inverse'
                } ${props.danger && 'button--danger'}`}
            >
                {props.children}
            </Link>
        );
    }

    // Normal Button:
    return (
        <button
            className={`button button--${props.size || 'default'} ${
                props.inverse && 'button--inverse'
            } ${props.danger && 'button--danger'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;