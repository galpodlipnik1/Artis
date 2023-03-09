import express from 'express';
import { getCloudImages, getCloudImage, createCloudImage, deleteCloudImage } from '../controllers/cloud.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getCloudImages);
router.get('/:id', auth, getCloudImage);
router.post('/', auth, createCloudImage);
router.delete('/:id', auth, deleteCloudImage);

export default router;
