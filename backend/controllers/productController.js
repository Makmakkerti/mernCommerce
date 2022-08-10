import asyncHandler from 'express-async-handler';
import ProductModel from '../models/ProductModel.js';

export const getProducts = asyncHandler(async (req, res) => {
	const products = await ProductModel.find();
	res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
	const product = await ProductModel.findById(req.params.id);
	if (!product) return res.status(404).json({ message: 'Product not found' });
	res.json(product);
});
