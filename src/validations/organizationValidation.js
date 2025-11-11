const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  type: Joi.string().valid("startup", "investor").required(),
  website: Joi.string().uri().optional(),
  region: Joi.string().optional(),
  contact: Joi.string().optional()
});

module.exports = { createOrganizationSchema };
