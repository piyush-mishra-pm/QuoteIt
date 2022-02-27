import React from 'react';
import {useParams} from 'react-router-dom';


import QuoteList from '../components/QuoteList';

// Dummy Data:
const DUMMY_QUOTES = [
  {
    key:'q1',
    id:'q1',
    image:'https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&h=350',
    imgAltText:'Freedom',
    quote:'Freedom is liberating1',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    creatorId:'u1',
    authorName:'Buddha',
  },
  {
    key:'q2',
    id:'q2',
    image:'https://images.pexels.com/photos/1319795/pexels-photo-1319795.jpeg?auto=compress&cs=tinysrgb&h=350',
    imgAltText:'Support',
    quote:'Support is reaffirming',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    creatorId:'u2',
    authorName:'Mahatma Gandhi',
  }
];
function UserQuotes () {
  const userId = useParams().userId;
  const loadedQuotes = DUMMY_QUOTES.filter(quote=> quote.creatorId === userId);
  return <QuoteList items={loadedQuotes} />;
}

export default UserQuotes;