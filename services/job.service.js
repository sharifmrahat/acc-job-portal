const Job = require("../models/Job");
const AppliedInfo = require("../models/AppliedInfo");
const Candidate = require("../models/Candidate");

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

  exports.appliedJobInfoService = async (data) => {
    const applyJob = await AppliedInfo.create({...data});
    const {_id:appliedInfoId, candidate, job}= applyJob;
  
     const updateJob = await Job.updateOne(
      {_id:job},

      {$push : {appliedInfo: {id:appliedInfoId, candidateId:candidate},
      candidates:candidate}}
      )

     const updateCandidate = await Candidate.updateOne(
      {_id:candidate.toString()},
      {$inc: {totalApplied:1}},
      {$push : {appliedInfo: appliedInfoId,
      jobs:job}}
      )
    return applyJob;
  }

  exports.findAppliedJobService = async (query) => {
    const appliedJob = await AppliedInfo.findOne({ ...query?.data })
    return appliedJob;
  }


