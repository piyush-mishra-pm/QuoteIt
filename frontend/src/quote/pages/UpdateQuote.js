import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import * as Validators from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import useHttpClient from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';

import './QuoteForm.css';

function UpdateQuote() {
    const { isLoading, error, sendRequest, clearErrorHandler } =
        useHttpClient();
    const [loadedQuote, setLoadedQuote] = useState();
    const quoteId = useParams().quoteId;
    const history = useHistory();
    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm(
        {
            quote: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            authorName: {
                value: '',
                isValid: true,
            },
            image: {
                value: '',
                isValid: true,
            },
        },
        false
    );

    // Renders only once, when the component is mounted.
    // Loads the lastest quote data from backend.
    useEffect(() => {
        // IIFE:
        (async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:4000/api/v1/quotes/${quoteId}`
                );
                setLoadedQuote(responseData.quote);
                setFormData(
                    {
                        quote: {
                            value: responseData.quote.quote,
                            isValid: true,
                        },
                        description: {
                            value: responseData.quote.description,
                            isValid: true,
                        },
                        authorName: {
                            value: responseData.quote.authorName,
                            isValid: true,
                        },
                        image: {
                            value: responseData.quote.image,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) {}
        })();
    }, [sendRequest, quoteId, setFormData]);

    if(isLoading){
        return <LoadingSpinner/>;
    }

    if (!loadedQuote && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find the quote.</h2>
                </Card>
            </div>
        );
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        try{
            await sendRequest(
                `http://localhost:4000/api/v1/quotes/${quoteId}`,
                'PATCH',
                JSON.stringify({
                    quote: formState.inputs.quote.value,
                    description: formState.inputs.description.value,
                    image: formState.inputs.image.value,
                    authorName: formState.inputs.authorName.value,
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            // Redirect, if correctly submitted the updated quote.
            history.push(`/${auth.userId}/quotes`);

        }catch(err){}

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearErrorHandler} />
            {isLoading && <LoadingSpinner />}
            {!isLoading && loadedQuote && (
                <form className="quote-form" onSubmit={formSubmitHandler}>
                    <Input
                        id="quote"
                        element="input"
                        type="text"
                        label="Quote"
                        validators={[Validators.REQUIRE()]}
                        errorText="Please enter a non empty quote"
                        onInput={inputHandler}
                        initialValue={loadedQuote.quote}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Your Reflection"
                        validators={[
                            Validators.MINLENGTH(5),
                            Validators.MAXLENGTH(500),
                        ]}
                        errorText="Please enter a reflection, between 5 to 500 characters long."
                        onInput={inputHandler}
                        initialValue={loadedQuote.description}
                        initialValid={true}
                    />
                    <Input
                        id="authorName"
                        element="input"
                        label="Your Reflection"
                        validators={[
                            Validators.MINLENGTH(5),
                            Validators.MAXLENGTH(100),
                        ]}
                        errorText="Name can be 100 chars long, or X mb in size."
                        onInput={inputHandler}
                        initialValue={loadedQuote.authorName}
                        initialValid={true}
                    />{/* TODO: Image upload support needed here. */}
                    <Input
                        id="image"
                        element="input"
                        label="Image url"
                        validators={[
                            Validators.MAXLENGTH(1000),
                        ]}
                        errorText="Img url can be 1000 chars long, or X mb in size."
                        onInput={inputHandler}
                        initialValue={loadedQuote.image}
                        initialValid={true}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        Update Quote
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
}

export default UpdateQuote;