import express from 'express';
import queryController from '../controller/queries/queryController.js';
import authentication from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/query",authentication, queryController.getQuery);

export default router;