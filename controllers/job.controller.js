const JobService  = require("../services/job.service");


exports.findAllJob = async (req, res, next) => {
    try{
        const jobs = await JobService.findAllJobService()
        return res.status(200).json({success: true, data: jobs})
    } 
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

exports.findOneJob = async (req, res, next) => {
    try{
        const {id:_id} = req.params
        
        const job = await JobService.findOneJobService(_id)
        return res.status(200).json({success: true, data: job})
    } 
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

exports.createJob = async (req, res, next) => {
    try {
      const job = await JobService.createJobService(req.body);
  
      res.status(200).json({success: true, data: job})
    } 
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
  }

  
exports.updateJob = async (req, res, next) => {
    const { id:_id } = req.params;
    try {
      const job = await JobService.updateJobService(_id, req.body);
      if (!job.modifiedCount) {
        return res.status(400).json({
            success: false,
            error: "Couldn't update the job with this id",
        });
      }
  
      res.status(200).json({success: true, data: job});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
  };