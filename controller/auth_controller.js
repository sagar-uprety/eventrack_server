import User from "../models/user.js";
import email from "../functions/email.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//User SignUp
const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.findOne({
			email: req.body.email,
		});
		//If the user is already registered
		if (user !== null) {
			return res.json({
				message: "An user with this email already exists.",
				state: false,
			});
			//If the user is not registered. Create a new user
		} else {
			const saltRounds = 10;
			const hashedPass = await bcrypt.hash(password, saltRounds);

			const user = new User({
				name: name,
				email: email,
				password: hashedPass,
			});
			const newUser = await user.save(); //save user to MongoDB

			//Create an auth-token (JWT) and send as an header so next time user does not have to login again.
			const authToken = createToken(user._id);
			res.header("auth-token", authToken).json({
				message: "User has been created.",
				user: user,
				state: true,
			});
		}
	} catch (err) {
		console.log(`User creation failed : ${err}`);
		res.json({ message: err.message, state: false });
	}
};

//User Login
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email: email,
		});

		if (user == null) {
			return res.json({
				message: "Invalid email/password",
				state: false,
			});
		}
		//if user in registered
		else {
			//check password
			const passwordCheck = await bcrypt.compare(password, user.password);
			//if the password is correct. Then create a token and send to user
			if (passwordCheck) {
				//check password
				const passwordCheck = await bcrypt.compare(password, user.password);
				await user.checkBlockState(function (isBlocked) {
					if (!isBlocked) {
						const authToken = createToken(user._id);
						return res.header("auth-token", authToken).json({
							message: "User Logged In",
							state: true,
						});
					}
					return res.json({
						message: `Your account has been blocked until ${user.blockStatus.to}`,
						state: false,
					});
				});
			}
			//if it's incorrect password
			else {
				return res.json({
					message: "Invalid email/password",
					state: false,
				});
			}
		}
	} catch (err) {
		return res.json({
			message: err.message,
			state: false,
		});
	}
};

const sendVerificationToken = async (req, res) => {
	try {
		var user = await User.findOne(
			{ email: req.query.email },
			{ _id: 1, email: 1, tokenInfo: 1 }
		);

		if (user == null)
			return res.json({ message: "Cannot find this account.", state: false });

		var token = await email(req.query.email, "verificationToken");

		user.tokenInfo = {
			token: token,
			tokenExpiration: Date.now() + 3600000,
		};

		await user.save();
		return res.json({
			message: `A token has been sent to ${user.email}.`,
			status: true,
		});
	} catch (err) {
		console.log(err);
		res.json({ message: err.message, state: false });
	}
};

const sendPasswordResetToken = async (req, res) => {
	try {
		var token = email(req.body.email, "resetToken");
		res.json({ token: token });
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};

// Do this from Flutter
const logoutUser = (_, res) => {
	res
		.header("auth-token", "")
		.json({ message: "User Logged In", "auth-token": authToken });
};

//Create JWT Token as an auth-token. So users do not have to login again and again.
//token expires in 30 days. //! Try to implement Refresh Tokens as well
const maxAge = 30 * 24 * 60 * 60; //in seconds
const createToken = (id) => {
	const authToken = jwt.sign({ _id: id }, process.env.AUTH_TOKEN_SECRET, {
		expiresIn: maxAge,
	});
	return authToken;
};

export default {
	createUser,
	loginUser,
	logoutUser,
	sendVerificationToken,
	sendPasswordResetToken,
};
