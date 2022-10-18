const express = require('express');
const router = express.Router()
const jobController = require("../controllers/job.controller");
const fileUploader = require('../middleware/fileUploader');
const { verifyToken } = require('../middleware/verifyToken');


router
    .route('/')
    .get(jobController.findAllJob)
    .post(verifyToken, jobController.createJob)

router
    .post('/:id/apply', fileUploader.single("pdf"), jobController.applyJob)

router
    .route('/:id')
    .get(jobController.findOneJob).patch(jobController.updateJob)

module.exports = router