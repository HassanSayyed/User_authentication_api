const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request');

const { 
    check
   

} = require('../controllers/userController');

router.get('/isToken', check)



module.exports = router;