const express = require('express');
const router = express.Router();

const { 
    register,
    // login,
    //logout

} = require('../controllers/authController');

// router.post('/register', register);
router.post('/register', register);
// router.get('/logout', logout);

module.exports = router;