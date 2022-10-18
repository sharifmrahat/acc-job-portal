const Manager = require("../models/Manager");
const User = require("../models/User");

exports.createManagerService = async (data) => {
  const newManager = await Manager.create(data);
  return newManager;
};

exports.findOneManagerService = async (query) => {
  const manager = await User.find({ role: "manager", ...query?.data });
  return manager;
};

exports.findAllManagerService = async (query) => {
  const allManager = await User.find({ role: "manager", ...query?.data });
  return allManager;
};
