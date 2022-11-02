const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request');
const { isAdminToken } = require('../middleware/index')

const { 
    check
   

} = require('../controllers/userController');

router.get('/isToken', isAdminToken ,check)



module.exports = router;