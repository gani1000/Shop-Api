

const { StatusCodes } = require('http-status-codes');

const ErrorHandler = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).send('Route dose not exits');
}

module.exports = ErrorHandler;