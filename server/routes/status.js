import express from 'express';
import { DbStatus, ServerStatus, UserStats } from '../controllers/status.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/db', DbStatus);
router.get('/server', ServerStatus);
router.get('/user/:id', auth, UserStats);

export default router;
