const Job = require("../models/Job");
const AppliedInfo = require("../models/AppliedInfo");
const Candidate = require("../models/Candidate");

exports.createJobService = async (data) => {
    const newJob = await Job.create(data);
    return newJob;
  }
  
exports.findAllJobService = async (query) => {
    const jobs = await Job.find({...query?.data}).select({...query?.select}).sort(query?.sort).limit(query?.limit).populate(query.populate);
    return jobs;
  }

  
exports.findOneJobService = async (query) => {
  const job = await Job.findOne({ ...query?.data }).select({...query.select}).populate(query.populate)
    return job;
  }
  
  exports.updateJobService = async (query, data) => {
    const updatedJob = await Job.updateOne({ ...query?.data }, data, {
      runValidators: true
    });
    return updatedJob;
  }

  exports.appliedJobInfoService = async (data) => {
    const applyJob = await AppliedInfo.create({...data});

    const {_id: appliedInfoId, candidate, job} = applyJob;
  
     const updateJob = await Job.updateOne(
      {_id:job},

      {
        $inc:{totalApplied:1}, $push : {appliedInfo: {id:appliedInfoId, candidateId:candidate},
      }, $push:{candidates:candidate},}
      )

     const updateCandidate = await Candidate.updateOne(
      {_id:candidate},
      {$push : {appliedInfo: appliedInfoId,
      jobs:job}}
      )
    return applyJob;
  }

  exports.findAppliedJobService = async (query) => {
    const appliedJob = await AppliedInfo.findOne({ ...query?.data })
    return appliedJob;
  }


