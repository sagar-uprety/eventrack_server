import { Router } from "express";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import admin_user_controller from "../controller/admin_user_controller.js";
import admin_event_controller from "../controller/admin_event_controller.js";

const router = Router();

// *Routes for actions to User
router.post("/u/verify", authTokenCheck, admin_user_controller.verifyUser);

router.post(
	"/u/block",
	authTokenCheck,
	admin_user_controller.changeUserBlockState
);

// *Routes for actions to Event
router.post(
	"/e/verify",
	checkUser,
	admin_event_controller.changeEventVerificationState
);
router.delete("/e/remove", authTokenCheck, admin_event_controller.removeEvent);

export default router;
