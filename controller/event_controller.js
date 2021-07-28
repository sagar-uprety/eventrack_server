import Event from "../models/events.js";
import Organization from "../models/organization.js";
import Image from "../functions/image.js";
import User from "../models/user.js";
//Get all Events
const viewAllEvent = async (req, res) => {
	try {
		const event = await Event.find({}).sort({ createdAt: -1 }); //latest events will appear first.
		if (event.length === 0) {
			return res.json({ message: "No Events found", state: false });
		} else {
			return res.json({ event_list: event, state: true });
		}
	} catch (err) {
		return res.json({ message: err, state: false });
	}
};

//Create an Event
const createEvent = async (req, res) => {
	try {
		if (req.user.organization) {
			const organization = await Organization.findById(req.user.organization, {
				_id: 1,
				events: 1,
			});
			if (organization) {
				const event = new Event(req.body);
				event.author = req.user.organization;
				organization.events.push(event._id);
				await event.save();
				await organization.save();

				return res.json({ message: "Event Saved.", event: event, state: true });
			}
		}
		return res.json({ message: "Organization not found.", state: false });
	} catch (err) {
		return res.json({ message: err, state: false });
	}
};

const register = async (req, res) => {
	try {
		const id = req.params.id;
		const event = await Event.findById(id);
		const currentUser = req.user;

		if (!event)
			return res.json({ message: "Cannot Find Event.", state: false });
		else {
			var message = "";
			if (!event.registeredUsers.includes(currentUser._id)) {
				event.registeredUsers.push(currentUser._id);
				currentUser.registeredEvents.push(event._id);
				message = `Successfully registered to the event ${event.title.toUpperCase()}`;
			} else {
				event.registeredUsers.splice(
					event.registeredUsers.indexOf(currentUser._id),
					1
				);
				currentUser.registeredEvents.splice(
					currentUser.registeredEvents.indexOf(event._id),
					1
				);
				message = `Removed your registration to the event ${event.title.toUpperCase()}`;
			}
			await event.save();
			await currentUser.save();
			var jsonResult = { message: message, user: currentUser, state: true };
			return res.json(jsonResult);
		}
	} catch (err) {
		console.log(err);
		return res.json({ message: err.message, state: false });
	}
};

const uploadProfile = async (req, res) => {
	try {
		var event = await Event.findById(req.params.id);
		console.log(event);
		var url = await Image.uploadImage(req.file.path, {
			rootFolder: "events",
			folder: event.title + "-" + event._id,
			name: req.file.originalname,
		});
		event.eventProfile = url;
		await event.save();

		var events = await Event.find({}).sort({
			"dateTime.dates.0": 1,
		});

		return res.json({
			message: "Event Profile Updated.",
			event_list: events,
			event: event,
			state: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({ message: error.message, state: false });
	}
};

const viewEventDetail = async (req, res) => {
	try {
		//TODO: try to put random string as eventID and see the error. Use JOI Validation so that we donot see that
		const eventID = req.params.id;
		const eventDetail = await Event.findById(eventID);
		if (!eventDetail) {
			console.log("Cannot Find Event");
			return res.json({ message: "Cannot Find Event", state: false });
		} else {
			return res.json({ event: eventDetail, status: true });
		}
	} catch (err) {
		return res.json({ message: err, state: false });
	}
};

//Search Events
const searchEvents = async (req, res) => {
	try {
		const { text, category, date } = req.query;
		console.log(req.query);
		const events = await Event.find({
			categories: category ? { $in: category } : { $exists: true },
			"dateTime.dates.0": date
				? { $gte: date[0], $lte: date[1] }
				: { $exists: true },
			title: new RegExp(text, "i"),
		});
		console.log(events.length);
		if (!events) return res.json({ message: "No events found.", state: false });
		return res.json({ event_list: events, state: true });
	} catch (err) {
		console.log(err);
		return res.json({ message: err, state: false });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const deletedNews = await Event.findByIdAndDelete(req.params.id); //return deleted event

		if (!deletedNews) {
			console.log("Event Not Found");
			return res.json({ message: "Event Not Found", state: false }); //text
		} else {
			console.log("Event Deleted Successfully");
			return res.json({
				message: "Successfully Deleted the Event.",
				state: true,
			});
		}
	} catch (err) {
		console.log(`Error occured while deleting due to ${err}`);
		return res.json({ message: err, state: false });
	}
};

const getParticpants = async (req, res) => {
	try {
		const eventID = req.params.id;
		const event = await Event.findById(eventID);
		const participants = await User.find({
			_id: { $in: event.registeredUsers },
		});
		if (!participants)
			return res.json({
				message: "No participants data found",
				state: true,
			});

		return res.json({ user_list: participants, state: true });
	} catch (error) {
		return res.json({ message: error, state: false });
	}
};

export default {
	viewAllEvent,
	createEvent,
	register,
	uploadProfile,
	viewEventDetail,
	searchEvents,
	deleteEvent,
	getParticpants,
};
