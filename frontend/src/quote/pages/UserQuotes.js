import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';


import QuoteList from '../components/QuoteList';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function UserQuotes() {
    const [loadedQuotes, setLoadedQuotes] = useState();
    const { isLoading, error, sendRequest, clearErrorHandler } =
        useHttpClient();
    const userId = useParams().userId;

    // Renders only once, when the component is mounted.
    useEffect(() => {
      // IIFE:
      (async()=>{
        try{
          const responseData = await sendRequest(
              `http://localhost:4000/api/v1/quotes/user/${userId}`
          );
          setLoadedQuotes(responseData.quotes);
        }catch(err){}
      })();
    }, [sendRequest, userId]);

    function quoteDeleteHandler(deleteQuoteId){
      setLoadedQuotes(prevQuotes=>prevQuotes.filter(quote => quote.id !== deleteQuoteId));
    }

    return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearErrorHandler}/>
          {isLoading && <LoadingSpinner/>}
            {!isLoading && loadedQuotes && <QuoteList items={loadedQuotes} onDeleteQuote={quoteDeleteHandler}/>}
        </React.Fragment>
    );
}

export default UserQuotes;