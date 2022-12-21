
const { NotFound } = require('../Error/script');
const { StatusCodes } = require('http-status-codes');

const ErrorHandlerMiddleWare = (err, req, res, next) => {

    // let customError = {
    //     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    //     mes: err.message || 'Something went wrong, please try again later'
    // };

    if (err instanceof NotFound){
        return res.status(err.statusCode).json({ mes: err.message });
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ mes: `Something went wrong, ${err}`});
}

module.exports = ErrorHandlerMiddleWare;