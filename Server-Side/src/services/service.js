import express from 'express';
import query from '../routers/routerQuery.js';
import users from '../routers/routerUsers.js';
import testcases from '../routers/routerTestCases.js';
import results from '../routers/routerResults.js';
import token from '../routers/routerToken.js';

const router = express.Router();


router.use("/services/objects",query);
router.use("/services/objects",users);
router.use("/services/objects",testcases);
router.use("/services/objects",results);
router.use("/server/data",token);

export default router;