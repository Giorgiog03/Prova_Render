// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.registerUser);

// POST /api/auth/login
router.post('/login', authController.loginUser);

// POST /api/auth/refresh 
router.post('/refresh', authController.refreshToken);

// POST /api/auth/logout
router.post('/logout', authController.logoutUser); // verifyAccessToken non serve qui perché si basa sul cookie

module.exports = router;
