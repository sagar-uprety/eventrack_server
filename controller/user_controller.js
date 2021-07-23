import User from "../models/user.js";
import Event from "../models/events.js";
import Image from "../functions/image.js";

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
		var url = await Image.uploadImage(req.file.path, {
			rootFolder: "users",
			folder: req.user.name + "-" + req.user._id,
			name: req.file.originalname,
		});
		res.json({ message: "Profile Picture Updated.", state: true });
	} catch (error) {
		console.log({ message: error, state: false });
	}
};

export default {
	getMyEvents,
	getMyFavourites,
	uploadProfile,
};
