const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request');
const { isAdminToken, isUserToken } = require('../middleware/index')

const { 
    check,
    getAllUsers,
    updateUser

} = require('../controllers/userController');

router.get('/isToken', isAdminToken ,check);

router.get('/allusers',  isAdminToken , getAllUsers);

router.patch('/update', isUserToken , updateUser);





module.exports = router;