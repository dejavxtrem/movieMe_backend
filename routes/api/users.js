const express = require('express');
const router = express.Router();
const User = require('../../models/movieusers');
const usersCtrl = require('../../controllers/usercontrollers');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);


// /*---------- Protected Routes ----------*/




module.exports = router;