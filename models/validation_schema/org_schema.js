import Joi from "joi";

const createOrgValid = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  description: Joi.string().min(6).max(255),
  contact: Joi.array().min(1).max(3).required(),
  address: Joi.string().min(8).max(100).required(),
  website: Joi.string().min(10).max(255),

  //TODO: validate for docpath
});

export { createOrgValid };
