const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request');

const { 
    register,
    login,
   

} = require('../controllers/authController');


router.post('/register', registerSchema, register);

router.post('/login', loginSchema, login);

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required()
    });
    validateRequest(req,res, next, schema);
}

function loginSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required()
    });
    validateRequest(req,res, next, schema);
}

module.exports = router;