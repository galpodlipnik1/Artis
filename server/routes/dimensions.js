import express from 'express';
import { getPresets, getPreset, createPreset, deletePreset } from '../controllers/dimensions.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getPresets);
router.get('/:id', getPreset);
router.post('/', auth, createPreset);
router.delete('/:id', auth, deletePreset);

export default router;
