import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';

export const guard = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];

		try {
			const { id } = await jwt.verify(token, process.env.JWT_SECRET);
			const user = await UserModel.findById(id).select('-password -__v');

			if (!user) return res.send('Incorrect user from token!');
			req.user = user;

			next();
		} catch (error) {
			console.error(error);
			res.status(500).send(error.message);
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token found!');
	}
});
