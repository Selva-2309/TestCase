import express from 'express';
import resultController from '../controller/results/resultController.js';

const router = express.Router();

router.get("/Result",resultController.getScreenshots);
router.get("/Result/:id",resultController.getScreenshotsById);
router.post("/Result", resultController.createScreenshots);
router.put("/Result/:id",resultController.updateScreenshots);
router.delete("/Result/:id", resultController.deleteScreenshots);

export default router;