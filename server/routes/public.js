import express from 'express';
import { getPublicImages, createPublicImage } from '../controllers/public.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:page', auth, getPublicImages);
router.post('/', createPublicImage);

export default router;
