import mongoose from "mongoose";

var eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		eventProfile: {
			type: String,
		},
		categories: {
			type: [String],
		},
		dateTime: {
			dates: Array,
			times: Array,
			// required: true,
		},
		location: {
			latitude: Number,
			longitude: Number,
			location: String,
		},
		maxParticipants: {
			type: Number,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
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
