const express = require('express');
const managerController = require("../controllers/manager.controller");
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router
    .route('/')
    .get(managerController.findAllManager)
    .post(managerController.createManager)

router
    .get('/jobs', managerController.selectedManagerJobs)

router
    .get('/jobs/:id', managerController.selectedManagerJobById)

router
    .route('/:id')
    .get(managerController.findManagerById)

module.exports = router
