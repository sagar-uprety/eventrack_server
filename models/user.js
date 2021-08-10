import mongoose from "mongoose";

//Mongoose Schema : Provides app level validation i.e when saving to the database
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		min: 5,
		max: 255,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		min: 5,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
	phone: {
		type: String,
	},
	address: {
		type: String,
	},
	gender: {
		type: String,
		min: 2,
		max: 6,
	},
	profileImage: {
		type: String,
		default:
			"https://res.cloudinary.com/eventtrack39823/image/upload/v1615991990/defaultAvatar.jpg",
	},
	hasVerifiedEmail: {
		type: Boolean,
		default: false,
	},
	tokenInfo: {
		token: { type: String, min: 6, max: 8 },
		tokenExpiration: { type: Date },
	},
	registeredEvents: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	favourites: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	userRole: {
		user: { type: Boolean, default: true },
		admin: { type: Boolean, default: false },
	},
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Organization",
	},
	blockStatus: {
		isBlocked: { type: Boolean, default: false },
		from: Date,
		to: Date,
	},
});

/**
 *
 * @returns callback(<Boolean>)
 */
userSchema.methods.checkBlockState = async function (cb) {
	var user = this;
	if (user.blockStatus.isBlocked && Date.now() >= user.blockStatus.to) {
		user.blockStatus = {
			isBlocked: false,
		};
		await user.save();
	}
	return cb(user.blockStatus.isBlocked);
};

const User = mongoose.model("user", userSchema); //users (Plural) collection is created in db

//Export the model
export default User;
