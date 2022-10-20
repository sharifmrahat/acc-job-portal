const managerService = require("../services/manager.service");
const jobService = require("../services/job.service");

exports.createManager = async (req, res, next) => {
  try {
    const result = await managerService.createManagerService(req.body);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.findManagerById = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const query = {};

    if (_id) {
      query.data = { _id };
    }
    const result = await managerService.findOneManagerService(query);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.findAllManager = async (req, res, next) => {
  try {
    const result = await managerService.findAllManagerService();

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.selectedManagerJobs = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const query = {};
    if (_id) {
      query.data = { "manager.id": _id,};
      query.limit = +req.query.limit
    }
   

    const result = await jobService.findAllJobService(query);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.selectedManagerJobById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const query = {};
    if (_id) {
      query.data = { "manager.id": _id };
      query.id = req.params.id
    }
    const result = await jobService.findOneJobService(query);
    res.status(200).json({success: true, result: result})
  } catch (error) {
    res.status(400).json({success: false, error: error.message})
  }
};
