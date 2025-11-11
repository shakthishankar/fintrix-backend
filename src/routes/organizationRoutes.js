const express = require("express");
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} = require("../controllers/organizationController");

const validate = require("../middleware/validate");
const { createOrganizationSchema } = require("../validations/organizationValidation");

router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.post("/", validate(createOrganizationSchema), createOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
