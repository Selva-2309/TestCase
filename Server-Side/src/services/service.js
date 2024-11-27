import express from 'express';
import query from '../routers/routerQuery.js';
import users from '../routers/routerUsers.js';
import testcases from '../routers/routerTestCases.js';
import token from '../routers/routerToken.js';
import login from '../routers/routerLoginAuth.js';
import upload from '../routers/routerUpload.js';
import project from '../routers/routerProject.js';
import email from '../routers/routerEmail.js';

const router = express.Router();


router.use("/services",query);
router.use("/services/objects",users);
router.use("/services/objects",testcases);
router.use("/server/data",token);
router.use("/services/auth", login);
router.use("/services/objects", upload);
router.use("/services/objects",project);
router.use("/services/objects", email);

export default router;