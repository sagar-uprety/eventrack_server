import User from "../models/user.js";

const actions = {};

actions.changeUserBlockState = async (req, res) => {
	try {
		var user = await User.findById(req.body.id, { name: 1, blockStatus: 1 });

		if (user == null) return res.json("User Not Found");

		var currentState = user.blockStatus.isBlocked;
		user.blockStatus = {
			isBlocked: !currentState,
			from: !currentState ? Date.now() : null,
			to: !currentState ? Date.now() + 2592000000 : null,
		};
		await user.save();
		var newStatus = !currentState ? "blocked." : "unblocked.";
		return res.json({
			message: `${user.name} has been ${newStatus}`,
		});
	} catch (error) {
		return res.json({ message: error });
	}
};

export default actions;
