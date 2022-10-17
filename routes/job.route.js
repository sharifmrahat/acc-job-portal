const express = require('express');
const jobController = require("../controllers/job.controller");
const router = express.Router()

router
    .route('/')
    .get(jobController.findAllJob)
    .post(jobController.createJob)

router
    .route('/:id')
    .get(jobController.findOneJob)
    .patch(jobController.updateJob)

module.exports = router