const fs = require('fs');

const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const ErrorObject = require('../util/error-object');
const Quote = require('../models/quote');
const User = require('../models/user');
const mongoose = require('mongoose');

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
    let userQuotes;
    try{
        userQuotes = await User.findById(userId).populate('quotes');
    }catch(err){
        return next(new ErrorObject('Something went wrong, could not find the user Quotes.', 500));
    }

    if (!userQuotes || userQuotes.quotes.length === 0) {
        return next(new ErrorObject('No quotes found for the user.', 404));
    }

    res.json({ quotes : userQuotes.quotes.map(quote => quote.toObject({getters:true})) });
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
        return next(new ErrorObject('Invalid inputs!', 422));
    }
    try{
        const { quote, description, creatorId, image, authorName } = req.body;

        // Only when the creator actually exists in DB, we can then create the quote.
        const user = await User.findById(creatorId);

        if(!user) {
            return next(new ErrorObject('Could not find user for provided creatorId',404));
        }
        
        // Creator does exist, so lets create the quote.
        const createdQuote = new Quote({
            quote,
            description,
            creatorId,
            image:req.file.path,
            authorName,
        });

        // User exists, so can do transaction & session involving:
        // - create the quote.
        // - Adding the quoteId in user's quote list.
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdQuote.save({session: sess});
        user.quotes.push(createdQuote);
        await user.save({session: sess});
        await sess.commitTransaction();

        return res.status(201).json({ quote:createdQuote });

    } catch (err) {
        return next (new ErrorObject(`Failed creating quote: ${err}`, 500));
    }
};

const updateQuote = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next (new ErrorObject('Invalid inputs!', 422));
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
        const quote = await Quote.findById(quoteId).populate('creatorId');

        if(!quote){
            return next(new ErrorObject(
                'Quote not found, so cannot delete the quote.',
                404
            ));
        }

        const quoteImagePath = quote.image;     
        
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await quote.remove({session:sess});
        quote.creatorId.quotes.pull(quote);
        await quote.creatorId.save({session:sess});
        await sess.commitTransaction();

        fs.unlink(quoteImagePath, err=>{
            if(err) {
                console.log('Error while deleting Image file. : ',err);
            }
        });

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
