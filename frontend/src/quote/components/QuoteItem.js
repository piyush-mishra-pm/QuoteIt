import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './QuoteItem.css';

function QuoteItem(props) {
    
    const [showComments, setShowComments] = useState(false);

    function openCommentsHandler() {
        setShowComments(true);
    }

    function closeCommentsHandler() {
        setShowComments(false);
    }

    return (
        <React.Fragment>
            {/* Comments Modal (Rendered in separate Portal).
                Shows comments on the associated Quote-Item. */}
            <Modal
                show={showComments}
                onCancel={closeCommentsHandler}
                header={props.quote}
                contentClass="quote-item__modal-content"
                footerClass="quote-item__modal-actions"
                footer={<Button onClick={closeCommentsHandler}>Close</Button>}
            >
                <div className="quote-comments-container">
                    <h2>Comments list goes here.</h2>
                </div>
            </Modal>

            {/* Quote Item */}
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
                        <Button inverse>Like</Button>
                        <Button inverse onClick={openCommentsHandler}>
                            Show Comments
                        </Button>
                        <Button to={`/quotes/${props.id}`}>Edit</Button>
                        <Button danger>Delete</Button>
                    </div>
                </Card>
            </li>
            
        </React.Fragment>
    );
}

export default QuoteItem;
