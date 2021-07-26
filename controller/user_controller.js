import User from "../models/user.js";
import Event from "../models/events.js";
import Organization from "../models/organization.js";
import Image from "../functions/image.js";

const getCurrentUserData = async (req, res) => {
	// const events = await Event.find(
	// 	{ "dateTime.dates.0": { $gt: Date.now() } },
	// 	{ registeredUsers: 0 }
	// );
	var organization;
	if (req.user.organization) {
		organization = await Organization.findById(req.user.organization, {
			blockStatus: 0,
		});
		return res.json({
			user: req.user,
			organization: organization,
			state: true,
		});
	}
	// 	return res.json({
	// 		user: req.user,
	// 		organization: organization,
	// 		event_list: events,
	// 		state: true,
	// 	});
	// }
	// if (events) {
	// 	return res.json({
	// 		user: req.user,
	// 		event_list: events,
	// 		state: true,
	// 	});
	// }
	// console.log(
	// 	`User: ${req.user}\n\nOrganization: ${organization}\n\nEvents:${events}`
	// );
	return res.json({
		user: req.user,
		// organization: organization,
		state: true,
	});
};

const getMyEvents = async (req, res) => {
	try {
		const myEvents = req.user.registeredEvents;
		const events = await Event.find({ _id: { $in: myEvents } });
		if (!events)
			return res.json({
				message: "You do not have any registered events.",
				state: true,
			});

		return res.json({ events_list: events, state: true });
	} catch (error) {
		return res.json({ message: error, state: false });
	}
};

const getMyFavourites = async (req, res) => {
	try {
		const favs = req.user.favourites;
		const events = await Event.find({ _id: { $in: favs } });
		if (!events)
			return res.json({
				message: "You do not have any events on your favourites list.",
				state: true,
			});

		return res.json({ events_list: events, state: true });
	} catch (error) {
		return res.json({ message: error, state: false });
	}
};

const uploadProfile = async (req, res) => {
	try {
		//TODO:Save `url` to req.user
		var url = await Image.uploadImage(req.file.path, {
			rootFolder: "users",
			// folder: "temp",
			folder: req.user.name + "-" + req.user._id,
			name: req.file.originalname,
		});
		res.json({ message: "Profile Picture Updated.\nURL: " + url, state: true });
	} catch (error) {
		console.log({ message: error, state: false });
	}
};

export default {
	getMyEvents,
	getCurrentUserData,
	getMyFavourites,
	uploadProfile,
};
