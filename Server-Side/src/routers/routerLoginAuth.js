import express from 'express';
import verifylogin from '../controller/accountAuth/login.js';
import authentication from '../middleware/authenticateToken.js';
import user from '../controller/users/userController.js';

const router = express.Router();

router.post("/login",authentication, verifylogin );
router.post("/signup",authentication, user.createUser);

export default router; 