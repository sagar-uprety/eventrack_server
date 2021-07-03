import Organization from "../models/organization.js";
import File from "../functions/image.js";

const organizationActions = {};

organizationActions.createOrganization = async (req, res) => {
	try {
		const newOrganization = new Organization(req.body);

		var document = await File.uploadImage(req.file.path, {
			rootFolder: "organizations",
			folder: "documents",
			name: `${newOrganization.name}-${newOrganization._id}`,
		});
		newOrganization.documentUrl = document;

		await newOrganization.save();

		// const currentUser = req.user;
		// currentUser.organization = newOrganization._id;
		// await currentUser.save();

		return res.json({
			message: "Your organization has been created.",
			state: true,
		});
	} catch (error) {
		return res.json({ message: error.message, state: false });
	}
};

export default organizationActions;
