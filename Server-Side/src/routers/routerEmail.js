import express from 'express';
import authentication from '../middleware/authenticateToken.js';
import sendEmail from '../controller/email/controllerEmail.js';
import multer from 'multer';
import sendOTP from '../controller/email/sendOTP.js';
import verifyOTP from '../controller/email/verifyOTP.js';

const router = express.Router();
const upload = multer();

router.post('/Email',upload.none(),authentication,sendEmail);
router.post('/send-otp/:email',authentication, sendOTP);
router.post('/verify-otp/:email',authentication, verifyOTP);

export default router;