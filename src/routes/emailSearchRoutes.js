const express = require("express");
const router = express.Router();
const { emailSearch } = require("../controllers/emailSearchController");

// POST /api/email-search
router.post("/", emailSearch);

module.exports = router;
