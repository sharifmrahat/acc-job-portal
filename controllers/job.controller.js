const JobService = require("../services/job.service");

exports.findAllJob = async (req, res, next) => {
  try {
    const jobs = await JobService.findAllJobService();
    return res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.findOneJob = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const query = {};
    query.data = { _id };
    const job = await JobService.findOneJobService(query);
    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const deadline = new Date(new Date().setDate(new Date().getDate() + 7));
    if (req.user) {
      req.body.manager = { ...req.user, id: req.user._id };
    }
    const job = await JobService.createJobService({
      ...req.body,
      deadline: req.body.deadline ? req.body.deadline : deadline,
    });

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateJob = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const job = await JobService.updateJobService(_id, req.body);
    if (!job.modifiedCount) {
      return res.status(400).json({
        success: false,
        error: "Couldn't update the job with this id",
      });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const query = {};
    const jobId = { id: req.params.id };
    const { candidateId } = req.body;
    const queryJob = { jobId, candidateId };
    queryJob.data = { _id: jobId.id };

    const selectedJob = await JobService.findOneJobService(queryJob);

    if (!selectedJob.deadline > new Date()) {
      return res.status(400).json({
        success: false,
        error: "Deadline is over for this job",
      });
    }
    const appliedJob = {};

    appliedJob.data = { candidate: candidateId, job: jobId.id };

    const alreadyApplied = await JobService.findAppliedJobService(appliedJob);

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        error: "You already applied on this job",
      });
    }

    const { resumeId } = req.body;
    const result = await JobService.appliedJobInfoService({
      resumeId,
      candidate: candidateId.toString(),
      job: req.params.id.toString(),
    });

    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
