import { Router } from "express";
import auth_controller from "../controller/auth_controller.js";
import validation from "../middlewares/validation_middleware.js"; //JOI Validation Middleware for models.
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

router.get(
  "/login",
  validation(loginSchemaValid, "body"),
  auth_controller.loginUser
);

router.get("/logout", auth_controller.logoutUser);

export default router;
