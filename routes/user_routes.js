import { Router } from "express";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import user_controller from "../controller/user_controller.js";
import image from "../functions/image.js";

const router = Router();

router.get("/", checkUser, user_controller.getCurrentUserData);
router.get("/myEvents", checkUser, user_controller.getMyEvents);
router.get("/myfavourites", checkUser, user_controller.getMyFavourites);
router.post("/myfavourites/:id", checkUser, user_controller.addtoFavourites);

router.post(
	"/uploadProfile",
	checkUser,
	image.upload("image"),
	user_controller.uploadProfile
);

router.post("/edit", checkUser, user_controller.editUserProfile);

export default router;
