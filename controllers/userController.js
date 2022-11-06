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

const addUser = async (req, res)=> {

    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json( "User already exist" );
    }
  
    
    let user = {};
    try {
       user = await User.create({ name, email, password, role:'user' })
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({error: err.message});
    }
  
    res.status(StatusCodes.CREATED).json({ id: user._id, name: user.name, email: user.email });
}


const deleteUser = async (req, res)=> {

    const id  = req.body.id;
  
    try {
        await User.findOneAndDelete({ _id: id });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( "could not delete" );
    }


    return res.status(StatusCodes.OK).json("user deleted");
}


module.exports = {
    check,
    getAllUsers,
    updateUser,
    addUser,
    deleteUser

};