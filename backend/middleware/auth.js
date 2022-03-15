const jwt = require('jsonwebtoken');

const ErrorObject = require('../util/error-object');
const SECRET_KEYS = require('../config/SECRET_KEYS');

module.exports = (req,res,next)=>{
    // When browser creates an OPTIONS request just before making actual POST requests.
    if(req.method==='OPTIONS'){
        return next();
    }
    // Header contains=> Authorization: 'Bearer TOKEN'
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new ErrorObject('Authentication failed', 401));
        }
        const decodedToken = jwt.verify(token, SECRET_KEYS.JWT_SECRET_KEY);
        req.userData = {userId:decodedToken.userId};
        next();
    }catch(err){
        return next(new ErrorObject('Something went wrong.', 500));
    }
};