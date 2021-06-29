import Joi from "joi";

const createEventValid = Joi.object({
    title: Joi.string().min(6).max(255).required(),
    desc: Joi.string().min(32).required(),
    categories: Joi.array().min(1).max(3).required(),
    
     //TODO: validate dateTime and location
})

export { createEventValid };