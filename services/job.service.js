const Job = require("../models/Job");

exports.createJobService = async (data) => {
    const newJob = await Job.create(data);
    return newJob;
  }
  
exports.findAllJobService = async (query) => {
    const jobs = await Job.find({...query?.data}).limit(query?.limit);
    return jobs;
  }

  
exports.findOneJobService = async (_id) => {
  const job = await Job.find({ ...query?.data }).populate('candidates')
    return job;
  }
  
  exports.updateJobService = async (_id, data) => {
    const updatedJob = await Job.updateOne({ _id }, data, {
      runValidators: true
    });
    return updatedJob;
  }