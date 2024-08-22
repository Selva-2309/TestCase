import express from 'express';
import queryController from '../controller/queries/queryController.js';

const router = express.Router();

router.get("/query", queryController.getQuery);

export default router;