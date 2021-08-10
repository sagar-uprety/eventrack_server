import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuthenticated = (headers) => {
	const authToken = headers["auth-token"];
	if (!authToken) return false;

	try {
		const verifyToken = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET);
		return verifyToken;
	} catch (err) {
		console.log(`Error ${err}`);
		return null;
	}
};

/**
 * Checks if 'auth-token' is valid.
 */

const authTokenCheck = (req, res, next) => {
	if (isAuthenticated(req.headers)) {
		next();
	} else {
		res.status(400).json({ message: "Invalid Token", state: false });
	}
};

/**
 * Checks if `auth-token` is valid and finds the value of the user found with `auth-token`.
 */

const checkUser = async (req, res, next) => {
	const token = isAuthenticated(req.headers);

	if (token) {
		let user = await User.findById(token._id);
		// user.blockStatus = checkBlockState(user.blockStatus);
		// await user.save();
		if (user) {
			req.user = user; //returns acutal User Model - Mongo
			next();
		} else res.status(400).json({ message: "Invalid Token", state: false });
	} else res.status(400).json({ message: "Invalid Token", state: false });
};

/**
 *
 * @param {Object} status -`blockStatus` property of the current `user`
 * @returns updated `blockStatus` if 30 days has completed, else returns the receied `blockStatus`
 */

const checkBlockState = (status) => {
	if (!status)
		return res.json({ message: "Invalid Block Status", state: false });
	if (status.isBlocked) {
		if (Date.now() >= status.to) {
			status = {
				isBlocked: false,
			};
		}
	}
	return status;
};

export { authTokenCheck, checkUser };
