import React from 'react';

import Card from '../../shared/components/UIElements/Card';

import './QuoteItem.css';

function QuoteItem(props) {
    return (
        <li className="quote-item">
            <Card className="quote-item__content">
                <div className="quote-item__image">
                    <img src={props.image} alt={props.imgAltText} />
                </div>
                <div className="quote-item__info">
                    <h2>{props.quote}</h2>
                    <h3>{props.authorName}</h3>
                    <h3>{props.creatorId}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="quote-item__actions">
                    <button>Like</button>
                    <button>Comment</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </Card>
        </li>
    );
}

export default QuoteItem;
