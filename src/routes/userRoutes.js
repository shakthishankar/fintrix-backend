// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// POST /api/users - create (requires valid organizationId)
router.post('/', createUser);

// GET /api/users - list
router.get('/', getUsers);

// GET /api/users/:id - read one
router.get('/:id', getUserById);

// PUT /api/users/:id - update (re-validate organizationId if present)
router.put('/:id', updateUser);

// DELETE /api/users/:id - delete
router.delete('/:id', deleteUser);

module.exports = router;
