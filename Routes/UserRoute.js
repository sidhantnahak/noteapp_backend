const express = require('express');
const router = express.Router();
const User = require('../Models/Usermodel')
const {userLogin, registerUser, GetUser, Logout}=require('../Controllers/UserController');
const { isAuthenticated } = require('../middleware/Auth');



router.route('/login').post(userLogin)
router.route('/register').post(registerUser)
router.route('/me').post(isAuthenticated,GetUser)
router.route('/logout').get(isAuthenticated,Logout)


module.exports = router;
