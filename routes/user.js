const express = require('express');
const router = express.Router();
const Joi = require('joi');
var mongoose = require('mongoose');
const validateRequest = require('../middleware/validate-request');
const { isAdminToken, isUserToken } = require('../middleware/index')

const { 
    check,
    getAllUsers,
    updateUser,
    addUser,
    deleteUser

} = require('../controllers/userController');

router.get('/isToken', isAdminToken ,check);

router.get('/allusers',  isAdminToken , getAllUsers);

router.patch('/update', isUserToken , updateUserSchema,  updateUser);

router.post('/add', isAdminToken, addUserSchema, addUser);

router.delete('/delete', isAdminToken, deleteUserSchema, deleteUser);


function addUserSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.email().required(),
        password: Joi.string().min(6).max(50).required()
    });
    validateRequest(req, res, next, schema);
}


function updateUserSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().custom(  (value, helper)=>{
            if(!mongoose.Types.ObjectId.isValid(value)){
                return helper.message("wrong id formate");
            }
        }).required(),
        name: Joi.string().min(3).max(50).required()
    });
    validateRequest(req, res, next, schema);
}

function deleteUserSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().custom(  (value, helper)=>{
            if(!mongoose.Types.ObjectId.isValid(value)){
                return helper.message("wrong id formate");
            }
        }).required()
    });
    validateRequest(req, res, next, schema);
}

module.exports = router;