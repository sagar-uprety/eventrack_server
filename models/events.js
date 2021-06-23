import mongoose from "mongoose";

var eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		categories: {
			type: [String],
		},
		dateTime: {
			date: Array,
			time: Array,
			// required: true,
		},
		location: {
			latitude: Number,
			longitude: Number,
			name: String,
			street: String,
			locality: String,
			subLocality: String,
			administrativeArea: String,
			subAdministrativeArea: String,
			country: String,
		},
		eventFee: {
			type: Number,
			default: 0.0,
		},
		verificationState: {
			isVerified: { type: Boolean, default: false },
			verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			// timestamps: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			// required: true,
		},
		images: [
			{
				url: { type: String, required: true },
				uploadedAt: { type: Date, default: Date.now() },
				description: String,
			},
		],
		registeredUsers: [mongoose.Schema.Types.ObjectId],
	},
	{ timestamps: true } //adds createdAt and updatedAt automatically. See from DB
);

const Event = mongoose.model("event", eventSchema);

export default Event;
