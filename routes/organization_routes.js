import { Router } from "express";
import { checkUser } from "../middlewares/auth_middleware.js";

import organization_controller from "../controller/organization_controller.js";
const router = Router();

//TODO: Add JOI Validation Schema
router.post("/create", checkUser, organization_controller.createOrganization);

export default router;
