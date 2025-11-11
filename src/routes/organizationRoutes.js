const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { createOrganizationSchema } = require("../validations/organizationValidation");

const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');



router.post('/', validate(createOrganizationSchema), createOrganization);

router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

module.exports = router;
