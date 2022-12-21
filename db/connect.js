
/* connecting App to DB */

const mongoose = require('mongoose');

const connectDB = (url) => {
    console.log('connecting to DB..');
    return mongoose.connect(url);
}

module.exports = connectDB;