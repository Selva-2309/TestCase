import express from 'express';
import upload from '../controller/uploadFiles/uploadFiles.js';
import fileController from '../controller/uploadFiles/fileController.js';
import authentication from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/upload',authentication,upload.single('file'),fileController);

export default router;