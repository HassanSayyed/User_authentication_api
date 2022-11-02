const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const { isAdminToken } = require('../middleware/index')

const check = async (req, res)=>{
   res.status(StatusCodes.OK).json("admin verified");
}



module.exports = {
    check
};