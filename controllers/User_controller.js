
const { StatusCodes } = require('http-status-codes')
const { BadRequest, Unauthenticated } = require('../Error/script');
const User = require('../model/UserSchema');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    console.log(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token});
}


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ ...req.body })
    if (!email || !password) {
        throw new BadRequest('Please provide Email, and password!');
    }
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthenticated('Invalid credentials Email');
    }
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword){
        throw new Unauthenticated('password is not correct');
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token});
}

module.exports = {
    login,
    register
};