import {Router} from 'express';
import * as ClientController from '../controllers/ClientController';
let router = Router();

router.post('/loginrequest', ClientController.loginrequest);
router.get('/loginstatus', ClientController.loginstatus);

export default router;