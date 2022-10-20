const JobService = require("../services/job.service");
const candidateService  = require("../services/candidate.service");

exports.findAllJob = async (req, res, next) => {
  try{
    const query = {}
    let queryString = JSON.stringify(req.query)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

    query.data = JSON.parse(queryString)
    query.select = {
      candidates:0,
      appliedInfo:0
    }
      const jobs = await JobService.findAllJobService(query)
      return res.status(200).json({
        success: true, data: jobs
        })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.findOneJob = async (req, res, next) => {
  try {
    const {id:_id} = req.params
    const query={}
    query.data = {_id}
    query.select = {
      candidates:0,
      appliedInfo:0
    }
    const job = await JobService.findOneJobService(query);
    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const deadline = new Date(new Date().setDate((new Date().getDate()+Math.round(Math.random()*10))%30))

      if(req.user){
        req.body.manager = {...req.user, id:req.user._id}
      }
      const job = await JobService.createJobService({...req.body, deadline: req.body.deadline ? req.body.deadline : deadline});
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateJob = async (req, res, next) => {
  const { _id } = req.user;
  const data = req.body
    const query = {};
    if (_id) {
      query.data = { "manager.id": _id, "_id": req.params.id};
    }
  try {
    const job = await JobService.updateJobService(query, data);
    if (!job.matchedCount) {
      return res.status(400).json({
        success: false,
        error: "Job id not found in your list",
      });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const {_id} = req.user
    const currentCandidate = await candidateService.findOneCandidateService({data:{'user.id':_id}})
    const jobId =  req.params.id
    const candidateId  = currentCandidate._id
    const selectedJob = {jobId, candidateId}
    selectedJob.data = {_id: jobId}

    const jobData = await JobService.findOneJobService(selectedJob)
     if(!jobData){
      return res.status(400).json({success: false, error: "No Job Found"})
     }

    if(!jobData?.deadline >= new Date()){
      return res.status(400).json({success: false, error: "Deadline is over for this job"})
    }

    const appliedJobQuery={}
    appliedJobQuery.data = ({'candidate':candidateId,'job':jobId})

    const isApplied = await JobService.findAppliedJobService(appliedJobQuery)

    if(isApplied){
      return res.status(400).json({success: false, error: "You already applied on this job"})
    }

    const {resumeId} = req.body

      const result =  await JobService.appliedJobInfoService({resumeId, candidate: candidateId.toString(), job: req.params.id.toString() });
  
      res.status(200).json({success: true, result: result})
    } catch (error) {
      console.log(error)
      res.status(400).json({success: false, error: error.message})
    }
};
