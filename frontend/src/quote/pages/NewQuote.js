import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import * as Validators from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';

import './QuoteForm.css';

function NewQuote(){

    const [formState, inputHandler] = useForm(
        {
            quote: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            }
        },
        false
    );

    function quoteSubmitHandler(e){
        e.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className="quote-form" onSubmit={quoteSubmitHandler}>
            <Input
                id="quote"
                element="input"
                label="Quote"
                type="text"
                validators={[Validators.REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid Quote."
                placeholder="Write Quote Here!"
            />
            <Input
                id="description"
                element="textarea"
                label="Your Reflection"
                validators={[
                    Validators.MINLENGTH(5),
                    Validators.MAXLENGTH(500),
                ]}
                onInput={inputHandler}
                errorText="Reflection needs to be between 5 to 500 characters."
                placeholder="Write your relfection on the quote here!"
            />

            {/* Quote related Image needed. */}

            {/* Submit button active only when if input form fields are valid. */}
            <Button type="submit" disabled={!formState.isValid}>
                Add Quote
            </Button>
        </form>
    );
};

export default NewQuote;