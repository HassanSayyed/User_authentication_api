const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const { createJWT} = require('../middleware/index')


const register = async (req, res) => {
    const { email, name, password } = req.body;
  
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json( "User already exist" );
    }
  
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    
    let user = {};
    try {
       user = await User.create({ name, email, password, role })
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({error: err.message});
    }
    
    
    const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const token = createJWT({payload : tokenUser});
    res.status(StatusCodes.CREATED).json({ ...tokenUser, token });
  };

const login = async  (req ,res)=> {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  console.log(userExists);

  if ( !userExists) {
    return res.status(StatusCodes.UNAUTHORIZED).json( "Account does not exist" );
  }

  const isPasswordCorrect = await userExists.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json( "incorrect password" );
  }


  const tokenUser = { name: userExists.name, userId: userExists._id, role: userExists.role };
  const token = createJWT({payload : tokenUser});
  res.status(StatusCodes.OK).json({ token });
}



  module.exports = {
    register,
    login,
  };