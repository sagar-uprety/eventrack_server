import { Router } from "express";
import { checkUser } from "../middlewares/auth_middleware.js";
import File from "../functions/image.js";
import organization_controller from "../controller/organization_controller.js";
const router = Router();

//TODO: Add JOI Validation Schema
router.post(
	"/",
	File.upload("documentFile"),
	organization_controller.createOrganization
); //TODO: Add `checkUser` as middleware.

export default router;
