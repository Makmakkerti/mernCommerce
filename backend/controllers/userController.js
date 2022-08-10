import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';

// @desc Auth user and get JWT token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });

	if (!user || !(await user.matchPassword(password)))
		return res.send('Incorrect user or password!');

	res.send(email + ' ' + password);
});
