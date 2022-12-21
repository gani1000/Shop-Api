

const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide product name']
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    phone: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'please provide product price']
    },
    company: {
        type: String,
        enum: {
            values: ['apple', 'samsung', 'sony', 'huawei'],
            message: '{VALUE} is not supported',
        }
    },
    createdAt: {
        type: Date,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Products', ProductsSchema);