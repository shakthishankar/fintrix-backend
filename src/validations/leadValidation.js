const Joi = require("joi");

const createLeadSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  domain: Joi.string().optional(),
  status: Joi.string().valid("new", "contacted", "in_progress", "closed").optional(),
  addedById: Joi.number().integer().required()
});

module.exports = { createLeadSchema };
