import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
	name: { type: String, min: 5, max: 30, required: true },
	email: { type: String, required: true, unique: true, min: 5, max: 255 },
	desription: { type: String, min: 30 },
	profile: { type: String, default: "Add Default Picture Link" },
	contact: [{ type: Number }],
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

/**
 *
 * @returns callback(<Boolean>)
 */

// organizationSchema.pre("save", async function (next) {
// 	var organization = this;
// if (!organization.blockStatus.isBlocked) return next();

// if (
// 	organization.blockStatus.isBlocked &&
// 	Date.now() >= organization.blockStatus.to
// ) {
// 	organization.blockStatus = {
// 		isBlocked: false,
// 	};
// 	// await organization.save();
// 	return next();
// }

// return next(
// 	new Error(
// 		`Your Organization has been blocked until ${organization.blockStatus.too}`
// 	)
// );
// });

const Organization = mongoose.model("organization", organizationSchema);

export default Organization;
