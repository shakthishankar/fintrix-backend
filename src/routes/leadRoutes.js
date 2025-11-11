const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { createLeadSchema } = require("../validations/leadValidation");

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require('../controllers/leadController');

router.post('/', validate(createLeadSchema), createLead);
router.get('/', getLeads);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
