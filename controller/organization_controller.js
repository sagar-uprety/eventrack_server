import Organization from "../models/organization.js";

const organizationActions = {};

organizationActions.createOrganization = async (req, res) => {
	try {
		const { name, email, contact, website, description } = req.body;

		const newOrganization = new Organization({
			name: name,
			email: email,
			contact: contact,
			website: website,
			description: description,

			//TODO: docpath
		});
		await newOrganization.save();

		const currentUser = req.user;
		currentUser.organization = newOrganization._id;
		await currentUser.save();

		return res.json({ organization: newOrganization });
	} catch (error) {
		return res.json({ message: error });
	}
};

export default organizationActions;
