const express = require('express');
const router = express.Router();
const { Question, Category } = require('./schema.js');
const { register, login } = require('./auth.js')



router.route('/login').post(login);

router.route('/register').post(register);

 
module.exports = router;