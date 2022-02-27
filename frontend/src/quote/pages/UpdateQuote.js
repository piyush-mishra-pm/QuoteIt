import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import * as Validators from '../../shared/util/validators';

import './QuoteForm.css';

// Dummy Data:
const DUMMY_QUOTES = [
    {
        key: 'q1',
        id: 'q1',
        image: 'https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&h=350',
        imgAltText: 'Freedom',
        quote: 'Freedom is liberating1',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        creatorId: 'u1',
        authorName: 'Buddha',
    },
    {
        key: 'q2',
        id: 'q2',
        image: 'https://images.pexels.com/photos/1319795/pexels-photo-1319795.jpeg?auto=compress&cs=tinysrgb&h=350',
        imgAltText: 'Support',
        quote: 'Support is reaffirming',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        creatorId: 'u2',
        authorName: 'Mahatma Gandhi',
    },
];

function UpdateQuote() {
    const quoteId = useParams().quoteId;
    const foundQuote = DUMMY_QUOTES.find(q => q.id === quoteId);
    if (!foundQuote) {
        return (
            <div className="center">
                <h2>Could not find the quote.</h2>
            </div>
        );
    }
    return (
        <form className="quote-form">
            <Input
                id="quote"
                element="input"
                type="text"
                label="Quote"
                validators={[Validators.REQUIRE()]}
                errorText="Please enter a non empty quote"
                onInput={() => {}}
                value={foundQuote.quote}
                valid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Your Reflection"
                validators={[Validators.MINLENGTH(5), Validators.MAXLENGTH(500)]}
                errorText="Please enter a reflection, between 5 to 200 characters long."
                onInput={() => {}}
                value={foundQuote.description}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                Update Quote
            </Button>
        </form>
    );
}

export default UpdateQuote;