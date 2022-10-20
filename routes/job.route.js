const express = require('express');
const router = express.Router()
const jobController = require("../controllers/job.controller");
const fileUploader = require('../middleware/fileUploader');
const { verifyToken } = require('../middleware/verifyToken');
const authorization = require('../utils/authorization');


router
    .route('/')
    .get(jobController.findAllJob)
    .post(verifyToken, authorization('manager'), jobController.createJob)

router
    .post('/:id/apply', verifyToken,authorization('candidate'), fileUploader.single("pdf"), jobController.applyJob)

router
    .route('/:id')
    .get(jobController.findOneJob)
    .patch(verifyToken, authorization('manager'), jobController.updateJob)

module.exports = router