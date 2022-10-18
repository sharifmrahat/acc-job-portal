const express = require('express');
const router = express.Router()
const jobController = require("../controllers/job.controller");
const { verifyToken } = require('../middleware/verifyToken');


router
    .route('/')
    .get(jobController.findAllJob)
    .post(verifyToken, jobController.createJob)

router
    .post('/:id/apply', jobController.applyJob)

router
    .route('/:id')
    .get(jobController.findOneJob).patch(jobController.updateJob)

module.exports = router