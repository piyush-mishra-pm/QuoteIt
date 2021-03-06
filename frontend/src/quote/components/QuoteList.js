import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import QuoteItem from './QuoteItem';
import Button from '../../shared/components/FormElements/Button';

import './QuoteList.css';

function QuoteList(props) {
    // If no quotes.
    if (props.items.length === 0) {
        return (
            <div className="quote-list center">
                <Card>
                    <h2>No quotes yet. Want to create one?</h2>
                    <Button to="/quotes/new">Add a Quote</Button>
                </Card>
            </div>
        );
    }

    // If Quotes exist.
    return (
        <ul className="quote-list">
            {props.items.map(quote => (
                <QuoteItem
                    key={quote.id}
                    id={quote.id}
                    image={quote.image}
                    imgAltText={quote.imgAltText||`image for ${quote.quote}`}
                    quote={quote.quote}
                    description={quote.description}
                    creatorId={quote.creatorId}
                    authorName={quote.authorName}
                    onDelete={props.onDeleteQuote}
                />
            ))}
        </ul>
    );
}

export default QuoteList;
