
const AuthenticateMiddleWareProfile = require('../middleware/authUser');
const express = require('express');
const router = express.Router();
const {
    getAllStaticProducts,
    getAllProducts,
    getAllProductsByID
} = require('../controllers/shopAPI');

router.route('/static').get(getAllStaticProducts);
router.route('/').get(getAllProducts);
router.route('/:id').get(AuthenticateMiddleWareProfile,getAllProductsByID);


module.exports = router;