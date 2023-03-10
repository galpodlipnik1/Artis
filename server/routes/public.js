import express from 'express';
import { getPublicImages, createPublicImage, updatePublicImage, deletePublicImage } from '../controllers/public.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:page', auth, getPublicImages);
router.post('/', createPublicImage);
router.put('/:id', auth, updatePublicImage);
router.delete('/:id', auth, deletePublicImage);

export default router;
