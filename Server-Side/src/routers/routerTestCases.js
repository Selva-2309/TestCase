import express from 'express';
import TestCasesController from '../controller/testCases/testCaseController.js';

const router = express.Router();

router.get("/TestCases",TestCasesController.getTestCases);
router.get("/TestCases/:id",TestCasesController.getTestCasesById);
router.post("/TestCases", TestCasesController.createTestCases);
router.put("/TestCases/:id",TestCasesController.updateTestCases);
router.delete("/TestCases/:id", TestCasesController.deleteTestCases);

export default router;