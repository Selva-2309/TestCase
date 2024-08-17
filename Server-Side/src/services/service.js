import express from 'express';
import query from '../routers/routerQuery.js';
import users from '../routers/routerUsers.js';

const router = express.Router();


router.use("/services/objects",query);
router.use("/services/objects",users);

export default router;