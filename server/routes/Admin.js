import {Router} from 'express';
import * as AdminController from '../controllers/AdminController';
let router = Router();

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);
router.get('/getAllPendingRequests', AdminController.getAllPendingRequests);
router.post('/updatestatus', AdminController.updateStatus);

export default router;