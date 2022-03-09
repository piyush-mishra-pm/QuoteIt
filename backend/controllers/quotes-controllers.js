const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const ErrorObject = require('../util/error-object');
const Quote = require('../models/quote');
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
const getQuoteById = async (req, res, next) => {
    const quoteId = req.params.quoteId;

    try{
        const quote = await Quote.findById(quoteId);

        if (!quote) {
            return next(new ErrorObject('No such quote exists.', 404));
        }

        return res.json({ quote : quote.toObject({getters:true}) });

    }catch(err){
        return next(new ErrorObject('Something went wrong, could not find the Quote.', 500));
    }
};

const getQuotesByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    // TODO: paginate the results by using cursor.
    let quotes;
    try{
        quotes = await Quote.find({ creatorId: userId });
    }catch(err){
        return next(new ErrorObject('Something went wrong, could not find the user Quotes.', 500));
    }

    if (!quotes || quotes.length === 0) {
        return next(new ErrorObject('No quotes found for the user.', 404));
    }

    res.json({ quotes : quotes.map(quote => quote.toObject({getters:true})) });
};

const getAllQuotes =async(req, res, next) => {
    // TODO: Paginate quotes:
    try{
        const allQuotes = await Quote.find({});
        return res.json(allQuotes.map(quote => quote.toObject({getters:true})));
    }
    catch(err){
        return next(new ErrorObject('Something went wrong, could not find all Quotes.', 500));
    }
}

const createQuote = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorObject('Invalid inputs!', 422);
    }
    try{
        const { quote, description, creatorId, image, authorName } = req.body;

        const createdQuote = new Quote({
            quote,
            description,
            creatorId: 'u1', // TODO: need to use the actual creatorId.
            image,
            authorName,
        });

        await createdQuote.save();
        return res.status(201).json({ createdQuote });
    } catch (err) {
        return next (new ErrorObject(`Failed creating quote: ${err}`, 500));
    }
};

const updateQuote = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorObject('Invalid inputs!', 422);
    }

    const { quote, description, image, authorName } = req.body;
    const quoteId = req.params.quoteId;

    try{
        let quoteToUpdate = await Quote.findById(quoteId);

        if (!quoteToUpdate) {
            return next(new ErrorObject(
                'Quote not found, cannot update the quote!',
                404
            ));
        }

        quoteToUpdate.quote = quote;
        quoteToUpdate.description = description;
        quoteToUpdate.authorName = authorName;
        quoteToUpdate.image = image;

        await quoteToUpdate.save();

        return res.status(200).json({ quote: quoteToUpdate.toObject({getters:true}) });
    }catch(err){
        return next(new ErrorObject(`Something went wrong. Failed updating the quote: ${err}`, 500));
    }
};

const deleteQuote = async (req, res, next) => {
    const quoteId = req.params.quoteId;

    try{
        const quote = await Quote.findById(quoteId);

        if(!quote){
            return next(new ErrorObject(
                'Quote not found, so cannot delete the quote.',
                404
            ));
        }

        await quote.remove();

        return res.status(200).json({ message: 'Deleted quote.' });

    }catch(err){
        return next(new ErrorObject(`Something went wrong. Failed deleting the quote: ${err}`, 500));
    }    
};

module.exports = {
    getAllQuotes,
    getQuoteById,
    getQuotesByUserId,
    createQuote,
    updateQuote,
    deleteQuote,
};
