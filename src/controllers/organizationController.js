const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrganization = async (req, res) => {
  try {
    const { name, type, website, region, contact, userId } = req.body;
    const org = await prisma.organization.create({
      data: { name, type, website, region, contact, userId: userId ? parseInt(userId) : null },
    });
    res.status(201).json({ success: true, org });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: { user: true }, // Optional: Include related user
    });
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await prisma.organization.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!org) return res.status(404).json({ error: 'Organization not found' });
    res.json({ success: true, org });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
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
    const { id } = req.params;
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