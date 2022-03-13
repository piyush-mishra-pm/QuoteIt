const express = require('express');
const { check } = require('express-validator');

const quotesController = require('../controllers/quotes-controllers');

const router = express.Router();

router.get('/all', quotesController.getAllQuotes);

router.get('/:quoteId', quotesController.getQuoteById);

router.get('/user/:userId', quotesController.getQuotesByUserId);

router.post(
    '/',
    [
        check('quote').not().isEmpty(),
        check('quote').isLength({ min: 1 }),
        check('quote').isLength({ max: 200 }),
        check('description').isLength({ min: 5 }),
        check('description').isLength({ max: 500 }),
        // TODO: Add validation checks yet for Author name and Image.
        
    ],
    quotesController.createQuote
);

router.patch(
    '/:quoteId',
    [
        check('quote').not().isEmpty(),
        check('quote').isLength({ min: 1 }),
        check('quote').isLength({ max: 200 }),
        check('description').isLength({ min: 5 }),
        check('description').isLength({ max: 500 }),
        check('image').isURL(),
    ],
    quotesController.updateQuote
);

router.delete('/:quoteId', quotesController.deleteQuote);

module.exports = router;