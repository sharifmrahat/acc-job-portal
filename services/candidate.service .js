const Candidate = require("../models/Candidate");

exports.createCandidateService = async (data) => {
    const candidate = await Candidate.create(data);
    return candidate;
  };

exports.findAllCandidateService = async (query) => {
    const candidate = await Candidate.find({...query?.data}).populate('appliedInfo');
    return candidate;
  };

  exports.findOneCandidateService = async (query) => {
    const candidate = await Candidate.findOne({...query?.data});
    return candidate;
  };