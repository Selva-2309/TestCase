import express from 'express';
import authentication from '../middleware/authenticateToken.js';
import project from '../controller/projects/projectController.js';


const router = express.Router();

router.get('/Project', authentication,project.getProject);
router.post('/Project', authentication, project.createProject);
router.put('/Project/:id', authentication, project.updateProject);
router.delete('/Project/:id', authentication, project.deleteProject);

export default router;