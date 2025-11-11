// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper: ensure org exists
async function ensureOrg(orgId) {
  const org = await prisma.organization.findUnique({ where: { id: Number(orgId) } });
  return !!org;
}

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, role = 'MEMBER', organizationId } = req.body;

    if (!name || !email || !organizationId) {
      return res.status(400).json({ error: 'name, email, organizationId are required' });
    }

    const orgExists = await ensureOrg(organizationId);
    if (!orgExists) return res.status(400).json({ error: 'Invalid organizationId' });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        organizationId: Number(organizationId),
      },
      include: { organization: true },
    });

    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { organization: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { organization: true },
      orderBy: { id: 'asc' },
    });
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    if (data.organizationId) {
      const orgExists = await ensureOrg(data.organizationId);
      if (!orgExists) return res.status(400).json({ error: 'Invalid organizationId' });
      data.organizationId = Number(data.organizationId);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      include: { organization: true },
    });

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    return res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};