const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const ErrorObject = require('../util/error-object');
/*
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'test@test.com',
        password: 'testers',
    },
];
*/
// DUMMY User data:
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Lorem Ipsum',
        image: 'https://images.pexels.com/photos/236149/pexels-photo-236149.jpeg?auto=compress&cs=tinysrgb&h=130',
        quoteCount: '1',// SHould remove? As it is derived property.
        email: 'test@test.com',
        password: 'testers',
    },
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorObject('Invalid inputs!', 422);
    }
    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new ErrorObject(
            'Email already exists, cannot create another one.',
            422
        );
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password,
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new ErrorObject('Wrong credentials!', 401);
    }

    res.json({ message: 'Logged in!' });
};

module.exports = { getUsers, signup, login };
