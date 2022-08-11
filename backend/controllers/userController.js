import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc Auth user and get JWT token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });

	if (!user || !(await user.matchPassword(password)))
		return res.send('Incorrect user or password!');

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		token: generateToken(user._id),
	});
});

// @desc Get User Profile
// @route Get /api/users/profile
// @access Private (JWT)
export const getUserProfile = asyncHandler(async (req, res) => {
	const id = req?.user?._id;
	const user = await UserModel.findById(id);

	if (!user) return res.status(404).send('User not found!');

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	});
});
