const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const ErrorObject = require('../util/error-object');
const User = require('../models/user');

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

const getUsers = async(req, res, next) => {
    try{
        // TODO: Need to paginate user list.
        const users = await User.find({}, '-password');
        res.status(200).json({ users: users.map( user => user.toObject({getters:true}) ) });
    }catch(err){
        return next(new ErrorObject('Something went wring while fetching user list', 500));
    }
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next (new ErrorObject('Invalid inputs!', 422));
    }
    const { name, email, password, image } = req.body;

    try{

        const existingUser = await User.findOne({ email });

        if(existingUser){ 
            return next(new ErrorObject(
                'Email already exists. Could not Signup the user!',
                404
            ));
        }

        const createdUser = new User({
            name,
            email,
            password,// TODO: Need to encrypt.
            image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            quotes:[]
        });

        await createdUser.save();

        // TODO: response also exposes password. Need to remove password from response.
        return res.status(201).json({ user: createdUser.toObject({getters:true}) });
    }catch(err){
        return next(new ErrorObject(`Something went wrong. Could not Signup the user! ${err}`, 500));
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
/*
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new ErrorObject('Wrong credentials!', 401);
    }
*/

    try {
        const userWithEmail = await User.findOne({ email });
        // userWith Email exists:
        if (!userWithEmail) {
            return next(
                new ErrorObject(
                    'Email or password incorrect. Try again.',
                    401
                )
            );
        }

        // TODO: encrypt the password supplied so that can be compared to encrypted stored password.
        
        // password matches stored password.
        if(userWithEmail.password !== password) {
            return next(
                new ErrorObject('Email or password incorrect. Try again.', 401)
            );
        }

        // Email and password have matched. Can login.

        // TODO: response also exposes password. Need to remove password from response.
        return res
            .status(200)
            .json({ message: 'Logged in.'});
    } catch (err) {
        return next(
            new ErrorObject(
                `Something went wrong. Could not perform Login! ${err}`,
                500
            )
        );
    }

    res.json({ message: 'Logged in!' });
};

module.exports = { getUsers, signup, login };
