import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import * as Validator from '../../shared/util/validators';

import './NewQuote.css';

const NewQuote = () => {
    return (
        <form className="quote-form">
            <Input
                element="input"
                type="text"
                validators={[Validator.REQUIRE()]}
                errorText="Please enter a valid Quote."
                label="Quote"
                placeholder="Write Quote Here!"
            />
        </form>
    );
};

export default NewQuote;