import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';
import { guard } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/login', authUser);
userRouter.get('/profile', guard, getUserProfile);

export default userRouter;
