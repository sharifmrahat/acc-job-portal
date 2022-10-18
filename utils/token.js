const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
    name: userInfo.firstName + ' ' + userInfo.lastName
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "7days"
  });

  return token;
};