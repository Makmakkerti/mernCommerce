import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: String,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
