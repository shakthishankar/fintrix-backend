const express = require("express");
const router = express.Router();
const domainSearchController = require("../controllers/domainSearchController");

router.post("/domain-search", domainSearchController.domainSearch);

module.exports = router;