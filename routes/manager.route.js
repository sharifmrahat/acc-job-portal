const express = require('express');
const managerController = require("../controllers/manager.controller");
const { verifyToken } = require('../middleware/verifyToken');
const authorization = require('../utils/authorization');

const router = express.Router();

router
    .route('/')
    .get(managerController.findAllManager)
    .post(managerController.createManager)

router
    .get('/jobs', verifyToken, authorization('manager'), managerController.selectedManagerJobs)

router
    .get('/jobs/:id', verifyToken, authorization('manager'), managerController.selectedManagerJobById)

router
    .route('/:id')
    .get(managerController.findManagerById)

module.exports = router
