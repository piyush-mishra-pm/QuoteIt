import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImagePicker from '../../shared/components/FormElements/ImagePicker';
import * as Validators from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import useHttpClient from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './QuoteForm.css';

function NewQuote(){
    const auth = useContext(AuthContext);

    const {isLoading, sendRequest, error, clearErrorHandler } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            quote: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
            authorName: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const history = useHistory();

    async function quoteSubmitHandler(e){
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('quote', formState.inputs.quote.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('creatorId', auth.userId);
            formData.append('authorName', formState.inputs.authorName.value);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
                'http://localhost:4000/api/v1/quotes',
                'POST',
                formData
            );
            // If successfully created, then redirect the user to home page.
            history.push('/');
        }catch(err){

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearErrorHandler}/>
        <form className="quote-form" onSubmit={quoteSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
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
                id="authorName"
                element="input"
                label="Original Author of Quote"
                type="text"
                validators={[Validators.MAXLENGTH(100)]}
                onInput={inputHandler}
                errorText="Name can be 100 chars long, or X mb in size."
                placeholder="(Optional) Whose quote is it?"
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

            <ImagePicker 
                id="image" 
                onInput={inputHandler} 
                errorText="Please upload a relevant image."
            />

            {/* Submit button active only when if input form fields are valid. */}            
            {/* TODO Bug: can't leave image and description as empty, as following submit button doesnot become active.*/}
            <Button type="submit" disabled={!formState.isValid}>
                Add Quote
            </Button>
        </form>
        </React.Fragment>
    );
};

export default NewQuote;