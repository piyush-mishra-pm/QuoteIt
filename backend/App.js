const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SECRET_KEYS = require('./config/SECRET_KEYS.js');

const quotesRoutes = require('./routes/quotes-routes');
const usersRoutes = require('./routes/users-routes');
const ErrorObject = require('./util/error-object');

const app = express();

app.use(bodyParser.json());

// CORS relevant:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/api/v1/quotes', quotesRoutes);
app.use('/api/v1/users', usersRoutes);

app.use((req, res, next) => {
    const error = new ErrorObject('Route not found.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(SECRET_KEYS.MONGODB_ADDRESS)
    .then(() => {
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    });
