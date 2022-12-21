

require('dotenv').config();
const populateJson = require('./productas.json');
const Products = require('./model/shopAPI');
const connectDB = require('./db/connect');

const populate = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Products.deleteMany();
        await Products.create(populateJson);
        console.log('SUCCESS!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

populate();