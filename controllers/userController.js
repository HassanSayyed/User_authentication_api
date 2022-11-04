const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const User = require('../models/User');


const check = async (req, res)=>{
   res.status(StatusCodes.OK).json("admin verified");
}


const getAllUsers = async (req, res)=>{

    const all_users = await User.find({role:'user'});

    return res.status(StatusCodes.OK).json({ users: all_users })
}


const updateUser = async (req, res)=> {

    const id = req.body.id;
    const name = req.body.name;

   
    const user = await User.findOne({ _id: id });

    if ( user === null)
        return res.status(StatusCodes.NOT_FOUND).json("user not found");

    user.name = name;
    await user.save();

    if(!updateUser)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));

    return res.status(StatusCodes.OK).json("updated succefully")
}



module.exports = {
    check,
    getAllUsers,
    updateUser

};