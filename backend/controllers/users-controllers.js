const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorObject = require('../util/error-object');
const User = require('../models/user');
const SECRET_KEYS = require('../config/SECRET_KEYS.js');

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
    const { name, email, password } = req.body;

    try{

        const existingUser = await User.findOne({ email });

        if(existingUser){ 
            return next(new ErrorObject(
                'Email already exists. Could not Signup the user!',
                404
            ));
        }

        let encryptedPassword = await bcrypt.hash(password, SECRET_KEYS.BCRYPT_SALT_ROUNDS);

        const createdUser = new User({
            name,
            email,
            password: encryptedPassword,
            image: req.file.path,
            quotes:[]
        });

        await createdUser.save();

        const token = jwt.sign({ userId: createdUser.id, email: createdUser.email}, SECRET_KEYS.JWT_SECRET_KEY, {expiresIn:'1h'});

        return res.status(201).json({ userId:createdUser.id, token:token, email:createdUser.email });
    }catch(err){
        return next(new ErrorObject(`Something went wrong. Could not Signup the user! ${err}`, 500));
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

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
        
        let ifPasswordMatches = await bcrypt.compare(password, userWithEmail.password);
        
        // password matches stored password.
        if(!ifPasswordMatches) {
            return next(
                new ErrorObject('Email or password incorrect. Try again.', 401)
            );
        }

        // Email and password have matched. Can login. So Generate JWT.
        const token = jwt.sign(
            { userId: userWithEmail.id, email: userWithEmail.email },
            SECRET_KEYS.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res
            .status(200)
            .json({
                userId:userWithEmail.id,
                email:userWithEmail.email, 
                token: token,
            });
    } catch (err) {
        return next(
            new ErrorObject(
                `Something went wrong. Could not perform Login! ${err}`,
                500
            )
        );
    }

};

module.exports = { getUsers, signup, login };
