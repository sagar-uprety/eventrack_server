import Organization from "../models/organization.js";

const actions = {};

actions.changeOrgVerificationState = async (req, res) => {
	try {
		var organization = await Organization.findById(req.body.id, {
			name: 1,
			verificationState: 1,
		});

		if (organization == null)
			return res.json({ message: "Organization not Found." });

		const currentState = organization.verificationState.isVerified;

		organization.verificationState = {
			isVerified: !currentState,
			verifiedBy: !currentState ? req.user._id : null,
			date: !currentState ? Date.now() : null,
		};

		await organization.save();

		var newStatus = !currentState ? "verified." : "unverified.";

		return res.json({
			message: `${organization.name} has been ${newStatus}`,
		});
	} catch (error) {
		return res.json({ message: error });
	}
};

actions.changeOrgBlockState = async (req, res) => {
	try {
		var organization = await Organization.findById(req.body.id, {
			name: 1,
			blockStatus: 1,
		});

		if (organization == null) return res.json("organization Not Found");

		var currentState = organization.blockStatus.isBlocked;

		organization.blockStatus = {
			isBlocked: !currentState,
			from: !currentState ? Date.now() : null,
			to: !currentState ? Date.now() + 2592000000 : null,
		};

		await organization.save();

		var newStatus = !currentState ? "blocked." : "unblocked.";

		return res.json({
			message: `${organization.name} has been ${newStatus}`,
		});
	} catch (error) {
		return res.json({ message: error });
	}
};

export default actions;
