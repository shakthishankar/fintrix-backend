const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create Deal (multi-startup + multi-investor)
const createDeal = async (req, res) => {
  try {
    const { amount, stage, status, startupIds, investorIds } = req.body;

    if (!startupIds || !investorIds) {
      return res.status(400).json({ error: "startupIds and investorIds are required arrays" });
    }

    const deal = await prisma.deal.create({
      data: {
        amount,
        stage: stage || "NEW",
        status: status || "ACTIVE",
        startups: {
          create: startupIds.map(id => ({ orgId: Number(id) }))
        },
        investors: {
          create: investorIds.map(id => ({ orgId: Number(id) }))
        }
      },
      include: {
        startups: { include: { org: true } },
        investors: { include: { org: true } }
      }
    });

    res.status(201).json({ success: true, deal });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Deals (filter + pagination)
const getDeals = async (req, res) => {
  try {
    const { page = 1, limit = 10, stage, status, startupId, investorId } = req.query;

    const where = {};

    if (stage) where.stage = stage;
    if (status) where.status = status;

    const deals = await prisma.deal.findMany({
      where,
      skip: (page - 1) * Number(limit),
      take: Number(limit),
      include: {
        startups: { include: { org: true } },
        investors: { include: { org: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({ success: true, deals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Deal by ID
const getDealById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        startups: { include: { org: true } },
        investors: { include: { org: true } }
      }
    });

    if (!deal) return res.status(404).json({ error: "Deal not found" });
    res.json({ success: true, deal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Deal
const updateDeal = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deal = await prisma.deal.update({
      where: { id },
      data: req.body,
      include: {
        startups: { include: { org: true } },
        investors: { include: { org: true } }
      }
    });

    res.json({ success: true, deal });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete Deal
const deleteDeal = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.deal.delete({ where: { id } });

    res.json({ success: true, message: "Deal deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};
