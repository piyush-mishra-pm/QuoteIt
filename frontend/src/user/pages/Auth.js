import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import * as Validators from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import {AuthContext} from '../../shared/context/auth-context';

import './Auth.css';

function Auth() {
    const auth = useContext(AuthContext);

    // We are either in Login mode or in Sign up mode.
    const [isLoginMode, setIsLogInMode] = useState(true);

    // Loading and Error states:
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    async function authSubmitHandler(e) {
        e.preventDefault();

        if(isLoginMode) {
            // If in LogIn mode:
            try {
                const response = await fetch(
                    'http://localhost:4000/api/v1/users/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const data = await response.json();

                // If not OK status codes (not 200ish), then throw error.
                if (!response.ok) {
                    throw new Error(data.message);
                }

                setIsLoading(false);
                auth.login();
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong!'); // Although there is always a default error message from backend.
            }

        }else{
            setIsLoading(true);
            // If in SignUp mode:
            try{
                const response = await fetch(
                    'http://localhost:4000/api/v1/users/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const data = await response.json();

                // If not OK status codes (not 200ish), then throw error.
                if (!response.ok) {
                    throw new Error(data.message);
                }

                setIsLoading(false);
                auth.login();
            }catch(err){
                setIsLoading(false);
                setError(err.message || 'Something went wrong!'); // Although there is always a default error message from backend.
            }

        }
    }

    // Toggles between Login and Signup modes.
    function switchModeHandler(e) {
        if (!isLoginMode) {
            setFormData(
                { 
                    ...formState.inputs,
                    name: undefined 
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLogInMode(mode => !mode);
    }

    function clearErrorHandler(){
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearErrorHandler}/>
        <Card className="auth">
            { isLoading && <LoadingSpinner asOverlay/> }
            <h2>Login needed!</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        label="Name"
                        type="text"
                        validators={[Validators.REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[Validators.EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[Validators.MINLENGTH(5)]}
                    errorText="Please enter a password, atleast 5 characters long."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'Login' : 'Sign-Up'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                {isLoginMode ? 'Sign-Up' : 'Login'} instead
            </Button>
        </Card>
        </React.Fragment>
    );
}

export default Auth;
