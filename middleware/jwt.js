const jwt = require('jsonwebtoken');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');



const createJWT = ( {payload} ) => {
  const token = jwt.sign( payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET );


const isAdminToken = (req, res, next) => {

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined' ) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET, {ignoreExpiration: true}); 

      if (decoded){
        var role = decoded.role ; 
      
        if (role === "admin") next();
      } 
  } 

  return res.status(StatusCodes.FORBIDDEN).json(getReasonPhrase(StatusCodes.FORBIDDEN));
  
}


module.exports = {
  createJWT,
  isTokenValid,
  isAdminToken
};