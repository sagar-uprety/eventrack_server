import { Router } from "express";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import auth_controller from "../controller/auth_controller.js";
import validation from "../middlewares/validation_middleware.js"; //JOI Validation Middleware for models.
import image from "../functions/image.js";

import {
	signupSchemaValid,
	loginSchemaValid,
} from "../models/validation_schema/auth_schema.js"; //Validation Schema

const router = Router();

//TODO
//! Issue: Middlware exuecting even when request is no made on this path. Check by adding console.log() inside validation middlware
router.post(
	"/signup",
	validation(signupSchemaValid, "body"),
	auth_controller.createUser
);

router.post(
	"/login",
	validation(loginSchemaValid, "body"),
	auth_controller.loginUser
);

router.post(
	"/uploadProfile",
	checkUser,
	image.upload("profile"),
	auth_controller.uploadProfile
);

router.get("/verify", auth_controller.sendverificationToken);

router.post("/verify", auth_controller.verifyToken);

router.post("/resetToken", auth_controller.sendPasswordResetToken);

router.get("/logout", auth_controller.logoutUser);

export default router;
