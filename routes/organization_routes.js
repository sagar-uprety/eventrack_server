import { Router } from "express";
import { checkUser } from "../middlewares/auth_middleware.js";

import validation from  "../middlewares/validation_middleware.js"; 

import organization_controller from "../controller/organization_controller.js";
import { createOrgValid } from "../models/validation_schema/org_schema.js";
const router = Router();

//TODO: Add JOI Validation Schema
router.post("/create", checkUser, validation(createOrgValid,"body"), organization_controller.createOrganization);

export default router;
