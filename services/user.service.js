const User = require("../models/User");

exports.createUserService = async (data) => {
    const newUser = await User.create(data);
    return newUser;
  };

  exports.findUserService = async (data) => {
    const user = await User.findOne({...data});
    return user;
  };
