import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import products from './data/products.js';
import connect from './config/db.js';

dotenv.config();
connect();

const app = express();
app.get('/', (req, res) => {
	res.status(200).send({ ok: true });
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} mode, on port ${PORT}`));
