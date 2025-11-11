const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("ADMIN", "INVESTOR", "STARTUP", "MEMBER").required(),
  organizationId: Joi.number().integer().required(),
  password: Joi.string().optional()
});

module.exports = { createUserSchema };
