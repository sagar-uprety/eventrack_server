import nodemailer from "nodemailer";
import cryptoRandomString from "crypto-random-string";

const generateToken = () => {
	var token = cryptoRandomString({ length: 6, type: "numeric" });
	return token;
};

/**
 *
 * @param {String} to -Example: abcd123@gmail.com
 * @param {Object} param1 -`subject` & `body` to send in mail.
 * `body` must be a HTML.
 */
const sendEmail = async (to, { subject, message }) => {
	try {
		var smtpTransport = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.GMAIL,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		var mailOptions = {
			from: process.env.GMAIL,
			to: to,
			subject: subject,
			html: message,
		};

		await smtpTransport.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};

/**
 * @param {String} to - example: abcd123@gmail.com
 * @param {String} type - example: verificationToken || resetToken
 * @returns {String} - generated token
 */

const sendToken = async (to, type) => {
	var token = generateToken();

	var mailBody;
	switch (type) {
		case "verificationToken":
			mailBody = {
				subject: "Account Verification",
				message: `To verify your account, copy this token in your application: <br><h3 style="font-size: 20px; padding:0 1.5rem; margin: 0.5rem;"><strong> ${token} </strong></h3><br>This token expires after 1 hour.<br><br><strong><em>**In case you don't recognize requesting for a token, leave the token as it is.**</em></strong>`,
			};
			break;
		case "resetToken":
			mailBody = {
				subject: "Token to reset the password of your account",
				message: `To reset the password of your account, first copy this token in your application: <br><h3 style="font-size: 20px; padding:0 1.5rem; margin: 0.5rem;"><strong> ${token} </strong></h3><br>This token expires after 1 hour.<br><br><strong><em>**In case you don't recognize requesting for a token, leave the token as it is.**</em></strong>`,
			};
			break;
		default:
			break;
	}

	try {
		await sendEmail(to, mailBody);
		return token;
	} catch (err) {
		console.error(err);
	}
};

export default sendToken;
