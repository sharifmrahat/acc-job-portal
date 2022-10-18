const candidateService  = require("../services/candidate.service");


exports.createCandidate = async (req, res, next) => {
    try {      
      const candidate = await candidateService.createCandidateService(req.body);
  
      res.status(200).json({ success: true, data: candidate });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  exports.findAllCandidate = async (req, res, next) => {
    try {
  
      const candidates = await candidateService.findAllCandidateService(req.body);
  
      res.status(200).json({ success: true, data: candidates });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  