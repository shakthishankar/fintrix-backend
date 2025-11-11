const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} = require("../controllers/leadController");

const validate = require("../middleware/validate");
const { createLeadSchema } = require("../validations/leadValidation");

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", validate(createLeadSchema), createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
