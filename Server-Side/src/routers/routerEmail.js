import express from 'express';
import authentication from '../middleware/authenticateToken.js';
import sendEmail from '../controller/email/controllerEmail.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/Email',upload.none(),sendEmail);

export default router;