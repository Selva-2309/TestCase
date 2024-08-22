import express from 'express';
import query from '../routers/routerQuery.js';
import users from '../routers/routerUsers.js';
import testcases from '../routers/routerTestCases.js';
import results from '../routers/routerResults.js';

const router = express.Router();


router.use("/services/objects",query);
router.use("/services/objects",users);
router.use("/services/objects",testcases);
router.use("/services/objects",results)

export default router;