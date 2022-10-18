const express = require('express');
const router = express.Router()
const candidateController = require("../controllers/candidate.controller");

router
    .route("/")
    .get(candidateController.findAllCandidate)
    .post(candidateController.createCandidate)


module.exports = router