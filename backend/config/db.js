import mongoose from 'mongoose';

const connect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		console.log(`DB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};

export default connect;
