const jwt = require('jsonwebtoken');

const createJWT = ( {payload} ) => {
  const token = jwt.sign( payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);


const isAdminToken = ({token}) => {
  console.log("3")
  const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  console.log("4") 
  var role = decoded.role ; 
  console.log("5")
  return role === "admin";
}


module.exports = {
  createJWT,
  isTokenValid,
  isAdminToken
};