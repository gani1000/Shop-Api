

const { Unauthenticated } = require('../Error/script');
const jwt = require('jsonwebtoken');

const AuthenticationMiddleWareErrorHandler = async (req, res, next) => {
    
    const AuthorizedHeaders = req.headers.authorization;
    if (!AuthorizedHeaders || !AuthorizedHeaders.startsWith('Bearer')){
        throw new Unauthenticated('Invalid credentials Not Authorized');
    }
    const token = AuthorizedHeaders.split(' ')[1];
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: verify.userID, name: verify.name };
        next();
    } catch (error) {
        throw new Unauthenticated('Invalid credentials');
    }
}

module.exports = AuthenticationMiddleWareErrorHandler;