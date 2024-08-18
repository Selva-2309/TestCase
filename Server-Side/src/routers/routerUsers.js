import express from 'express';
import userController from '../controller/users/userController.js';
import authentication from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/User",authentication, userController.getUsers);
router.get("/User/:id", authentication, userController.getUsersById);
router.post("/User", authentication, userController.createUser);
router.put("/User/:id", authentication, userController.updateUser);
router.delete("/User/:id", authentication, userController.deleteUser);

export default router;