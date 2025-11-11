const Joi = require("joi");

const createDealSchema = Joi.object({
  amount: Joi.number().min(0).optional(),
  stage: Joi.string().valid("NEW", "NEGOTIATION", "CLOSED", "ACTIVE").optional(),
  status: Joi.string().valid("ACTIVE", "LOST", "WON").optional(),
  startupIds: Joi.array().items(Joi.number().integer()).min(1).required(),
  investorIds: Joi.array().items(Joi.number().integer()).min(1).required()
});

module.exports = { createDealSchema };
