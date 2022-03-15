import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import {AuthContext} from '../../shared/context/auth-context';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './QuoteItem.css';

function QuoteItem(props) {
    const auth = useContext(AuthContext);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {isLoading, error, sendRequest, clearErrorHandler} = useHttpClient();

    function openCommentsHandler() {
        setShowCommentsModal(true);
    }

    function closeCommentsHandler() {
        setShowCommentsModal(false);
    }

    function showDeleteModalHandler(){
        setShowDeleteModal(true);
    }

    function cancelDeleteHandler() {
        setShowDeleteModal(false);
    }

    async function confirmDeleteHandler(){
        setShowDeleteModal(false);
        try{
            await sendRequest(
                `http://localhost:4000/api/v1/quotes/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${auth.token}`
                });
                props.onDelete(props.id);

        }catch(err){

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearErrorHandler} />
            {/* Comments Modal (Rendered in separate Portal).
                Shows comments on the associated Quote-Item. */}
            <Modal
                show={showCommentsModal}
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

            {/* Confirm Delete Modal (Rendered in separate Portal).
                Confirms whether user really wishes to delete quote. */}
            <Modal
                show={showDeleteModal}
                onCancel={cancelDeleteHandler}
                header="Sure?"
                footerClass="quote-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Sure you want to delete this quote? Its irreversible.</p>
            </Modal>

            {/* Quote Item */}
            <li className="quote-item">
                <Card className="quote-item__content">
                    {isLoading && <LoadingSpinner/>}
                    <div className="quote-item__image">
                        <img src={`http://localhost:4000/${props.image}`} alt={props.imgAltText} />
                    </div>
                    <div className="quote-item__info">
                        <h2>{props.quote}</h2>
                        <h3>{props.authorName}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="quote-item__actions">
                        {auth.isLoggedIn && <Button inverse>Like</Button>}
                        <Button inverse onClick={openCommentsHandler}>
                            Show Comments
                        </Button>
                        {auth.isLoggedIn && auth.userId === props.creatorId  && <Button to={`/quotes/${props.id}`}>Edit</Button>}
                        {auth.isLoggedIn && auth.userId === props.creatorId && <Button danger onClick={showDeleteModalHandler}>Delete</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default QuoteItem;
