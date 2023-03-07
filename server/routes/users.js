import express from 'express';
import { signIn, signUp, getUser, getUsers, updateUser, deleteUser } from '../controllers/users.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/getuser', auth, getUser);
router.get('/getusers', auth, getUsers);
router.patch('/updateuser/:id', auth, updateUser);
router.delete('/deleteuser/:id', auth, deleteUser);

export default router;
