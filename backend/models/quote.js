const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String, required: true },
    image: { type: String, required: true },

    // TODO: Make as Object-ID
    creatorId: { type: mongoose.Types.ObjectId, ref:'User', required: true },
});

module.exports = mongoose.model('Quote', quoteSchema);