
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide user name!'],
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        minlength: 4,
        maxlength: 40,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 3
    }
});

/* Hashed password and store it in DB/ using mongoose instance middleware */
UserSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

/* create a jwt token and pass it to next middleware */
UserSchema.methods.createJWT = function () {
    return jwt
    .sign({ 
        user: { 
            userID: this._id,
            username: this.name
        }}, 
         process.env.JWT_SECRET
        ,{ 
            expiresIn: process.env.JWT_LIFETIME
        });
}

UserSchema.methods.comparePassword = async function (candatespassword) {
    const isMatch = await bcryptjs.compare(candatespassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);