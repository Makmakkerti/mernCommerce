import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();
connect();

const app = express();
app.get('/', (req, res) => {
	res.status(200).send({ ok: true });
});

app.use('/api/products', productRouter);

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} mode, on port ${PORT}`));
