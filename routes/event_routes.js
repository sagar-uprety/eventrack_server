// router.get("/", checkUser, auth_controller.getAllUsers);
import { Router } from "express";
import event_controller from "../controller/event_controller.js";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
const router = Router();

//TODO: Add JOI Validation Schema for events as done for user under models/validation_schema
//TODO: Add Update Event Detail
//TODO: Find and implement proper use case for checkUser middleware

//authTokenCheck checks if the user is logged in and has access token. If it has only then allow the user to visit that route
//checkUser middleware gives curren user data.
//see above two middlewares in middlewares/auth_middleware.js

router.get("/", authTokenCheck, event_controller.viewAllEvent);
router.post("/", checkUser, event_controller.createEvent);
router.get("/:id", checkUser, event_controller.viewEventDetail);
router.delete("/:id", authTokenCheck, event_controller.deleteEvent);

export default router;
