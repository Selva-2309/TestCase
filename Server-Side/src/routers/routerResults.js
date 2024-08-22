import express from 'express';
import resultController from '../controller/results/resultController.js';
import authentication from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/Result", authentication, resultController.getScreenshots);
router.get("/Result/:id", authentication, resultController.getScreenshotsById);
router.post("/Result", authentication, resultController.createScreenshots);
router.put("/Result/:id", authentication, resultController.updateScreenshots);
router.delete("/Result/:id", authentication, resultController.deleteScreenshots);

export default router;