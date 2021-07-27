import Organization from "../models/organization.js";
import Event from "../models/events.js";
import File from "../functions/image.js";

const createOrganization = async (req, res) => {
	try {
		const existing = await Organization.find({
			$or: [{ name: req.body.name }, { email: req.body.email }],
		});
		if (existing.length != 0)
			return res.json({
				message: "An organization with this name or email already exists.",
				state: false,
			});
		const newOrganization = new Organization(req.body);

		// var document = await File.uploadImage(req.file.path, {
		// 	rootFolder: "organizations",
		// 	folder: "documents",
		// 	name: `${newOrganization.name}-${newOrganization._id}`,
		// });
		// newOrganization.documentUrl = document;

		await newOrganization.save();

		const currentUser = req.user;
		currentUser.organization = newOrganization._id;
		await currentUser.save();

		return res.json({
			message: "Your organization has been created.",
			organization: newOrganization,
			state: true,
		});
	} catch (error) {
		return res.json({ message: error.message, state: false });
	}
};

const getCreatedEvents = async (req, res) => {
	try {
		const organization = await Organization.findById(req.params.id);
		const createdEvents = await Event.find({
			_id: { $in: organization.events },
		});
		console.log(createdEvents);
		if (!createdEvents)
			return res.json({
				message: " No created Events data found",
				state: true,
			});

		return res.json({ event_list: createdEvents, state: true });
	} catch (error) {
		console.log(error);
		return res.json({ message: error.message, state: false });
	}
};

const uploadProfile = async (req, res) => {
	try {
		var organization = await Organization.findById({
			_id: req.user.organization,
		});
		var url = await File.uploadImage(req.file.path, {
			rootFolder: "organization",
			folder: organization.name + "-" + organization._id,
			name: req.file.originalname,
		});
		organization.profile = url;
		await organization.save();

		return res.json({
			message: "Organization Profile Updated.",
			organization: organization,
			state: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({ message: error.message, state: false });
	}
};

export default { createOrganization, getCreatedEvents, uploadProfile };
