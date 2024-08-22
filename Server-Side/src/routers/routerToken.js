import express from 'express';
import token from '../controller/token/token.js';

const router = express.Router();

router.post("/token", token);

export default router;