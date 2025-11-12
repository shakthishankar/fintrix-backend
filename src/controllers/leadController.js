const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Lead
const createLead = async (req, res) => {
  try {
    const { name, email, domain, status = "new", addedById } = req.body;

    if (!name || !email || !addedById) {
      return res.status(400).json({ error: "name, email, addedById are required" });
    }

    // Ensure user exists
    const user = await prisma.user.findUnique({ where: { id: Number(addedById) } });
    if (!user) return res.status(400).json({ error: "Invalid addedById (user not found)" });

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        domain,
        status,
        addedById: Number(addedById)
      },
      include: { addedBy: true }
    });

    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Leads (with filtering + pagination)
const getLeads = async (req, res) => {
  try {
    const { status, domain, addedById, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (domain) filters.domain = domain;
    if (addedById) filters.addedById = Number(addedById);

    const leads = await prisma.lead.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: { addedBy: true }
    });

    res.json({ success: true, leads, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const updated = await prisma.lead.update({
      where: { id },
      data,
      include: { addedBy: true }
    });

    res.json({ success: true, lead: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Lead by ID
const getLeadById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { addedBy: true }
    });

    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.lead.delete({ where: { id } });
    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
};
