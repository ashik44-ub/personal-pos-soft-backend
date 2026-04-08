const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, resetPassword, verifyEmail } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
