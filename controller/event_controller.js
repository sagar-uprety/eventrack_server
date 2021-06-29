import Event from "../models/events.js";

//Get all Events
const viewAllEvent = async (req, res) => {
	try {
		const event = await Event.find({}).sort({ createdAt: -1 }); //latest events will appear first.
		if (event.length === 0) {
			res.json({ message: "No Events found" });
		} else {
			res.json({ event_list: event });
		}
	} catch (err) {
		res.json({ message: err });
		console.log(`Cannot find news due to ${err}`);
	}
};

//Create an Event
const createEvent = async (req, res) => {
	const event = new Event({
		title: req.body.title,
		description: req.body.desc,
		categories: req.body.categories,
	},
		//TODO: dateTime, location
	);
	console.log(req.user); //gives current user data. if used checkUser middleware in this route.
	try {
		const savedEvent = await event.save();
		res.json(savedEvent);
	} catch (err) {
		res.json({ message: err });
		console.log(`Event creation failed due to ${err}`);
	}
};

const viewEventDetail = async (req, res) => {
	try {
		//TODO: try to put random string as eventID and see the error. Use JOI Validation so that we donot see that
		const eventID = req.params.id;
		const eventDetail = await Event.findById(eventID);
		if (!eventDetail) {
			console.log("Cannot Find Event");
			res.json({ message: "Cannot Find Event" });
		} else {
			res.json(eventDetail);
		}
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

//Search Events
const searchEvents = async (req, res) => {
	try{
		const { title }  = req.params;
		console.log(req.params);
		const events = await Event.find({ title: new RegExp(title) });
		console.log(events)
		if (!events) {
			console.log("Cannot Find Event");
			res.json({ message: "Cannot Find Event" });
		} else {
			res.json(events);
		}
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const deletedNews = await Event.findByIdAndDelete(req.params.id); //return deleted event

		if (!deletedNews) {
			console.log("Event Not Found");
			res.json({ message: "Event Not Found" }); //text
		} else {
			console.log("Event Deleted Successfully");
			res.json(deletedNews);
		}
	} catch (err) {
		console.log(`Error occured while deleting due to ${err}`);
		res.json({ message: err });
	}
};

export default {
	viewAllEvent,
	createEvent,
	viewEventDetail,
	searchEvents,
	deleteEvent,
};
