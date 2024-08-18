import express from 'express';
import TestCasesController from '../controller/testCases/testCaseController.js';
import authentication from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/TestCases", authentication, TestCasesController.getTestCases);
router.get("/TestCases/:id", authentication, TestCasesController.getTestCasesById);
router.post("/TestCases",authentication, TestCasesController.createTestCases);
router.put("/TestCases/:id",authentication, TestCasesController.updateTestCases);
router.delete("/TestCases/:id", authentication, TestCasesController.deleteTestCases);

export default router;