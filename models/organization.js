import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
	name: { type: String, min: 5, max: 30, required: true, unique: true },
	email: { type: String, required: true, unique: true, min: 5, max: 255 },
	description: { type: String, min: 30 },
	profile: { type: String },
	contact: [{ type: String }],
	address: { type: String },
	documentUrl: { type: String },
	verificationState: {
		isVerified: { type: Boolean, default: false },
		verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		date: Date,
	},
	website: { type: String },
	blockStatus: {
		isBlocked: { type: Boolean, default: false },
		from: Date,
		to: Date,
	},
	events: [{ type: mongoose.Schema.Types.ObjectId }],
	// connectLinks: [
	// 	{
	// 		mediaType: { type: String, required: true },
	// 		url: { type: String, required: true },
	// 	},
	// ],
	// team: [
	// 	{
	// 		user: mongoose.Schema.Types.ObjectId,
	// 		position: String,
	// 		about: String,
	// 		// required:true,
	// 	},
	// ],
});

const Organization = mongoose.model("organization", organizationSchema);

export default Organization;
