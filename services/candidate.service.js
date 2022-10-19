const Candidate = require("../models/Candidate");

exports.createCandidateService = async (data) => {
    const newCandidate = await Candidate.create(data);
    return newCandidate;
  };

exports.findAllCandidateService = async (query) => {
    const candidates = await Candidate.find({...query?.data}).populate('appliedInfo');
    return candidates;
  };

  exports.findOneCandidateService = async (query) => {
    const candidate = await Candidate.findOne({...query?.data});
    return candidate;
  };