import express from 'express';
import asyncHandler from 'express-async-handler';
import ProductModel from '../models/ProductModel.js';

const productRouter = express.Router();

productRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await ProductModel.find();
		res.json(products);
	})
);

productRouter.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await ProductModel.findById(req.params.id);
		if (!product) return res.status(404).json({ message: 'not found' });
		res.json(product);
	})
);

export default productRouter;
