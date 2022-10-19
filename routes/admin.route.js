const express = require('express');
const router = express.Router()
const candidateController = require("../controllers/candidate.controller");
const { verifyToken } = require('../middleware/verifyToken');
const authorization = require('../utils/authorization');


router
    .route("/candidates")
    .get(verifyToken, authorization('admin'), candidateController.findAllCandidate)

router
    .route("/candidates/:id")
    .get(verifyToken, authorization('admin'), candidateController.findAllCandidate)


module.exports = router