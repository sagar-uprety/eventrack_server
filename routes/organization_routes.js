import { Router } from "express";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import File from "../functions/image.js";

import validation from "../middlewares/validation_middleware.js";

import organization_controller from "../controller/organization_controller.js";
import { createOrgValid } from "../models/validation_schema/org_schema.js";
const router = Router();

//TODO: Add JOI Validation Schema
router.post(
	"/",
	checkUser,
	validation(createOrgValid, "body"),
	// File.upload("documentFile"),
	organization_controller.createOrganization
);

router.post(
	"/uploadProfile",
	checkUser,
	File.upload("image"),
	organization_controller.uploadProfile
);

router.get(
	"/getevents/:id",
	authTokenCheck,
	organization_controller.getCreatedEvents
);

export default router;
