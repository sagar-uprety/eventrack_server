import Event from "../models/events.js";

const actions = {};

actions.fetchAllEvents = async (_, res) => {
	try {
		var events = await Event.find({});

		if (!events) return res.json({ message: "No Event Found.", state: true });
		return res.json({ events: events, state: true });
	} catch (error) {
		return res.json({ message: error });
	}
};

actions.changeEventVerificationState = async (req, res) => {
	try {
		var event = await Event.findById(req.body.id, {
			title: 1,
			verificationState: 1,
		});
		if (event == null) return res.json({ message: "Event not Found." });
		const currentState = event.verificationState.isVerified;
		event.verificationState = {
			isVerified: !currentState,
			verifiedBy: !currentState ? req.user._id : null,
			date: !currentState ? Date.now() : null,
		};

		await event.save();

		var newStatus = !currentState ? "verified." : "unverified.";

		return res.json({
			message: `${event.title} has been ${newStatus}`,
		});
	} catch (error) {
		return res.json({ message: error });
	}
};

actions.removeEvent = async (req, res) => {
	try {
		console.log(req.body);
		var actionNews = await Event.findByIdAndDelete(req.body.id);
		if (!actionNews) return res.json({ message: "Event not Found." });
		return res.json({ message: "Event Deleted successfully." });
	} catch (err) {
		return res.json({ message: err });
	}
};

export default actions;
