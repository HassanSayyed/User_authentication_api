const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const { isAdminToken } = require('../middleware/index')

const check = async (req, res)=>{
    const bearerHeader = req.headers['authorization'];

    console.log("1")

    if (typeof bearerHeader !== 'undefined' ) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // req.token = bearerToken;
        console.log("2 "+ bearerToken)
        const isAdmin = isAdminToken({bearerToken});
        res.status(StatusCodes.OK).json(isAdmin);
    } else {
        res.status(403).json("undefined");
    }
}



module.exports = {
    check
};