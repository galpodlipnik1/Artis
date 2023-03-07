import express from 'express';
import { DbStatus, ServerStatus } from '../controllers/status.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/db', DbStatus);
router.get('/server', ServerStatus);

export default router;
