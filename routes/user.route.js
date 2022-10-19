const express = require('express');
const userController = require("../controllers/user.controller");
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router()

router
    .route('/signup')
    .post(userController.signupUser)

router
    .route('/login')
    .post(userController.loginUser)

router
    .get("/me", verifyToken, userController.getAuth);

module.exports = router
