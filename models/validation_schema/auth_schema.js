import Joi from "joi";

// JOI Schema for Request Level Validation i.e when making requests

//signup can contain additional properties
const signupSchemaValid = Joi.object({
	name: Joi.string().min(6).max(255).required(),
	email: Joi.string().min(5).max(255).required().email(),
	password: Joi.string().min(6).max(255).required(),
});

const loginSchemaValid = Joi.object({
	email: Joi.string().min(5).max(255).required().email(),
	password: Joi.string().min(6).max(255).required(),
});

export { signupSchemaValid, loginSchemaValid };
