import express from 'express';
import { authUser, createUser, getUserProfile } from '../controllers/userController.js';
import { guard } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/login', authUser);
userRouter.post('/', createUser);
userRouter.get('/profile', guard, getUserProfile);

export default userRouter;
