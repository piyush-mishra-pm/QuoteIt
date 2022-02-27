import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';

import './Input.css';

/*
    A Generic Input Field component which can be used for, either
    - 1. Creating different types of input fields, like an:
            1.1. an input field, or
            1.2. text area.
    - 2. Using array of Validators on the inout field:

*/

function inputReducer(state, action) {
    switch (action.type) {
        // Input field's value is changed:
        case 'CHANGE':
            return {
                // Copy the old state
                ...state, // will include isTouched state.

                value: action.val,
                isValid: validate(action.val, action.validators),
            };

        // Input field is touched:
        case 'TOUCH':
            return {
                // Copy the old state
                ...state,
                isTouched: true,
            };

        // if no action, then return the previous state:
        default:
            return state;
    }
}

function Input(props) {
    // Validity depends on value, hence to simpilfy dependent state logics,
    // I use useReducer (and not useState).
    const [inputState, dispatchFn] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false,
    });

    // Object destructuring of props and inputState helps us use these
    // as dependencies for useEffect, while still not causing infinite loop.
    const {id, onInput} = props;
    const {value, isValid} = inputState;
    useEffect(()=>{
        onInput(id , value, isValid)
    },[id, onInput, value, isValid]);

    function inputChangeHandler(e) {
        dispatchFn({
            type: 'CHANGE',
            val: e.target.value,
            validators: props.validators,
        });
    }

    function inputTouchHandler(e) {
        dispatchFn({
            type: 'TOUCH',
            val: e.target.value,
            validators: props.validators,
        });
    }

    let element;
    if (props.element === 'input') {
        element = (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={inputState.value}
            />
        );
    } else if (props.element === 'textarea') {
        element = (
            <textarea
                id={props.id}
                rows={props.rows || 2}
                placeholder={props.placeholder}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={inputState.value}
            />
        );
    } else {
        throw new Error('Input type not recognised');
    }

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                'form-control--invalid'
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}

            {/* SHow error if, input field value is not valid and is touched */}
            {!inputState.isValid && 
            inputState.isTouched && 
            (<p>{props.errorText}</p>)}
        </div>
    );
}

export default Input;
