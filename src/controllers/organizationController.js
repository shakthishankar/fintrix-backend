// src/controllers/organizationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrganization = async (req, res) => {
  try {
    const { name, type, website, region, contact } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'name and type are required' });
    }
    const org = await prisma.organization.create({
      data: { name, type, website, region, contact },
    });
    res.status(201).json({ success: true, org });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: { users: true },
      orderBy: { id: 'asc' },
    });
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const org = await prisma.organization.findUnique({
      where: { id },
      include: { users: true },
    });
    if (!org) return res.status(404).json({ error: 'Organization not found' });
    res.json({ success: true, org });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const org = await prisma.organization.update({
      where: { id },
      data,
    });
    res.json({ success: true, org });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Restrict: prevent deleting orgs that still have users
    const userCount = await prisma.user.count({ where: { organizationId: id } });
    if (userCount > 0) {
      return res.status(409).json({
        error: 'Cannot delete organization with linked users. Reassign or delete users first.',
      });
    }

    await prisma.organization.delete({ where: { id } });
    res.json({ success: true, message: 'Organization deleted' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};
