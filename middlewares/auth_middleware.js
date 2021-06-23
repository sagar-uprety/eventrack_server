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

const authTokenCheck = (req, res, next) => {
	if (isAuthenticated(req.headers)) {
		next();
	} else {
		res.status(400).json({ message: "Invalid Token" });
	}
};

const checkUser = async (req, res, next) => {
	const token = isAuthenticated(req.headers);

	if (token) {
		let user = await User.findById(token._id);
		req.user = user; //returns acutal User Model - Mongo
		next();
	} else {
		res.status(400).json({ message: "Invalid Token" });
	}
};
export { authTokenCheck, checkUser };
