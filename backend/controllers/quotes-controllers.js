const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const ErrorObject = require('../util/error-object');
/*
let DUMMY_QUOTES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1',
    },
];*/

let DUMMY_QUOTES = [
    {
        key: 'q1',
        id: 'q1',
        image: 'https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&h=350',
        imgAltText: 'Freedom', // Note required.
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
        creatorId: 'u1',
        authorName: 'Mahatma Gandhi',
    },
];

// GET: api/v1/quotes/:quoteId
const getQuoteById = (req, res, next) => {
    const quoteId = req.params.quoteId;

    const quote = DUMMY_QUOTES.find(q => {
        return q.id === quoteId;
    });

    if (!quote) {
        throw new ErrorObject('Could not find requested quote.', 404);
    }

    res.json({ quote });
};

const getQuotesByUserId = (req, res, next) => {
    const userId = req.params.userId;

    const quotes = DUMMY_QUOTES.filter(q => {
        return q.creatorId === userId;
    });

    if (!quotes || quotes.length === 0) {
        return next(new ErrorObject('No quotes found for the user.', 404));
    }

    res.json({ quotes });
};

const getAllQuotes =(req, res, next) => {
    res.json(DUMMY_QUOTES);
}

const createQuote = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorObject('Invalid inputs!', 422);
    }

    const { quote, description, creatorId, image, authorName } = req.body;

    const createdQuote = {
        id: uuid(),
        quote,
        description,
        creatorId,
        image,
        authorName,
    };

    DUMMY_QUOTES.push(createdQuote);

    res.status(201).json({ createdQuote });
};

const updateQuote = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorObject('Invalid inputs!', 422);
    }

    const { quote, description, image, authorName } = req.body;
    const quoteId = req.params.quoteId;

    const updatedQuote = { ...DUMMY_QUOTES.find(q => q.id === quoteId) };
    const quoteIndex = DUMMY_QUOTES.findIndex(q => q.id === quoteId);

    if (!updatedQuote) {
        throw new ErrorObject('Quote not found, cannot update the quote!', 404);
    }

    updatedQuote.quote = quote;
    updatedQuote.description = description;
    updatedQuote.authorName = authorName;
    updatedQuote.image = image;

    DUMMY_QUOTES[quoteIndex] = updatedQuote;

    res.status(200).json({ updatedQuote });
};

const deleteQuote = (req, res, next) => {
    const quoteId = req.params.quoteId;
    if (!DUMMY_QUOTES.find(q => q.id === quoteId)) {
        throw new ErrorObject(
            'Quote not found, so cannot delete the quote.',
            404
        );
    }
    DUMMY_QUOTES = DUMMY_QUOTES.filter(q => q.id !== quoteId);
    res.status(200).json({ message: 'Deleted quote.' });
};

module.exports = {
    getAllQuotes,
    getQuoteById,
    getQuotesByUserId,
    createQuote,
    updateQuote,
    deleteQuote,
};
