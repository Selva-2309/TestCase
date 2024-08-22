import express from 'express';
import userController from '../controller/users/userController.js';

const router = express.Router();

router.get("/User",userController.getUsers);
router.get("/User/:id",userController.getUsersById);
router.post("/User", userController.createUser);
router.put("/User/:id",userController.updateUser);
router.delete("/User/:id", userController.deleteUser);

export default router;