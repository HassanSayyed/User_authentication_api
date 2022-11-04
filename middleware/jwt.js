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
      
        if (role === "admin") return next();
      } 
  } 

  return res.status(StatusCodes.FORBIDDEN).json(getReasonPhrase(StatusCodes.FORBIDDEN));
  
}

const isUserToken = ( req, res, next) => {
  
  const bearerHeader = req.headers['authorization'];
  const req_id = req.body['id'];

  if (typeof bearerHeader !== 'undefined' ) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET, {ignoreExpiration: true}); 

      if (decoded){
        var role = decoded.role ; 
        var id = decoded.userId;
        
        console.log("role : "+role + " token id: "+id +"  req id "+req_id)
      
        if (role === "admin") { 
          return next();
        }else if (role === "user" && req_id === id) {
          return next();
        }
      } 
  } 

  return res.status(StatusCodes.UNAUTHORIZED).json(getReasonPhrase(StatusCodes.UNAUTHORIZED));
  
}

module.exports = {
  createJWT,
  isTokenValid,
  isAdminToken,
  isUserToken
};