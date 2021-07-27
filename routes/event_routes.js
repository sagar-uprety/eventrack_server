import { Router } from "express";
import event_controller from "../controller/event_controller.js";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import validation from "../middlewares/validation_middleware.js";
import { createEventValid } from "../models/validation_schema/event_schema.js";
import Image from "../functions/image.js";
const router = Router();

//TODO: Add JOI Validation Schema for events as done for user under models/validation_schema
//TODO: Add Update Event Detail
//TODO: Find and implement proper use case for checkUser middleware

//authTokenCheck checks if the user is logged in and has access token. If it has only then allow the user to visit that route
//checkUser middleware gives current user data.
//see above two middlewares in middlewares/auth_middleware.js

router.get("/", event_controller.viewAllEvent);
router.post("/", checkUser, event_controller.createEvent);
router.get("/search", authTokenCheck, event_controller.searchEvents);
router.get("/:id", authTokenCheck, event_controller.viewEventDetail);
router.post("/:id", checkUser, event_controller.register);
router.post(
	"/uploadProfile/:id",
	authTokenCheck,
	Image.upload("image"),
	event_controller.uploadProfile
);
router.get(
	"/participants/:id",
	authTokenCheck,
	event_controller.getParticpants
);
router.post(
	"/",
	checkUser,
	validation(createEventValid, "body"),
	event_controller.createEvent
);
router.delete("/:id", authTokenCheck, event_controller.deleteEvent);

export default router;
