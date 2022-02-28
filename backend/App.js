const express = require('express');
const bodyParser = require('body-parser');

const quotesRoutes = require('./routes/quotes-routes');
const usersRoutes = require('./routes/users-routes');
const ErrorObject = require('./util/error-object');

const app = express();

app.use(bodyParser.json());

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

app.listen(4000);
