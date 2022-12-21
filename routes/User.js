

const express = require('express');
const router = express.Router();
const { 
    login,
    register
} = require('../controllers/User_controller');

/* post two routes -> into DB */

router.route('/login').post(login);
router.route('/register').post(register);


module.exports = router;