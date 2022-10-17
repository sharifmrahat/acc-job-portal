const Job = require("../models/Job");

exports.createJobService = async (data) => {
    const newJob = await Job.create(data);
    return newJob;
  }
  
exports.findAllJobService = async () => {
    const jobs = await Job.find();
    return jobs;
  }

  
exports.findOneJobService = async (_id) => {
    const job = await Job.findOne({ _id })
    return job;
  }
  
  exports.updateJobService = async (_id, data) => {
    const updatedJob = await Job.updateOne({ _id }, data, {
      runValidators: true
    });
    return updatedJob;
  }