const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request');

const { 
    register,
    // login,
    //logout

} = require('../controllers/authController');

// router.post('/register', register);
router.post('/register',registerSchema, register);
// router.get('/logout', logout);

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(7).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    });
    validateRequest(req,res, next, schema);
}

module.exports = router;