import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';

import UserModel from './models/UserModel.js';
import ProductModel from './models/ProductModel.js';
import OrderModel from './models/OrderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const deleteData = async () => {
	try {
		await OrderModel.deleteMany();
		await ProductModel.deleteMany();
		await UserModel.deleteMany();

		console.log('Data successfully deleted!');
	} catch (error) {
		console.error(`Error in seeder.js while deleting: ${error.message}`);
	}
};

const importData = async () => {
	try {
		await deleteData();

		const createdUsers = await UserModel.insertMany(users);
		const [user, ...rest] = createdUsers;
		const sampleProducts = products.map((p) => ({ ...p, user: user._id }));

		await ProductModel.insertMany(sampleProducts);

		console.log('Sample data successfully imported!');
	} catch (error) {
		console.error(`Error in seeder.js while importing: ${error.message}`);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
