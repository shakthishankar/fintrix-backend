const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');

// POST /api/organizations - Create
router.post('/', createOrganization);

// GET /api/organizations - Read all
router.get('/', getAllOrganizations);

// GET /api/organizations/:id - Read one
router.get('/:id', getOrganizationById);

// PUT /api/organizations/:id - Update
router.put('/:id', updateOrganization);

// DELETE /api/organizations/:id - Delete
router.delete('/:id', deleteOrganization);

module.exports = router;